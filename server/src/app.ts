import * as express from 'express';
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
let fs = require('fs');
import * as https from 'http';
import * as socketio from 'socket.io';
import {UserRouter} from './routes/user';
import {RoomRouter} from './routes/room';

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
        this.initRouters();
        this.initSettings();
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
            this.io.on('connection', (socket: any) => {
                console.log('User connected');
                let room: any = null;
                socket.on('join', (r: any) => {
                    room = r;
                    console.log("User joining room ", room);
                    socket.join(room);
                });
                socket.on('message', (msg: any) => {
                    console.log(`Msg: ${msg}, Room: ${room}`);
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

    private initDb(): void {
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