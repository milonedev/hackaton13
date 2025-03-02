import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    }, 
    image: {
        type: String,
        require: true,
    },
    cover: {
        type: String,
        require: true,
    }, 
    precio: {
        type: Number,
        require: true,
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Courses', CourseSchema)