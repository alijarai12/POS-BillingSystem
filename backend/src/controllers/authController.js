const User = require('../models/User');

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Create a new user
        const newUser = await User.create({ username, email, password });
        
        // Respond with the newly created user
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        
        if (error.username === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Username or email already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};

module.exports = { createUser };