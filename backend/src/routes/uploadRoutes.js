// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/multerMiddleware');
// const uploadController = require('../controllers/uploadController');

// // Route for uploading CSV file
// router.post('/upload', upload.single('csvFile'), (req, res) => {
//   try {
//     const filePath = req.file.path;
//     uploadController.uploadProductsAndVariants(filePath);
//     res.status(200).send('File uploaded successfully');
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// module.exports = router;
const express = require('express');
const csvController = require('../controllers/uploadController.js');
// const getAllProducts = require('../controllers/productControllers.js');
const uploadFile = require('../middleware/multerMiddleware.js');

const router = express.Router();

// CSV Routes
router.post('/csv/upload', uploadFile.single('file'), csvController.upload);
router.get('/csv/download', csvController.download);

// Products Route
// router.get('/products', getAllProducts);

module.exports = router;
