const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const {
    CreateNote,
    GetAllNotes,
    GetNoteById,
    UpdateNote,
    deleteNote,
    getPublicNotes,
    toggleVisibility,
    
} = require("../Controllers/note.controller");

//create
router.post("/",  protect,CreateNote);
router.get("/", protect,GetAllNotes);
router.get("/public", protect, getPublicNotes);
router.get("/:id",protect,GetNoteById);
router.put("/:id",protect, UpdateNote);
router.delete("/:id",protect, deleteNote);
router.patch("/:id/visibility", protect, toggleVisibility);
module.exports = router;
