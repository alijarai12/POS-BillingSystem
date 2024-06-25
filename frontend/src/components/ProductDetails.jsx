import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Card, Divider } from "@nextui-org/react";
import { FaShoppingCart } from "react-icons/fa";
import VariantForm from "./VariantForm";
import EditProducts from "./EditProducts";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import { CiBarcode } from "react-icons/ci";

import EditVariants from "./EditVariants";

const ProductDetails = () => {
  const params = useParams();
  const pid = params.productId;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const barcodeRefs = useRef([]); // Ref for the barcode components

  useEffect(() => {
    fetchProductDetails();
  }, []);

  

  useEffect(() => {
    if (product && product.variants) {
      product.variants.forEach((variant) => {
        if (variant.stock <= variant.threshold) {
          alert(
            `Low Stock Alert: ${variant.name} (${variant.color}) is running low on stock!`
          );
        }
      });
    }
  }, [product]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${pid}`
      );
      setProduct(response.data);

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch product details");
      console.error("There was an error fetching the product details!", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const generateBarcodeValue = (variant) => {
    return `${variant.name}-${variant.price}`;
  };

  return (
    <div className="main-container p-4">
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-row gap-5 ">
        <div className="w-[50%]">
          <img
            src={
              product.image
                ? `http://localhost:5000/uploads/images/${product.image}`
                : "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="samsung phone"
            className="object-contain"
          />
        </div>
        <div className="relative">
          {product && (
            <>
              <h2 className="text-3xl font-bold mb-4 text-violet-800">{product.productname}</h2>
              <p className="text-gray-700 mb-2">
                Description: {product.description}
              </p>
              <p className="text-gray-700 mb-2">SKU: {product.SKU}</p>
              <p className="text-gray-700 mb-2">Price: ${product.price}</p>
              <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
              <p className="text-gray-700 mb-2">Category: {product.category}</p>
              <p className="text-gray-700 mb-2">Brand: {product.brand}</p>
              <p className="text-gray-700 mb-2">Company: {product.company}</p>
              <Link to="/products">
                <Button
                  color="warning"
                  size="sm"
                  endContent={<FaShoppingCart />}
                  className="mr-2 mb-2"
                >
                  Back to Product
                </Button>
              </Link>
              <VariantForm
                productId={pid}
                initialSKU={product.SKU}
                generateBarcodeValue={generateBarcodeValue}
              />
            </>
          )}
          <div>
            <EditProducts productId={pid} initialSKU={product.SKU} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        {product.variants && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center text-violet-800">Variants:</h2>
            <div className="grid grid-cols-3 gap-4">
              {product.variants.map((variant, index) => (
                <Card
                  key={variant.variantId}
                  className="col-span-1 p-4 border rounded transition-transform transform hover:scale-105 hover:shadow-lg ease-in-out duration-300 flex flex-col items-center"
                >
                  <div className="flex flex-row justify-between w-full mb-2">
                    <div>
                      <div className="flex gap-3">
                        {variant.image ? (
                          <img
                            src={`http://localhost:5000/uploads/images/${variant.image}`}
                            alt={variant.name}
                            className="h-[50px] object-contain rounded-lg"
                          />
                        ) : (
                          <div className="h-[50px] w-[50px] flex items-center justify-center bg-gray-200 rounded-lg">
                            <span>No Image</span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{variant.name}</p>
                          <p>{variant.price}</p>
                        </div>
                      </div>
                    </div>
                    <ReactToPrint
                      trigger={() => (
                        <Button size="sm" endContent={<CiBarcode />}>
                          Barcode
                        </Button>
                      )}
                      // content={() => barcodeRefs.current.map((ref) => ref)}
                      content={() => barcodeRefs.current[index]} // Passing the ref to the content prop
                    />
                  </div>
                  <Divider />
                  <div className="flex flex-col justify-start w-full">
                    <p>Color: {variant.value}</p>
                    <p>Size: {variant.size}</p>
                    <p>Stock: {variant.stock}</p>
                  </div>
                  <div className="flex flex-row justify-end w-full mt-4">
                    <EditVariants
                      variantId={variant.variantId}
                      productId={pid}
                      generateBarcodeValue={generateBarcodeValue}
                    />
                  </div>
                  <div className="">
                    <Barcode
                      value={generateBarcodeValue(variant)}
                      ref={(el) => (barcodeRefs.current[index] = el)} // Assigning ref to Barcode component
                      width={1}
                      height={40}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

// {/* {product.variants.map((variant, index) => (
//           <Card
//             key={variant.variantId}
//             className="col-span-1 p-4 border rounded transition-transform transform hover:scale-105 hover:shadow-lg ease-in-out duration-300"
//           >
//             <ul>
//               <li className="p-4">
//                 <p>Name: {variant.name}</p>
//                 <p>VariantID: {variant.variantId}</p>
//                 <p>Value: {variant.value}</p>
//                 <p>SKU: {variant.SKU}</p>
//                 <p>Price: ${variant.price}</p>
//                 <p>Stock: {variant.stock}</p>
//                 <p>Size: {variant.size}</p>
//                 <p>Barcode: {variant.barcode}</p>
//                 <div>
//                   {variant.image && (
//                     <img
//                       src={`http://localhost:5000/uploads/images/${variant.image}`}
//                       alt={variant.name}
//                       style={{ maxWidth: "100px", maxHeight: "100px" }}
//                     />
//                   )}
//                 </div>
//                 <Barcode
//                   value={generateBarcodeValue(variant)}
//                   ref={(el) => (barcodeRefs.current[index] = el)} // Assigning ref to Barcode component
//                   width={1}
//                   height={40}
//                 />

//                 <div className="flex justify-between mt-4">
//                   <ReactToPrint
//                     trigger={() => <Button>Print Barcode</Button>}
//                     content={() => barcodeRefs.current[index]} // Passing the ref to the content prop
//                   />

//                   <EditVariants
//                     variantId={variant.variantId}
//                     productId={pid}
//                     generateBarcodeValue={generateBarcodeValue}
//                   />
//                 </div>
//               </li>
//             </ul>
//           </Card>
//         ))} */}
