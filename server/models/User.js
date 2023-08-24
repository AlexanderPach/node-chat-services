const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: ['14', 'Username should not be longer than 14 characters']
        },
        password: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        }
    }
)


const User = mongoose.model('User', userSchema);
module.exports = { User }