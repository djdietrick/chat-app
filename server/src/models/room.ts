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
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }],
}, options);

roomSchema.virtual('messages', {
    ref: 'message',
    localField: '_id',
    foreignField: 'roomId',
    justOne: false
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;
