import * as mongoose from 'mongoose';

const options = {
    collection: 'rooms',
    timestamps: true
}

const roomSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    members: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'User'
    },
    admins: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'User'
    },
    messages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Message'
    }
}, options);

const Room = mongoose.model('room', roomSchema);

module.exports = Room;
