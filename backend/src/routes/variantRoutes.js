// const express = require('express');
// const variantController = require('../controllers/variantControllers');

// const router = express.Router();

// router.post('/variants', variantController.createVariant);
// router.get('/variants', variantController.getAllVariants);
// router.get('/variants/:id', variantController.getVariantById);
// router.put('/variants/:id', variantController.updateVariantById);
// router.delete('/variants/:id', variantController.deleteVariant);

// module.exports = router;

const express = require('express');
const variantController = require('../controllers/variantControllers');

const router = express.Router();

// Routes for managing variants
router.post('/products/:productId/variants', variantController.createVariant); // POST request to add a variant to a specific product
router.get('/variants', variantController.getAllVariants); // GET request to retrieve all variants
router.get('/variants/:id', variantController.getVariantById); // GET request to retrieve a variant by ID
router.put('/variants/:id', variantController.updateVariantById); // PUT request to update a variant by ID
router.delete('/variants/:id', variantController.deleteVariant); // DELETE request to delete a variant by ID

module.exports = router;
