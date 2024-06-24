const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

// Import models
const {User, Role, Permission, UserPermission} = require('./models');



// Import routes

const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const staffRoutes = require('./routes/staffRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const userPermissionRoutes = require('./routes/userPermissionRoutes'); 
const passwordRoutes = require('./routes/passwordRoutes');
const authenticateToken = require('./middleware/auth');


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
app.use('/auth/password', passwordRoutes);



app.get('/auth/grant-permission', authenticateToken, async (req, res) => {
  try {
    const user = req.user;

    // If user is superadmin, grant all permissions
    if (user.username === 'superadmin') {
      return res.json({ permissions: ['superadmin'] });
    }

    // Fetch user's role from the database
    const fetchedUser = await User.findByPk(user.userId, { include: [{ model: Role }] });
    if (!fetchedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userRole = fetchedUser.Role.role_name;

    // If user's role is "store", grant all permissions
    if (userRole === 'store') {
      return res.json({ permissions: ['store'] });
    }

    // Fetch user permissions from the database
    const userPermissions = await UserPermission.findAll({
      where: { user_id: user.userId },
      include: [
        {
          model: Permission,
          attributes: ['permission_name'],
        },
      ],
    });

    const permissions = userPermissions.map(up => up.Permission.permission_name);

    res.json({ permissions });
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


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