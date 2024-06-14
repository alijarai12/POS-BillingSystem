import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Input } from "@nextui-org/react";
import Select from "react-select";

const CreateDiscountVariant = () => {
  const [discountData, setDiscountData] = useState({
    name: "",
    type: "percentage",
    value: "",
    startDate: "",
    endDate: "",
    variantId: "",
  });
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    // Fetch variants from the backend
    axios
      .get("http://localhost:5000/api/variants")
      .then((response) => {
        const variantOptions = response.data.map((variant) => ({
          value: variant.variantId,
          label: variant.name,
        }));
        setVariants(variantOptions);
      })
      .catch((error) => {
        console.error("Error fetching variants:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscountData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVariantChange = (selectedOption) => {
    setDiscountData((prevState) => ({
      ...prevState,
      variantId: selectedOption.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/discounts", discountData)
      .then((response) => {
        console.log("Discount created:", response.data);
        // Reset form data or handle success as needed
        setDiscountData({
          name: "",
          type: "percentage",
          value: "",
          startDate: "",
          endDate: "",
          variantId: "",
        });
      })
      .catch((error) => {
        console.error("Error creating discount:", error);
        // Handle error
      });
  };

  return (
    <div className="h-screen overflow-y-auto">
      <Card className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Discount for Variant
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={discountData.name}
              onChange={handleChange}
              placeholder="Enter discount name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-semibold mb-1">
              Discount Type
            </label>
            <select
              id="type"
              name="type"
              value={discountData.type}
              onChange={handleChange}
              className="select-field"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="value" className="block text-sm font-semibold mb-1">
              Discount Value
            </label>
            <Input
              type="number"
              id="value"
              name="value"
              value={discountData.value}
              onChange={handleChange}
              placeholder="Enter discount value"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-semibold mb-1"
            >
              Start Date
            </label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={discountData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-semibold mb-1"
            >
              End Date
            </label>
            <Input
              type="date"
              id="endDate"
              name="endDate"
              value={discountData.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="variantId"
              className="block text-sm font-semibold mb-1"
            >
              Variant
            </label>
            <Select
              id="variantId"
              name="variantId"
              value={variants.find(
                (option) => option.value === discountData.variantId
              )}
              onChange={handleVariantChange}
              options={variants}
              placeholder="Select Variant"
              className="select-field"
              styles={{
                menu: (provided) => ({
                  ...provided,
                  maxHeight: "200px",
                  overflowY: "auto",
                }),
              }}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" auto>
              Create Discount
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateDiscountVariant;
