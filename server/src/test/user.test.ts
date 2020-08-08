import {ChatApp} from '../app';
import {clearData} from './fixtures/db';
import * as request from 'supertest';
const User = require('../models/user');

beforeAll(async () => {
    await clearData();
});

afterAll(async () => {
    await clearData();
});

const app = new ChatApp();

test('Create User', async () => {
    await request(app.express).post('/api/users')
        .send({
            name: "David Dietrick",
            email: "djdietrick@gmail.com",
            password: "password"
        }).expect(201);
    
    const users = await User.find();
    expect(users.length).toBe(1);
    const userModel = users[0];
    expect(userModel.tokens.length).toBe(1);
});

test('Login/Logout User', async () => {
    const loginRes = await request(app.express).post('/api/users/login')
        .send({
            email: "djdietrick@gmail.com",
            password: "password"
        }).expect(200);
    
    const user = loginRes.body.user;
    expect(user.name).toBe("David Dietrick");
    const token = loginRes.body.token;

    let users = await User.find();
    expect(users.length).toBe(1);
    let userModel = users[0];
    expect(userModel.tokens.length).toBe(2); // For some reason, the token is the same, maybe timing issue
    expect(token).toBe(userModel.tokens[1].token);
    

    await request(app.express).post('/api/users/logout')
        .set({"Authorization": "Bearer " + token}).expect(200);

    users = await User.find();
    userModel = users[0];
    expect(userModel.tokens.length).toBe(0);
});

test('Add friend', async () => {
    await request(app.express).post('/api/users')
        .send({
            name: "David Dietrick",
            email: "djdietrick@gmail.com",
            password: "password"
        }).expect(201);
})