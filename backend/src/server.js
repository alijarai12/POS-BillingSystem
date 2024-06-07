const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const sequelize = require('./config/db');
// const seedRoles = require('./config/seedRoles');

const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error synchronizing the database:', err);
    });
