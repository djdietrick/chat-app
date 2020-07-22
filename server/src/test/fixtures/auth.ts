const User = require('../../models/user');
import * as request from 'supertest';
import {ChatApp} from '../../app';

const app = new ChatApp().express;

const sendAuthRequest: Function = async function(method: string, 
    url: string, data: any = null): Promise<request.Response> {

    const loginResponse = await request(app).post('/api/users/login')
        .send({
            email: "djdietrick@gmail.com",
            password: "password"
        }).expect(200);
    const token = loginResponse.body.token;
    
    let ret: request.Response = null;
    if(method === "post") {
        ret = await request(app).post('/api' + url)
            .send(data).set({"Authorization": "Bearer " + token});
    } else if(method === "get") {
        ret = await request(app).get('/api' + url).set({"Authorization": "Bearer " + token});
    } else if(method === "patch") {
        ret = await request(app).patch('/api' + url)
        .send(data).set({"Authorization": "Bearer " + token});
    } else if(method === "delete") {
        ret = await request(app).delete('/api' + url)
        .set({"Authorization": "Bearer " + token});
    } else {
        throw new Error("Must send a method");
    }

    await request(app).post('/api/users/logout').set({"Authorization": "Bearer " + token});

    return ret;
};

module.exports = {
    sendAuthRequest
};