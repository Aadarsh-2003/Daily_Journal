import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import journalRoutes from './routes/journalRoutes.js'
import { DBConnect } from './config/db.js';

dotenv.config();
DBConnect();

const App = express();
App.use(cors());
App.use(express.json());

// App.use('/',(req,res)=>{
//     res.send('Welcome to my Daily Journal project');
// });

App.use('/api/journal' , journalRoutes);

App.listen(process.env.PORT,()=>{
    console.log('Server started at : https://localhost:5000');
})