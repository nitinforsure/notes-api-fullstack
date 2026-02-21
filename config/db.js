const mongoose = require("mongoose");
const connectDB = async()=> {
    try{
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`mongoDB connected: ${process.env.PORT}`);
    }catch(error){
        console.error("database connection failed:", error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
