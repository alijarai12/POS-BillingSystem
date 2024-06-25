// const multer = require('multer');

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, ''); // Uploads directory
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix); // File name with unique suffix
//   }
// });

// // File filter for accepting only CSV files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'text/csv') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only CSV files are allowed'));
//   }
// };

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// module.exports = upload;
// const fs = require('fs');
// const multer = require('multer');
// const path = require('path');

// // Storage configuration for both CSV and image files
// const storage = multer.diskStorage({
//   destination: (_req, file, cb) => {
//     console.log(file.originalname);
//     let dir;
    
//     // Determine the directory based on the file type
//     if (file.mimetype.includes('csv')) {
//       dir = path.join(__dirname, '../uploads/csv');
//     } else if (file.mimetype.includes('image')) {
//       dir = path.join(__dirname, '../uploads/images');
//     } else {
//       return cb(new Error('Invalid file type'), false);
//     }

//     // Create the directory if it does not exist
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },
//   filename: (_req, file, cb) => {
//     console.log(file.originalname);
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // File filter to allow only CSV and image files
// const fileFilter = (_req, file, cb) => {
//   console.log('Reading file in middleware', file.originalname);
//   if (!file) {
//     cb(new Error('Please upload a file to proceed.'), false);
//   } else if (file.mimetype.includes('csv') || file.mimetype.includes('image')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Please upload only CSV or image files.'), false);
//   }
// };

// // Multer configuration
// const uploadFile = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

// module.exports = uploadFile;

const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Storage configuration for both CSV and image files
const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    let dir;
    
    // Determine the directory based on the file type
    if (file.mimetype.includes('csv')) {
      dir = path.join(__dirname, '../uploads/csv');
    } else if (file.mimetype.includes('image')) {
      dir = path.join(__dirname, '../uploads/images');
    } else {
      return cb(new Error('Invalid file type'), false);
    }

    // Create the directory if it does not exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

// File filter to allow only CSV and image files
const fileFilter = (_req, file, cb) => {
  if (file.mimetype.includes('csv') || file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only CSV or image files.'), false);
  }
};

// Multer configuration
const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = uploadFile;


