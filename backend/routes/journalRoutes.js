import express from 'express';
import { getEntries, getEntry, createEntry, updateEntry , deleteEntry } from '../controllers/journalController.js';

const router = express.Router();


router.get('/',getEntries)
router.post('/',createEntry);


router.get('/:id',getEntry)
router.put('/:id',updateEntry)
router.delete('/:id',deleteEntry);

export default router;