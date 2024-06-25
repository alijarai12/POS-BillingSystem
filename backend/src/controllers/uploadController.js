const { createReadStream } = require("fs");
const { parse } = require("fast-csv");
const path = require("path");
const Product = require("../models/Product.js");
const Variant = require("../models/Variant.js");
const { Parser } = require('json2csv');

// const upload = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("Please upload a CSV file!");
//     }

//     const productsMap = new Map(); // Use a map to store products by SKU for easy lookup

//     const filePath = req.file.path;

//     createReadStream(filePath)
//       .pipe(parse({ headers: true }))
//       .on("error", (error) => {
//         console.error("Error reading CSV:", error);
//         res.status(500).json({ error: "Error reading CSV file" });
//       })
//       .on("data", async (row) => {
//         try {
//           // Generate SKU if not provided
//           if (!row.ProductSKU) {
//             row.ProductSKU = `${row.company
//               .substring(0, 3)
//               .toUpperCase()}-${Date.now().toString().slice(-5)}`;
//           }

//           // Check if product already exists
//           let product = productsMap.get(row.ProductSKU);
//           if (!product) {
//             // Prepare product data
//             const productData = {
//               productname: row.productname,
//               description: row.description,
//               SKU: row.ProductSKU,
//               price: row.price,
//               stock: row.stock,
//               category: row.category,
//               brand: row.brand,
//               company: row.company,
//             };

//             // Create product
//             product = await Product.create(productData);
//             productsMap.set(row.ProductSKU, product);
//           }

//           // Prepare variant data
//           const variantName = row.variantName || '';
//           const value = row.value || '';
//           const size = row.variantSize || '';
//           const variantPrice = parseFloat(row.variantprice) || 0;  // Convert to number

//           const variantData = {
//             name: variantName,
//             value: value,
//             size: size,
//             SKU: row.VariantSKU || `${variantName.substring(0, 3).toUpperCase()}-${value.substring(0, 3).toUpperCase()}-${size.substring(0, 3).toUpperCase()}`, // Generate variant SKU if not provided
//             price: variantPrice,
//             stock: row.variantstock,
//             barcode: `${variantName.substring(0, 3).toUpperCase()}-${value.substring(0, 3).toUpperCase()}-${size.substring(0, 3).toUpperCase()}${variantPrice.toFixed(2).replace(".", "")}`,
//             productId: product.productId, // Set productId to the id of the newly created product

//           };
//           // Create variant
//           await Variant.create(variantData);
//         } catch (error) {
//           console.error("Error processing row:", error);
//         }
//       })
//       .on("end", () => {
//         res
//           .status(200)
//           .send({ message: "Products and variants uploaded successfully" });
//       });
//   } catch (error) {
//     console.error("Error uploading products and variants:", error);
//     res.status(500).json({ error: "Error uploading products and variants" });
//   }
// };
const upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Please upload a CSV file!");
    }

    const filePath = req.file.path;
    const results = [];

    createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on("error", (error) => {
        console.error("Error reading CSV:", error);
        res.status(500).json({ error: "Error reading CSV file" });
      })
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        try {
          const productMap = new Map();

          for (const row of results) {
            // Generate SKU if not provided for the product
            let productSKU = row.ProductSKU;
            if (!productSKU) {
              productSKU = `${row.company.substring(0, 3)}`;
            }

            // Find or create the product with the given SKU
            if (!productMap.has(productSKU)) {
              const [product, created] = await Product.findOrCreate({
                where: { SKU: productSKU },
                defaults: {
                  productname: row.productname,
                  description: row.description,
                  SKU: productSKU,
                  price: row.price,
                  stock: row.stock,
                  category: row.category,
                  brand: row.brand,
                  company: row.company,
                }
              });
              productMap.set(productSKU, product);
            }

            const product = productMap.get(productSKU);

            // Prepare variant data
            const variantSKU = row.VariantSKU || `${row.variantName.substring(0, 3).toUpperCase()}-${row.value.substring(0, 3).toUpperCase()}-${row.variantSize.substring(0, 3).toUpperCase()}`;
            const variantData = {
              name: row.variantName || '',
              value: row.value || '',
              size: row.variantSize || '',
              SKU: variantSKU,
              price: parseFloat(row.variantprice) || 0,
              stock: row.variantstock,
              barcode: `${row.variantName.substring(0, 3).toUpperCase()}-${row.value.substring(0, 3).toUpperCase()}-${row.variantSize.substring(0, 3).toUpperCase()}${parseFloat(row.variantprice).toFixed(2).replace(".", "")}`,
              productId: product.productId,
            };

            // Create variant
            await Variant.create(variantData);
          }

          res.status(200).send({ message: "Products and variants uploaded successfully" });
        } catch (error) {
          console.error("Error processing rows:", error);
          res.status(500).json({ error: "Error processing rows" });
        }
      });
  } catch (error) {
    console.error("Error uploading products and variants:", error);
    res.status(500).json({ error: "Error uploading products and variants" });
  }
};



