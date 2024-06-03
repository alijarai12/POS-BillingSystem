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
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    console.log(file.originalname);
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const csvFilter = (_req, file, cb) => {
  console.log('Reading file in middleware', file.originalname);
  if (!file) {
    cb(new Error('Please upload a file to proceed.'), false);
  } else if (file.mimetype.includes('csv')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only csv file as only CSV is supported for now.'), false);
  }
};

const uploadFile = multer({
  storage: storage,
  fileFilter: csvFilter,
});

module.exports = uploadFile;
