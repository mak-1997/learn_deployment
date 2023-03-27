const mongoose = require("mongoose");

const todosSchema = mongoose.Schema({
    title: String,
    body: String,
    status: Boolean,
    userID: String
},{
    versionKey: false
})

const TodosModel = mongoose.model("todos",todosSchema);

module.exports = {TodosModel};