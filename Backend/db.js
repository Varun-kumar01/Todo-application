const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/")

const todoSchema = mongoose.Schema({
    task:String,
    done:{
        type:Boolean,
        default:false
    }
})

const TodoModel = mongoose.model("todos", todoSchema)

module.exports = TodoModel