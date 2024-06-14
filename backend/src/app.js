const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
// Import routes
const userRoutes = require('./routes/authRoutes');
const billRoutes = require('./routes/billRoutes');
const taxRoutes = require('./routes/taxRoutes');
const productRoutes = require('./routes/productRoutes');
const variantRoutes= require('./routes/variantRoutes');
const discountRoutes= require('./routes/discountRoutes');
const app = express();

// Middleware
app.use(cors());

// Parse JSON request body
app.use(express.json());


// Use routes
app.use('/api/user', userRoutes);// Prefixing routes with /api

app.use('/api',billRoutes);
app.use('/api', taxRoutes);
app.use('/api', productRoutes);
app.use('/api',variantRoutes);
app.use('/api',discountRoutes);









// Sample function
app.get('/', (req, res) => {
    res.send('Hello, world!');
});


app.get('/user', async (req, res) => {
  try{
    const users = await pool.query('SELECT * FROM users');
    res.status(200).json(users.rows);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});



module.exports = app;