require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

const customerRoutes = require('./routes/customer');
app.use('/api/customers', customerRoutes);

app.get('/', (req, res) => {
    res.send('Backend API is running');
});

connectToMongoDB();

async function connectToMongoDB() {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vishalsurya27_db_user:0Wa7SMKOu1Bf9mg4@cluster-1.72zt3f5.mongodb.net/customersDB?appName=Cluster-1';
    try {
        await mongoose.connect(MONGODB_URI);
        mongoose.set('strictQuery', true);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = app;