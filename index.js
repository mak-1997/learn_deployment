const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { todosRouter } = require("./routes/todos.route");
const { auth } = require("./middleware/auth.middleware");
require("dotenv").config();
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: [`https://frontend-ochre-beta.vercel.app/`, "https://example.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/users", userRouter);
app.use(auth);
app.use("/todos", todosRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Cannot connect to the database");
    console.log(error);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
