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
})

test('Create room', async () => {
    let users = await User.find();
   
    const room = {
        name: 'Test room',
        members: [users[0]._id]
    }

    await sendAuthRequest('post', '/rooms/create', room);

    const rooms = await Room.find();
    expect(rooms.length).toBe(1);
    expect(rooms[0].name).toBe('Test room');
    expect(rooms[0].members.length).toBe(1);
    expect(rooms[0].admins.length).toBe(1);
});