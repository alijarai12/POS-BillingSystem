const express = require('express');
const cors = require('cors');
const pool = require('./config/db');



// Import routes

const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const staffRoutes = require('./routes/staffRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const userPermissionRoutes = require('./routes/userPermissionRoutes'); // Adjust the path as necessary
const rolePermissionRoutes = require('./routes/rolePermissionRoutes');


const app = express();

// Middleware
app.use(cors());


// Parse JSON request body
app.use(express.json());


// Use routes
app.use('/auth/role', roleRoutes);

app.use('/auth/user', userRoutes);
app.use('/auth/tenant', tenantRoutes);
app.use('/auth/staff', staffRoutes);
app.use('/auth/permission', permissionRoutes);
app.use('/auth/userpermission', userPermissionRoutes);

app.use('/auth/rolepermission', rolePermissionRoutes);


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