// const download = async (_req, res) => {
//   try {
//     const products = await Product.findAll({
//       include: [{
//         model: Variant,
//         as: 'variants' // Assuming the association is named 'variants'
//       }]
//     });

//     let productData = [];

//     products.forEach((product) => {
//       const {
//         productId,
//         productname,
//         description,
//         SKU,
//         price,
//         stock,
//         category,
//         brand,
//         company,
//         createdAt,
//         updatedAt,
//         variants // Include variants data
//       } = product;

//       variants.forEach((variant) => {
//         const {
//           name,
//           value,
//           size,
//           SKU: VariantSKU,
//           price: variantprice,
//           stock: variantstock,
//           barcode: variantbarcode
//         } = variant;

//         productData.push({
//           productId,
//           productname,
//           description,
//           SKU,
//           price,
//           stock,
//           category,
//           brand,
//           company,
//           createdAt,
//           updatedAt,
//           variantName: name,
//           value,
//           size,
//           VariantSKU,
//           variantprice,
//           variantstock,
//           variantbarcode
//         });
//       });
//     });

//     const csvFields = [
//       "productId",
//       "productname",
//       "description",
//       "SKU",
//       "price",
//       "stock",
//       "category",
//       "brand",
//       "company",
//       "createdAt",
//       "updatedAt",
//       "variantName",
//       "value",
//       "size",
//       "VariantSKU",
//       "variantprice",
//       "variantstock",
//       "variantbarcode"
//     ];

//     const parser = new Parser({ fields: csvFields });
//     const csvData = parser.parse(productData);

//     res.setHeader('Content-Type', 'text/csv');
//     res.setHeader('Content-Disposition', 'attachment; filename=products.csv');
//     res.status(200).end(csvData);

//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       message: 'Failed to download the CSV file.',
//       error: error.message
//     });
//   }
// };



const download = async (req, res) => {
  try {
    const products = await Product.findAll();
    const productData = products.map(
      ({
        productId,
        productname,
        description,
        SKU,
        price,
        stock,
        category,
        brand,
        company,
        createdAt,
        updatedAt,
      }) => ({
        productId,
        productname,
        description,
        SKU,
        price,
        stock,
        category,
        brand,
        company,
        createdAt,
        updatedAt,
      })
    );

    const csvFields = [
      'productId',
      'productname',
      'description',
      'SKU',
      'price',
      'stock',
      'category',
      'brand',
      'company',
      'createdAt',
      'updatedAt',
    ];
    
    const json2csvParser = new Parser({ fields: csvFields });
    const csvData = json2csvParser.parse(productData);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=products.csv'
    );
    res.status(200).end(csvData);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Failed to download the CSV file.',
      error: error.message,
    });
  }
};
module.exports = { upload, download };
// const { createReadStream } = require("fs");
// const { parse } = require("fast-csv");
// const path = require("path");
// const Product = require("../models/Product.js");
// const json2csv = require("json-2-csv");
// const Variant = require("../models/Variant.js");

// const upload = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("Please upload a CSV file!");
//     }

