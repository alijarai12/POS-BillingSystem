// middleware/auth.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        // console.log('Decoded Token:', decodedToken); // Log decoded token
        req.user = decodedToken; // Attach the entire decoded token to the req object
        next();
    });
};

module.exports = authenticateToken;
