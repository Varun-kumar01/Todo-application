const express = require('express')
const app = express();
const TodoModel = require('./db.js');
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/get', async (req,res) => {
    const allTodos = await TodoModel.find({})
    res.json({
        allTodos
    })
})

app.post('/add', async (req,res) => {
    await TodoModel.create({
        task:req.body.task
    })
    res.json({
        msg: "added todo"
    })
})

app.put('/update/:id', async (req,res) => {
    const id = req.params.id;
    const todo = await TodoModel.findById(id);

    await TodoModel.findByIdAndUpdate(id, {
        done: !todo.done
    }, { new: true });
    res.json({
        msg: " updated "
    })
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await TodoModel.deleteOne({_id: id});
    res.json("removed");
})

app.listen(3000,(req,res) =>{
    console.log("listening")
})