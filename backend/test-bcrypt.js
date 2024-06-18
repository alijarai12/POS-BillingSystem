const bcrypt = require('bcrypt');

const saltRounds = 10;
const plainTextPassword = 'your-password';

bcrypt.hash(plainTextPassword, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
    // Use the hash for storing in your database or other operations
  }
});