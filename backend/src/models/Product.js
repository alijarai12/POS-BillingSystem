// const { DataTypes } = require('sequelize');
// const centralSequelize = require('../config/db');
// const Variant = require('./Variant'); // Import the Variant model

// const Product = centralSequelize.define(
//   'Product',
//   {
//     productId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       trim: true,
//     },
//     description: {
//       type: DataTypes.STRING,
//       trim: true,
//     },
//     SKU: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//       trim: true,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//       validate: {
//         min: 0,
//       },
//     },
//     stock: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         min: 0,
//       },
//     },
//     category: { type: DataTypes.STRING, allowNull: false },
//     brand: { type: DataTypes.STRING, allowNull: true },
//     company: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     hooks: {
//       beforeCreate: (product) => {
//         if (!product.SKU) {
//           product.SKU = `${product.company
//             .substring(0, 3)
//             .toUpperCase()}-${Date.now().toString().slice(-5)}`;
//         }
//       },
//     },
//      centralSequelize, // Pass the initialized sequelize object
//     modelName: 'Product', // Set the model name explicitly
//   }
// );

// // Define the association with Variant
// Product.hasMany(Variant, { foreignKey: 'productId', as: 'variants' });
// Variant.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// module.exports = Product;

const { DataTypes } = require('sequelize');
const centralSequelize = require('../config/db');
const Variant = require('./Variant'); // Import the Variant model

const Product = centralSequelize.define(
  'Product',
  {
        productId: {
          type: DataTypes.STRING,
          autoIncrement: true,
          primaryKey: true,
        },
        productname: {
          type: DataTypes.STRING,
          allowNull: false,
          trim: true,
        },
        description: {
          type: DataTypes.STRING,
          trim: true,
        },
        SKU: {
          type: DataTypes.STRING,
          allowNull: true, // Allow null values for SKU
          unique: true, // Ensure SKU values are unique
          trim: true, // Trim whitespace from SKU values
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 0,
          },
        },
        category: { type: DataTypes.STRING, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: true },
        company: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        hooks: {
          beforeCreate: (product) => {
            if (!product.SKU) {
              product.SKU = `${product.company
                .substring(0, 3)
                .toUpperCase()}-${Date.now().toString().slice(-5)}`;
            }
          },
        },
         centralSequelize, // Pass the initialized sequelize object
        modelName: 'Product', // Set the model name explicitly
      }
);

// Define the association with Variant
Product.hasMany(Variant, { foreignKey: 'productId', as: 'variants' });

Variant.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = Product;
// const { DataTypes } = require('sequelize');
// const centralSequelize = require('../config/db');
// const Variant = require('./Variant'); // Import the Variant model

// const Product = centralSequelize.define(
//   'Product',
//   {
//     productId: {
//       type: DataTypes.STRING, // Update to string type for primary key
//       primaryKey: true,
//     },
//     productname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       trim: true,
//     },
//     description: {
//       type: DataTypes.STRING,
//       trim: true,
//     },
//     SKU: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//       trim: true,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//       validate: {
//         min: 0,
//       },
//     },
//     stock: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         min: 0,
//       },
//     },
//     category: { type: DataTypes.STRING, allowNull: false },
//     brand: { type: DataTypes.STRING, allowNull: true },
//     createdAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     hooks: {
//       beforeCreate: (product) => {
//         if (!product.SKU) {
//           const brandPrefix = product.brand ? `${product.brand.substring(0, 3).toUpperCase()}-` : '';
//           const productName = product.name.replace(/\s/g, '-'); // Replace spaces with dashes
//           const dateSuffix = Date.now().toString().slice(-5); // Use last 5 digits of current timestamp
//           product.SKU = `${brandPrefix}${productName}-${dateSuffix}`;
//         }
//       },
//     },
//     sequelize: centralSequelize, // Update to sequelize instead of centralSequelize
//     modelName: 'Product', // Set the model name explicitly
//   }
// );

// // Define the association with Variant
// Product.hasMany(Variant, { foreignKey: 'productId', as: 'variants' });
// Variant.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// module.exports = Product;
