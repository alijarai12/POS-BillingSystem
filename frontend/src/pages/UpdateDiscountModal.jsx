import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Input, Button } from "@nextui-org/react";
import Select from "react-select";

const UpdateDiscountModal = ({ isOpen, handleClose, discountId }) => {
  const [discountData, setDiscountData] = useState({
    name: "",
    type: "percentage",
    value: "",
    startDate: "",
    endDate: "",
    selectedOptions: [],
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDiscountDetails = async () => {
      if (!discountId) return;

      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/discounts/${discountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { name, type, value, startDate, endDate, products, variants } =
          response.data;

        const selectedOptions = [
          ...products.map((product) => ({
            value: `product_${product.productId}`,
            label: product.productname,
            isProduct: true,
            data: product,
          })),
          ...variants.map((variant) => ({
            value: `variant_${variant.variantId}`,
            label: `${variant.productname} - ${variant.name}`,
            isProduct: false,
            data: variant,
          })),
        ];

        setDiscountData({
          name,
          type,
          value,
          startDate,
          endDate,
          selectedOptions,
        });
      } catch (error) {
        console.error("Error fetching discount details:", error);
        setError("Failed to fetch discount details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscountDetails();
  }, [discountId, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsResponse = await axios.get(
          "http://localhost:5000/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const productsData = productsResponse.data;

        const options = productsData.flatMap((product) => {
          const productOption = {
            value: `product_${product.productId}`,
            label: product.productname,
            isProduct: true,
            data: product,
          };

          const variantOptions = product.variants.map((variant) => ({
            value: `variant_${variant.variantId}`,
            label: `${product.productname} - ${variant.name}`,
            isProduct: false,
            data: variant,
          }));

          return [productOption, ...variantOptions];
        });

        setOptions(options);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch products and variants. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionsSelect = (selectedOptions) => {
    setDiscountData((prevState) => ({
      ...prevState,
      selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const requestData = {
        ...discountData,
        productIds: discountData.selectedOptions
          .filter((option) => option.isProduct)
          .map((option) => option.data.productId),
        variantIds: discountData.selectedOptions
          .filter((option) => !option.isProduct)
          .map((option) => option.data.variantId),
      };

      await axios.put(
        `http://localhost:5000/api/discounts/${discountId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Discount updated successfully!");
      handleClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating discount:", error);
      setError("Failed to update discount.");
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose} width="600px">
      <Modal.Header>
        <h2>Update Discountconst {discountId}</h2>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Input
            clearable
            underlined
            fullWidth
            label="Name"
            id="name"
            name="name"
            value={discountData.name}
            onChange={handleChange}
            required
          />
          <Input
            clearable
            underlined
            fullWidth
            label="Type"
            id="type"
            name="type"
            value={discountData.type}
            onChange={handleChange}
            required
          />
          <Input
            clearable
            underlined
            fullWidth
            label="Value"
            type="number"
            id="value"
            name="value"
            value={discountData.value}
            onChange={handleChange}
            required
          />
          <Input
            clearable
            underlined
            fullWidth
            label="Start Date"
            type="date"
            id="startDate"
            name="startDate"
            value={discountData.startDate}
            onChange={handleChange}
            required
          />
          <Input
            clearable
            underlined
            fullWidth
            label="End Date"
            type="date"
            id="endDate"
            name="endDate"
            value={discountData.endDate}
            onChange={handleChange}
            required
          />
          <div className="mb-4">
            <label
              htmlFor="options"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Products and Variants
            </label>
            <Select
              id="options"
              name="options"
              options={options}
              value={discountData.selectedOptions}
              onChange={handleOptionsSelect}
              isMulti
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit" variant="contained">
              Update
            </Button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateDiscountModal;
