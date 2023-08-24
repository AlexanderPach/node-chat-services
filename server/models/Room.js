const mongoose = require('mongoose')
const Message = require('./Message')

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        users: [String],
        message: [Message]
    }
)

RoomSchema.methods.addUser = function (user) {
    this.users.push(user);
    return this.save();
}

module.exports = mongoose.model('Room', RoomSchema);