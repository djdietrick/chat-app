import {ChatApp} from './app';

let port = parseInt(process.env.PORT) || 3000;

const app = new ChatApp();
app.listen(port);