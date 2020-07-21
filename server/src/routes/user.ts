import {Router, Request, Response} from 'express';
const User = require('../models/user');
const {auth} = require('../middleware/auth');

export function UserRouter(router: Router = Router()): Router {
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