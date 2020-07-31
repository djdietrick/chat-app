import * as express from 'express';
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
let fs = require('fs');
import * as https from 'http';
import * as socketio from 'socket.io';
import {UserRouter} from './routes/user';
import {RoomRouter} from './routes/room';
import {onSocketConnect} from './socket';
const Message = require('./models/message');
const Room = require('./models/room');

const publicDir = path.join(__dirname, '../../client/dist/');

export class ChatApp {
    public express: express.Application;
    public io: socketio.Server;
    public server: any;

    constructor() {
        this.express = express();
        // const options = {
        //     key: fs.readFileSync(process.env.KEY_LOCATION),
        //     cert: fs.readFileSync(process.env.CERT_LOCATION)
        // }
        this.initSettings();
        this.initRouters();
        this.initDb();

        this.server = https.createServer(this.express);
        this.initSocket();
    }

    public listen(port: Number): void {
        this.server.listen(port, () => {
            console.log('Server is up on http://localhost:' + port);
        });
    }

    private initSocket(): void {
        try {
            this.io = socketio.listen(this.server);
            this.io.on('connection', (socket: socketio.Socket) => {
                console.log('User connected');

                socket.on('join', (r: string) => {
                    console.log("User joining room ", r);
                    socket.join(r);

                    Room.findById(r).populate({
                        path: 'messages',
                        match: {roomId: r},
                        limit: 50,
                        sort: { 'created_at' : 1 }
                    }).then(room => {
                        socket.emit('roomMessages', {
                            roomId: room._id,
                            messages: room.messages
                        })
                    }).catch(err => console.log(err));
                });

                socket.on('message', async (msg: any) => {
                    console.log(`Msg: ${msg.text}, Room: ${msg.roomId}, Sender: ${msg.sender}`);
                    // Save message
                    const message = await new Message({
                        ...msg
                    }).save();

                    // Send to everyone in room
                    this.io.to(msg.room).emit('message', message);
                });

                socket.on('disconnect', () => {
                    console.log("User has left.");
                });
            });
        } catch(e) {
            console.log(e);
        } 
    }

    private initSettings(): void {
        this.express.use(express.static(publicDir));

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));

        this.express.use(cors());
    }

    private async initDb(): Promise<void> {
        require('./db/mongoose');
    }

    private initRouters(): void {
        this.express.use('/api', UserRouter());
        this.express.use('/api', RoomRouter());

        // this.express.get(/.*/, (req: express.Request, res: express.Response) => {
        //     res.sendFile('index.html', {root: publicDir});
        // });
    }
}