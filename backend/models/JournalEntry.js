import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    content: {
        type: String,
        required: [true, 'Please add content'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('JournalEntry', journalEntrySchema);