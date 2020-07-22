const User = require('../../models/user');
const Room = require('../../models/room');
import {ChatApp} from '../../app';

const app = new ChatApp().express;

const clearData: Function = async () => {
    await Room.deleteMany();
    await User.deleteMany();
}

const createUser: Function = async () => {
    await new User({
        name: "David Dietrick",
        email: "djdietrick@gmail.com",
        password: "password"
    }).save();
}

module.exports = {
    createUser,
    clearData
}