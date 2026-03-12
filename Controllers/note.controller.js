const Note = require("../Models/notes.model");
const CreateNote = async(req , res )=>{
    try{
         const {title, content, isPublic } = req.body;
         const note = await Note.create({title, 
          content, user: req.userId, isPublic: isPublic || false});
         res.status(201).json(note);
           

    } catch(error){
       res.status(500).json({message: error.message});
    }
};

/*const GetAllNotes = async(req, res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
    const limit =parseInt(req.query.limit)  || 5;
       const skip = (page-1)* limit;
       
const notes = await Note.find({user: req.userId})
 .skip(skip)
 .limit(limit)
 .sort({createdAt : -1});
const total = await Note.countDocuments({user: req.userId});
      
      res.status(200).json({ 
        total,
        page,
        pages: Math.ceil(total/limit),
        notes}
       );
    } catch(error){
       res.status(500).json({message: error.message});
    }
}; */
const GetAllNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    // Build search query
    const query = {
      user: req.userId,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        
      ]
    };

    const notes = await Note.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: sortOrder });

    const total = await Note.countDocuments(query);

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      notes,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const GetNoteById = async(req, res)=> {
    
try{
const note = await Note.findOne({
_id : req.params.id,
user:req.userId
});
if(!note){
        res.status(404).json({message: " Note not found"});
    }
    res.status(200).json(note);
} catch(error){
  res.status(500).json({message: error.message});
}

};



const UpdateNote = async(req, res)=>{
    try{
       const note = await Note.findOneAndUpdate(
    {_id: req.params.id, user: req.userId},
        req.body,
      { returnDocument: "after" }
       );

       if(!note){
        res.status(404).json({message: "note not found"});
       }

       res.status(200).json(note);
    } catch(error){
        res.status(500).json({message:error.message});
    }
};
const deleteNote = async(req, res)=>{
    try{
const  note =await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.userId
});
  if(!note){
    res.status(404).json({message:" Note not Found"});
  }
res.status(200).json({message: " Note Deleted Successfully"});
  
    } catch(error){
res.status(500).json({message: error.message});
    }
  
};
const getPublicNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isPublic: true })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch public notes" });
  }
};

module.exports = {
    CreateNote,
    GetAllNotes,
    GetNoteById,
    UpdateNote,
    deleteNote,
    getPublicNotes
}
