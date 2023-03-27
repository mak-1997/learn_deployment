const express = require("express");
const {TodosModel} = require("../model/todos.model");
const jwt = require("jsonwebtoken");

const todosRouter = express.Router();

// Read
todosRouter.get("/", async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,"signature");
    try {
        if(decoded){
            const todo = await TodosModel.find({"userID": decoded.userID});
            res.status(200).send(todo);
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
});

// Post
todosRouter.post("/add", async(req,res)=>{
    try {
        const todo = new TodosModel(req.body)
        await todo.save();
        res.status(200).send({"msg":"A new Note has been added"});
    } catch (error) {
        res.status(400).send({"msg": error.message});
    }
})

// Update
todosRouter.patch("/update/:todoID", async(req,res)=>{
    const id = req.params.todoID;
    const payload = req.body;
    try {
        await TodosModel.findByIdAndUpdate({_id: id},payload);
        res.status(200).send({"msg":"Task has been updated"});
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

// Delete
todosRouter.delete("/delete/:todoID",async(req,res)=>{
    const id = req.params.todoID;
    try {
        await TodosModel.findByIdAndDelete({_id: id});
        res.status(200).send({"msg":"Task deleted successfully"});
    } catch (error) {
        res.status(200).send({"msg":error.message});        
    }
})

module.exports={todosRouter};