import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import formRoutes from './routes/form.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/forms', formRoutes);

// const dbUrl = "mongodb://127.0.0.1:27017/altibbe";

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.error('DB Connection Failed:', err.message);
});


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong! Please try again later.' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});