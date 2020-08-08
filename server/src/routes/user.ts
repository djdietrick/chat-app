import {Router, Request, Response} from 'express';
const User = require('../models/user');
const {auth} = require('../middleware/auth');

export function UserRouter(router: Router = Router()): Router {
    router.get('/users/:search', findUser);
    router.post('/users', createUser);
    router.post('/users/login', loginUser);
    router.post('/users/logout', auth, logoutUser);
    router.post('/users/logoutall', auth, logoutAllUser);

    return router;
}

async function createUser(req: Request, res: Response) {
    try {
        const existingUser = await User.find({
            email: req.body.email
        });

        if(existingUser.length)
            return res.status(403).send("Account already exists for that email address");

        const user = new User(req.body);

        await user.save();
        const token = await user.generateAuthToken();

        return res.status(201).send({ user, token });
    } catch(e) {
        console.log(e.message);
        return res.status(400).send("Could not create account, please try again later.");
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        return res.send({ user, token });
    } catch (e) {
        console.log(e.message);
        return res.status(400).send(e.message);
    }
}

async function logoutUser(req: any, res: Response) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
}

async function logoutAllUser(req: any, res: Response) {
    try {
        req.user.tokens = [];
        await req.user.save();
        return res.send();
    } catch (e) {
        return res.status(500).send();
    }
}

async function friendRequest(req: any, res: Response) {
    try {
        if(!req.body.userId)
            return res.status(400).send("Must include UserId to add");

        if(req.user.friends.includes(req.body.userId))
            return res.status(200).send("Already friends");

        let otherUser = User.findById(req.body.userId);
        if(!otherUser)
            return res.status(404).send(`Could not find user with id ${req.body.userId}`);

        req.user.friends.push({
            id: req.body.userId
        });

        await req.user.save();
        
        otherUser.friends.push({
            id: req.user._id
        });

        await otherUser.save();
        
        return res.status(201).send();
    } catch(e) {
        return res.status(500).send();
    }
}

async function findUser(req: any, res: Response) {
    try {
        const search = req.params.search.toLowerCase();

        const users = await User.find({
            $or: [
                {
                    name_lower: { $regex: search }
                },
                {
                    email: {$regex: search}
                }
            ]
        }, 'name email _id');

        return res.send(users);
    } catch(e) {
        console.log(e);
        return res.status(500).send();
    }
    
}