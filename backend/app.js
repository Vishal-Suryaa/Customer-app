const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(cors());
//enable json body parser
app.use(express.json());
const customerRoutes = require('./routes/customer');
app.use('/api/customers', customerRoutes);

app.get('/', (req, res) => {
    res.send('Backend API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectToMongoDB();

async function connectToMongoDB() {
    const MONGODB_URI = 'mongodb+srv://vishalsurya27_db_user:0Wa7SMKOu1Bf9mg4@cluster-1.72zt3f5.mongodb.net/?appName=Cluster-1';
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}