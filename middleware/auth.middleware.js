const jwt = require("jsonwebtoken");
const user = require("../Models/user.model");
const protect = async(req , res , next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message: " no token provided"});

    }
    const token = authHeader.split(" ") [1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();

    } catch(error){
        return res.status(401).json({message: "invalid token"});

    }
};
module.exports = protect;
