import * as socketio from 'socket.io';
import {UserRouter} from './routes/user';
import {RoomRouter} from './routes/room';

export function onSocketConnect(socket: socketio.Socket) {
    console.log('User connected');
    let room: any = null;

    socket.on('join', (r: string) => {
        room = r;
        console.log("User joining room ", room);
        socket.join(room);
    });

    socket.on('message', (msg: any) => {
        console.log(`Msg: ${msg.text}, Room: ${msg.room}, Sender: ${msg.sender}`);
        // Save message

        // Send to everyone in room
    });

    socket.on('disconnect', () => {
        console.log("User has left.");
    })
}