//     const productsMap = new Map(); // Use a map to store products by SKU for easy lookup
//     const variants = []; // Collect all variants to bulk insert later

//     const filePath = req.file.path;

//     createReadStream(filePath)
//       .pipe(parse({ headers: true }))
//       .on("error", (error) => {
//         console.error("Error reading CSV:", error);
//         res.status(500).json({ error: "Error reading CSV file" });
//       })
//       .on("data", async (row) => {
//         try {
//           // Generate SKU if not provided
//           if (!row.ProductSKU) {
//             row.ProductSKU = `${row.company
//               .substring(0, 3)
//               .toUpperCase()}-${Date.now().toString().slice(-5)}`;
//           }

//           // Check if product already exists
//           let product = productsMap.get(row.ProductSKU);
//           if (!product) {
//             // Prepare product data
//             const productData = {
//               productname: row.productname,
//               description: row.description,
//               SKU: row.ProductSKU,
//               price: row.price,
//               stock: row.stock,
//               category: row.category,
//               brand: row.brand,
//               company: row.company,
//             };

//             // Create product
//             product = await Product.create(productData);
//             productsMap.set(row.ProductSKU, product);
//           }

//           // Prepare variant data
//           const variantName = row.variantName || '';
//           const value = row.value || '';
//           const size = row.variantSize || '';
//           const variantPrice = parseFloat(row.variantprice) || 0;  // Convert to number

//           const variantData = {
//             name: variantName,
//             value: value,
//             size: size,
//             SKU: row.VariantSKU || `${variantName.substring(0, 3).toUpperCase()}-${value.substring(0, 3).toUpperCase()}-${size.substring(0, 3).toUpperCase()}`, // Generate variant SKU if not provided
//             price: variantPrice,
//             stock: row.variantstock,
//             barcode: row.variantbarcode || `${variantName.substring(0, 3).toUpperCase()}-${value.substring(0, 3).toUpperCase()}-${size.substring(0, 3).toUpperCase()}-${variantPrice.toFixed(2).replace(".", "")}`,
//             productId: product.id, // Set productId to the id of the newly created product
//           };

//           // Add variant to list
//           variants.push(variantData);
//         } catch (error) {
//           console.error("Error processing row:", error);
//         }
//       })
//       .on("end", async () => {
//         try {
//           // Bulk insert all variants
//           await Variant.bulkCreate(variants);
//           res.status(200).send({ message: "Products and variants uploaded successfully" });
//         } catch (error) {
//           console.error('Error saving variants:', error);
//           res.status(500).json({ error: 'Error saving variants to the database' });
//         }
//       });
//   } catch (error) {
//     console.error("Error uploading products and variants:", error);
//     res.status(500).json({ error: "Error uploading products and variants" });
//   }
// };

// const download = async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     const productData = products.map(
//       ({
//         productId,
//         productname,
//         description,
//         SKU,
//         price,
//         stock,
//         category,
//         brand,
//         company,
//         createdAt,
//         updatedAt,
//       }) => ({
//         productId,
//         productname,
//         description,
//         SKU,
//         price,
//         stock,
//         category,
//         brand,
//         company,
//         createdAt,
//         updatedAt,
//       })
//     );

//     const csvFields = [
//       "productId",
//       "productname",
//       "description",
//       "SKU",
//       "price",
//       "stock",
//       "category",
//       "brand",
//       "company",
//       "createdAt",
//       "updatedAt",
//     ];
//     const options = { keys: csvFields };

//     json2csv
//       .json2csvAsync(productData, options)
//       .then((csvData) => {
//         res.setHeader("Content-Type", "text/csv");
//         res.setHeader(
//           "Content-Disposition",
//           "attachment; filename=products.csv"
//         );
//         res.status(200).end(csvData);
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send({
//           message: "Failed to download the CSV file.",
//           error: error.message,
//         });
//       });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       message: "Failed to download the CSV file.",
//       error: error.message,
//     });
//   }
// };

// module.exports = { upload, download };
