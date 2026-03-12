const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
               },
        content: {
         type: String,
         required: true,
        },
       user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
       },
       isPublic: {
        type: Boolean,
        default: false
       }
    },
    {timestamps: true}
);
const Note = mongoose.model("note", noteSchema);
module.exports = Note;