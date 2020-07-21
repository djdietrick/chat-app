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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, options);

const Message = mongoose.model('message', messageSchema);

module.exports = Message;