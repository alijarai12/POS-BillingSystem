import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Input, Button, Card, CardHeader, CardBody } from "@nextui-org/react";

const CreateDiscount = () => {
  const [discountData, setDiscountData] = useState({
    name: "",
    type: "percentage",
    value: "",
    startDate: "",
    endDate: "",
    selectedOptions: [],
    tenant_id: null,
  });
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        const userResponse = await axios.get(
          "http://localhost:5000/auth/tenant",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const tenantId = userResponse.data.tenant_id;

        setDiscountData((prevState) => ({
          ...prevState,
          tenant_id: tenantId,
        }));

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
  }, []);

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
    setIsLoading(true);

    try {
      const requestData = {
        name: discountData.name,
        type: discountData.type,
        value: parseFloat(discountData.value),
        startDate: discountData.startDate,
        endDate: discountData.endDate,
        productIds: discountData.selectedOptions
          .filter((option) => option.isProduct)
          .map((option) => option.data.productId),
        variantIds: discountData.selectedOptions
          .filter((option) => !option.isProduct)
          .map((option) => option.data.variantId),
        tenant_id: discountData.tenant_id,
      };

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/discounts",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Discount created successfully:", response.data);

      setDiscountData((prevState) => ({
        name: "",
        type: "percentage",
        value: "",
        startDate: "",
        endDate: "",
        selectedOptions: [],
        tenant_id: prevState.tenant_id,
      }));
    } catch (error) {
      console.error("Error creating discount:", error);

      if (error.response) {
        setError(
          `Failed to create discount: ${JSON.stringify(error.response.data)}`
        );
      } else {
        setError(`Failed to create discount: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const { name, value, startDate, endDate, selectedOptions } = discountData;
    return name && value && startDate && endDate && selectedOptions.length > 0;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-8">
        <CardHeader>
          <h2 className="text-center mb-6">Create Discount</h2>
        </CardHeader>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={discountData.type}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div className="mb-4">
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
            </div>
            <div className="mb-4">
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
            </div>
            <div className="mb-4">
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
            </div>
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
            <Button
              type="submit"
              className="w-full"
              auto
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? "Creating..." : "Create Discount"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateDiscount;
