const express = require("express");
const {connection} = require("./db");
const {userRouter} = require("./routes/user.route");
const {todosRouter} = require("./routes/todos.route");
const {auth} = require("./middleware/auth.middleware");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/todos",todosRouter);


app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log("Cannot connect to the database");
        console.log(error);
    }
    console.log(`Server is running on port ${process.env.port}`);
});
