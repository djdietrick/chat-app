import {Router, Request, Response} from 'express';
const User = require('../models/user');
const Room = require('../models/room');
const {auth, roomMember, roomAdmin} = require('../middleware/auth');

export function RoomRouter(router: Router = Router()): Router {
    router.post('/rooms/create', auth, createRoom);
    router.post('/rooms/add/member', [auth,roomAdmin], addMemberToRoom);
    router.post('/rooms/add/admin', [auth,roomAdmin], addAdminToRoom);
    router.patch('/rooms', [auth,roomMember], updateRoom);
    router.post('/rooms/leave', [auth,roomMember], leaveRoom);
    router.post('/rooms/kick', [auth,roomAdmin], kickMember);
    router.delete('rooms', [auth, roomAdmin], deleteRoom);
    
    return router;
}

async function createRoom(req: any, res: Response) {
    try {
        const room = new Room({
            name: req.body.name,
            members: req.body.members,
            admins: new Array([req.user._id])
        });

        await room.save();
        return res.status(201).send(room);

    } catch(e) {
        console.log(e.message);
        return res.status(400).send("Could not create room, please try again later.");
    }
}

async function addMemberToRoom(req: any, res: Response) {
    try {
        const user = await User.findById(req.body.new_user_id);
        if(!user)
            return res.status(404).send("Could not find user [" + req.body.new_user_id + "]");

        if(!req.room.members.includes(user._id))
            req.room.members.push(user._id);
        
        await req.room.save();

        return res.status(201).send(req.room);
            
    } catch(e) {
        console.log(e.message);
        return res.status(400).send("Could not add member to room, please try again later.");
    }
}

async function addAdminToRoom(req: any, res: Response) {
    try {
        const user = await User.findById(req.body.new_user_id);
        if(!user)
            return res.status(404).send("Could not find user [" + req.body.new_user_id + "]");

        if(!req.room.members.includes(user._id))
            return res.status(404).send("Can only make room members admins");

        if(!req.room.admins.includes(user._id))
            req.room.admins.push(user._id);
        
        await req.room.save();

        return res.status(201).send(req.room);
            
    } catch(e) {
        console.log(e.message);
        return res.status(400).send("Could not add member to room, please try again later.");
    }
}

async function updateRoom(req: any, res: Response) {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            const invalidUpdates = updates.filter(update => !allowedUpdates.includes(update));
            return res.status(400).send({ 
                error: 'Invalid updates!', 
                invalidUpdates
            })
        }

        updates.forEach((update) => req.room[update] = req.body[update]);
        await req.room.save();

        return res.send(req.room);
    } catch(e) {
        console.log(e.message);
        return res.status(400).send("Could not update room, please try again later.");
    }
}

async function deleteRoom(req: any, res: Response) {
    try {
        await req.room.delete();
        return res.send();
    } catch(e) {
        console.log(e.message);
        return res.status(400).send("Could not delete room, please try again later.");
    }
}

async function leaveRoom(req: any, res: Response) {
    try {
        let index = req.room.members.indexOf(req.user._id);
        if (index > -1) {
            req.room.members.splice(index, 1);
        }

        index = req.room.admins.indexOf(req.user._id);
        if(index > -1) {
            req.room.admins.splice(index,1);
        }

        await req.room.save();

        return res.send(req.room);

    } catch(e) {
        console.log(e.message);
        return res.status(400).send("Error leaving room, please try again later.");
    }
}

async function kickMember(req: any, res: Response) {
    try {
        let index = req.room.members.indexOf(req.body.user_id);
        if (index > -1) {
            req.room.members.splice(index, 1);
        }

        index = req.room.admins.indexOf(req.body.user_id);
        if(index > -1) {
            req.room.admins.splice(index,1);
        }

        await req.room.save();

        return res.send(req.room);

    } catch(e) {
        console.log(e.message);
        return res.status(400).send("Error kicking member, please try again later.");
    }
}