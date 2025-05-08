import JournalEntry from "../models/JournalEntry.js";

export const getEntries = async (req,res)=>{
    try {
        const entries = await JournalEntry.find().sort({createdAt : -1});
        // const entries = [
        //     { id: 1, title: 'My First Entry', content: 'This is a sample journal entry.' },
        //     { id: 2, title: 'Another Entry', content: 'This is another entry.' }
        //   ];
        console.log('All entries fetched');
        res.status(200).json(entries);
    } catch (error) {
        console.log('Error fetching entries');
        res.status(500).json({message : error});
    }
};

export const getEntry = async (req,res)=>{
    try {
        const entry = await JournalEntry.findById(req.params.id);
        console.log('Entry with specific id fetched :',entry);
        res.status(200).json(entry);
    } catch (error) {
        console.log('Error fetching entry');
        res.status(500).json({message : error});
    }
};

export const createEntry = async (req,res)=>{
    try {
        const { title, content } = req.body;
        const newEntry = new JournalEntry({ title, content });
        await newEntry.save();
        console.log('new entry created');
        res.status(200).json(newEntry);
    } catch (error) {
        console.log('Error creating entry');
        res.status(500).json({message : error});
    }
};

export const updateEntry = async (req,res)=>{
    try {
        const { title, content } = req.body;
        const updatedEntry = await JournalEntry.findByIdAndUpdate(req.params.id, {title, content} , {new : true});
        console.log('entry updated ');
        res.status(200).json(updatedEntry);
    } catch (error) {
        console.log('Error updating entry');
        res.status(500).json({message : error});
    }
};

export const deleteEntry = async (req,res)=>{
    try {
        const deletedEntry = await JournalEntry.findByIdAndDelete(req.params.id);
        console.log('entry deleted');
        res.status(200).json(deletedEntry);
    } catch (error) {
        console.log('Error deleting entry');
        res.status(500).json({message : error});
    }
};