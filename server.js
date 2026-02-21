const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const connectDB = require("./config/db");
app.use(express.json());
app.use(express.static("public"));
const cors = require("cors");
app.use(cors());
const authRoutes = require("./Routes/auth.routes");

app.use("/api/auth", authRoutes);
connectDB();



const noteRoutes = require("./Routes/note.routes");
app.use("/api/notes", noteRoutes);

app.listen(port,()=> {
    console.log(`server started successfully at port ${process.env.PORT}`);
});
