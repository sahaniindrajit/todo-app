import mongoose from 'mongoose'
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
    important: {
        type: Boolean,
        required: false,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

export default mongoose.model('task', taskSchema);