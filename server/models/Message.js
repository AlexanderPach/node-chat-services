const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        chat: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Chat'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: {
            createdAt: 'created_at'
        }
    }
)

const Message = mongoose.model('Message', MessageSchema);

module.exports = {Message}