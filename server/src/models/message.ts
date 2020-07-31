import * as mongoose from 'mongoose';

const options = {
    collection: 'messages',
    timestamps: true
}

const messageSchema: mongoose.Schema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, options);

const Message = mongoose.model('message', messageSchema);

module.exports = Message;