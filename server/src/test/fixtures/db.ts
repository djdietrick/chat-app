const User = require('../../models/user');
const Room = require('../../models/room');
import {ChatApp} from '../../app';

const app = new ChatApp().express;

export async function clearData() {
    await Room.deleteMany();
    await User.deleteMany();
}

export async function createUser() {
    await new User({
        name: "David Dietrick",
        email: "djdietrick@gmail.com",
        password: "password"
    }).save();
}
