import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    }, 
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'], 
        default: 'user',
        require: true,
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model('User', UserSchema)