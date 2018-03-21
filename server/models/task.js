const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    isDone: Boolean
})

module.exports = mongoose.model('Task', taskSchema)