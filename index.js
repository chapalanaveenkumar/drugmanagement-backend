const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const drugsRoutes=require("./routes/drugsRoutes");
const subscriptionRoutes=require("./routes/subscriptionRoutes");
const refillRoutes = require('./routes/refillRoutes');

dotenv.config();

// Create the express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse incoming request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection failed:', error.message));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/drugs',drugsRoutes);  // Add the user routes;
app.use('/api/subscription',subscriptionRoutes);
app.use('/api', refillRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
