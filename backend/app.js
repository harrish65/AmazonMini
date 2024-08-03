const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const connectDB = require('./config/connectDB.js');
const products = require('./routes/product.js');
const orders = require('./routes/order.js');
const cors = require('cors');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', '.env') });
connectDB();

// Enable CORS for all routes
app.use(cors());

// Use JSON middleware
app.use(express.json());

// Use routes
app.use('/api/v1', products);
app.use('/api/v1', orders);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
    });
}

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} port is listening in ${process.env.NODE_ENV}`);
});
