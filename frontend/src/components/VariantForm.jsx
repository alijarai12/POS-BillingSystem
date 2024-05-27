import React, { useState } from "react";
import axios from "axios";
import { Input } from "@nextui-org/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

const VariantForm = ({ productId,initialSKU  }) => {
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    SKU: initialSKU || "", // Reset SKU to initial value if provided
    price: 0,
    stock: 0,
    barcode: "",
    image: "",
    weight: 0,
    length: 0,
    size: "",
    width: 0,
    height: 0,
    attributes: [],
    productId:productId || ""
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/products/${productId}/variants`,
        formData
      );
      console.log("Variant added:", response.data);
      setSuccess(true);
      setFormData({
        name: "",
        value: "",
        SKU: initialSKU || "", // Reset SKU to initial value if provided
        price: 0,
        stock: 0,
        barcode: "",
        image: "",
        weight: 0,
        size: "",
        length: 0,
        width: 0,
        height: 0,
        attributes: [],
        productId:productId || ""
      });
    } catch (error) {
      setError("Failed to add variant");
      console.error("There was an error adding the variant!", error);
    } finally {
      setLoading(false);
    }
    console.log(productId)
  };

  // Array of input field objects
  const inputFields = [
    { label: "Variant Name", name: "name", type: "text", required: true },
    { label: "Variant Value", name: "value", type: "text", required: true },
    { label: "SKU", name: "SKU", type: "text", required: true },
    { label: "Price", name: "price", type: "number", required: true },
    { label: "Stock", name: "stock", type: "number", required: true },
    { label: "Barcode", name: "barcode", type: "text" },
    { label: "Image URL", name: "image", type: "text" },
    { label: "Weight", name: "weight", type: "number" },
    { label: "Size", name: "size", type: "text" },
    { label: "Length", name: "length", type: "number" },
    { label: "Width", name: "width", type: "number" },
    { label: "Height", name: "height", type: "number" },
  ];

  return (
    <>
      <Button onClick={onOpen} variant="light" color="primary">
        Add Variants
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        scrollBehavior="outside"
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Add New Variant</ModalHeader>
            <ModalBody>
              {error && <div className="mb-4 text-red-500">{error}</div>}
              {success && (
                <div className="mb-4 text-green-500">
                  Variant added successfully!
                </div>
              )}
              {inputFields.map((field, index) => (
                <div key={index} className="mb-2 ">
                  <Input
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="light"
                color="primary"
                disabled={loading}
                loading={loading}
              >
                {loading ? "Submitting..." : "Add Variant"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VariantForm;