const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema(
    {
        room_name: {
            type: String,
            required: true,
            unique: true,
            maxlength: ['21', 'Room Name should not be longer than 21 characters']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        password: {
            type: String,
            default: ' '
        },
        users: [
            {
                _id: false,
                lookup: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'User'
                },
                socketId: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
)

const Room = mongoose.model('Chat', ChatRoomSchema);

module.exports = {Room}