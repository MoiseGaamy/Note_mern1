const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        requireq: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
}
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;