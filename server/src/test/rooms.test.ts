const request = require('supertest');
const {sendAuthRequest} = require('./fixtures/auth');
const {clearData,createUser} = require('./fixtures/db');
const Room = require('../models/room');
const User = require('../models/user');

beforeEach(async() => {
    await clearData();
    await createUser();
});

afterAll(async() => {
    await clearData();
});

let createRoom = async () => {
    let users = await User.find();
   
    const room = {
        name: 'Test room',
        members: [users[0]._id]
    }

    let res = await sendAuthRequest('post', '/rooms/create', room);
    return res.body;
};

test('Create room', async () => {
    await createRoom();

    const rooms = await Room.find();
    expect(rooms.length).toBe(1);
    expect(rooms[0].name).toBe('Test room');
    expect(rooms[0].members.length).toBe(1);
    expect(rooms[0].admins.length).toBe(1);
});

test('Add Member', async () => {
    let room = await createRoom();

    let newUser = {
        name: "test",
        email: "test@gmail.com",
        password: "test123"
    };

    let newUserRes = await sendAuthRequest('post', '/users', newUser);
    expect(newUserRes.status).toBe(201);

    let updatedRoomRes = await sendAuthRequest('post', '/rooms/add/member', {
        new_user_id: newUserRes.body.user._id,
        room_id: room._id
    })
    expect(updatedRoomRes.status).toBe(201);
    expect(updatedRoomRes.body.members.length).toBe(2);
});

test('Add Admin', async () => {
    let room = await createRoom();

    let newUser = {
        name: "test",
        email: "test@gmail.com",
        password: "test123"
    };

    let newUserRes = await sendAuthRequest('post', '/users', newUser);
    expect(newUserRes.status).toBe(201);

    let updatedRoomRes = await sendAuthRequest('post', '/rooms/add/member', {
        new_user_id: newUserRes.body.user._id,
        room_id: room._id
    });

    expect(updatedRoomRes.status).toBe(201);
    expect(updatedRoomRes.body.members.length).toBe(2);
    expect(updatedRoomRes.body.admins.length).toBe(1);

    updatedRoomRes = await sendAuthRequest('post', '/rooms/add/admin', {
        new_user_id: newUserRes.body.user._id,
        room_id: room._id
    });

    expect(updatedRoomRes.status).toBe(201);
    expect(updatedRoomRes.body.members.length).toBe(2);
    expect(updatedRoomRes.body.admins.length).toBe(2);

});