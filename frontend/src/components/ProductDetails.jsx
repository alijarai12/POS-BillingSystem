import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "@nextui-org/react";
import { FaShoppingCart } from "react-icons/fa";
import VariantForm from "./VariantForm";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

const ProductDetails = () => {
  const params = useParams();
  const pid = params.productId;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

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

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-row gap-5">
        <div className="w-[50%]">
          <img
            src="https://image-us.samsung.com/SamsungUS/configurator/060321/Configurator-01-Family-Shot-720x720_CNET.jpg"
            alt="samsung phone"
            className="object-contain	"
          />
        </div>
        <div className="relative">
          {product && (
            <>
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>{" "}
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
                  className="mr-2"
                >
                  Back to Product
                </Button>
              </Link>
              <VariantForm productId={pid} initialSKU={product.SKU} />
            </>
          )}
          <div className="">
            <Button
              color="secondary"
              variant="bordered"
              startContent={<RiEdit2Fill />}
              className="mr-2 hover:bg-purple-700 hover:text-white transition-colors duration-300 ease-in-out"
            >
              Edit
            </Button>
            <Button
              color="danger"
              variant="bordered"
              startContent={<MdDelete />}
              className=" hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        {product.variants && (
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center">Variants:</h2>
            <div className="grid grid-cols-3 gap-4">
              {product.variants.map((variant) => (
                <Card
                  key={variant.variantId}
                  className="col-span-1 p-4 border rounded transition-transform transform hover:scale-105 hover:shadow-lg ease-in-out duration-300"
                >
                  <ul>
                    <li className="p-4">
                      <p>Name: {variant.name}</p>
                      <p>Value: {variant.value}</p>
                      <p>SKU: {variant.SKU}</p>
                      <p>Price: ${variant.price}</p>
                      <p>Stock: {variant.stock}</p>
                      <div className="flex justify-between mt-4">
                        <Button
                          color="secondary"
                          variant="bordered"
                          startContent={<RiEdit2Fill />}
                          className=" hover:bg-purple-700 hover:text-white transition-colors duration-300 ease-in-out"
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          variant="bordered"
                          startContent={<MdDelete />}
                          className=" hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out"
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  </ul>
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
