import * as express from 'express';
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
import * as socketio from 'socket.io';

const publicDir = path.join(__dirname, '../../client/dist/');

export class ChatApp {
    public express: express.Application;
    public io: socketio.Server;

    constructor() {
        this.express = express();
        this.initSettings();
        this.initDb();
        this.initSocket();
        
    }

    public listen(port: Number): void {
        this.express.listen(port, () => {
            console.log('Server is up on http://localhost:' + port);
        });
    }

    private initSocket(): void {
        this.io = socketio();
        this.io.on('connection', (socket) => {
            console.log('User connected');
            socket.on('message', (msg) => {
                console.log(msg);
            });
        });
    }

    private initSettings(): void {
        this.express.use(express.static(publicDir));

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: true}));

        this.express.use(cors());
    }

    private initDb(): void {
        require('../db/mongoose');
    }

    private initRouters(): void {

    }
}