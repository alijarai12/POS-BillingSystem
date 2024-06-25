const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./Product"); // Import the Product model

const Variant = sequelize.define(
  "Variant",
  {
    variantId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true, // Ensure size is required
      trim: true,
    },
    SKU: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      trim: true,
    },
    purchaseprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
      discountedPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    threshold: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    barcode: {
      type: DataTypes.STRING,
      allowNull: true, // Make barcode optional
      unique: false,
      trim: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Make image optional
      trim: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true, // Make weight optional
      validate: {
        min: 0,
      },
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: true, // Make length optional
      validate: {
        min: 0,
      },
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: true, // Make width optional
      validate: {
        min: 0,
      },
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true, // Make height optional
      validate: {
        min: 0,
      },
    },
    attributes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true, // Make attributes optional
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Product", // name of the related table
        key: "productId",
      },
    },
  },
  {
    hooks: {
      beforeSave: async (variant) => {
        try {
          if (!variant.SKU) {
            const nameSubstring = variant.name.substring(0, 3).toUpperCase();
            const valueSubstring = variant.value.substring(0, 3).toUpperCase();
            const sizeSubstring = variant.size.substring(0, 2).toUpperCase(); // Assuming size is a string
            const priceString = variant.price.toFixed(2).replace(".", "");

            variant.SKU = `${nameSubstring}-${valueSubstring}-${sizeSubstring}-${priceString}`;
          }

          if (!variant.barcode) {
            // Generate barcode based on name, size, and price
            const baseBarcode = `${variant.name
              .substring(0, 3)
              .toUpperCase()}-${variant.size
              .substring(0, 2)
              .toUpperCase()}-${variant.price.toFixed(2).replace(".", "")}`;
            let barcode = baseBarcode;

            // Check if the generated barcode already exists, if so, append a number to make it unique
            let count = 1;
            while (await Variant.findOne({ where: { barcode } })) {
              barcode = `${baseBarcode}-${count}`;
              count++;
            }

            variant.barcode = barcode;
          }
        } catch (error) {
          console.error("Error generating SKU or barcode for variant:", error);
        }
      },
    },
  }
);

module.exports = Variant;

// {
//   hooks: {
//     beforeSave: async (variant) => {
//       try {
//         const product = await Product.findByPk(variant.productId);
//         if (product) {
//           // Generate SKU: Brand-ProductType-VariantName-Color-Size
//           variant.SKU = `${product.brand}-${variant.name}-${variant.value}-${variant.size}`;
//         }
//       } catch (error) {
//         console.error("Error generating SKU for variant:", error);
//       }
//     },
//   },
//   toJSON: {
//     transform: (doc, ret) => {
//       delete ret.product; // Remove the `product` key from the response
//       return ret;
//     },
//   },
// }
// {
//   hooks: {
//     beforeCreate: (variant) => {
//       if (!variant.SKU) {
//         const nameSubstring = variant.name.substring(0, 3).toUpperCase();
//         const valueSubstring = variant.value.substring(0, 3).toUpperCase();
//         const sizeSubstring = variant.size.substring(0, 2).toUpperCase(); // Assuming size is a string

//         variant.SKU = `${nameSubstring}-${valueSubstring}-${sizeSubstring}-${variant.price.toFixed(2).replace('.', '')}`;
//         // You can add any additional logic here to format the SKU as desired
//       }
//     },
//   },
// },
// {
//   hooks: {
//     beforeCreate: async (variant) => {
//       try {
//         if (!variant.barcode) {
//           const baseBarcode = `${variant.name.substring(0, 3).toUpperCase()}-${variant.size.substring(0, 2).toUpperCase()}`;
//           let barcode = baseBarcode;

//           // Check if the generated barcode already exists, if so, append a number to make it unique
//           let count = 1;
//           while (await Variant.findOne({ where: { barcode } })) {
//             barcode = `${baseBarcode}-${count}`;
//             count++;
//           }

//           variant.barcode = barcode;
//         }
//       } catch (error) {
//         console.error("Error generating barcode for variant:", error);
//       }
//     },
//   },
// }
// {
//   hooks: {
//     beforeCreate: async (variant) => {
//       try {
//         if (!variant.SKU) {
//           const nameSubstring = variant.name.substring(0, 3).toUpperCase();
//           const valueSubstring = variant.value.substring(0, 3).toUpperCase();
//           const sizeSubstring = variant.size.substring(0, 2).toUpperCase(); // Assuming size is a string

//           variant.SKU = `${nameSubstring}-${valueSubstring}-${sizeSubstring}-${variant.price.toFixed(2).replace('.', '')}`;
//           // You can add any additional logic here to format the SKU as desired
//         }

//         if (!variant.barcode) {
//           const baseBarcode = `${variant.name.substring(0, 3).toUpperCase()}-${variant.size.substring(0, 2).toUpperCase()}`;
//           let barcode = baseBarcode;

//           // Check if the generated barcode already exists, if so, append a number to make it unique
//           let count = 1;
//           while (await Variant.findOne({ where: { barcode } })) {
//             barcode = `${baseBarcode}-${count}`;
//             count++;
//           }

//           variant.barcode = barcode;
//         }
//       } catch (error) {
//         console.error("Error generating SKU or barcode for variant:", error);
//       }
//     },
//   },
// }
