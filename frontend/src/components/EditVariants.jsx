import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import { RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";
import { Slide, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditVariants = ({ variantId, productId, generateBarcodeValue }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    value: "",
    SKU: "", // Set SKU to initial value if provided
    price: 0,
    stock: 0,
    image: "",
    weight: 0,
    length: 0,
    size: "",
    width: 0,
    height: 0,
    attributes: [],
    productId: productId || "",
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!variantId) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/variants/${variantId}`
        );
        const variant = response.data;

        setFormData({
          name: variant.name || "",
          value: variant.value || "",
          SKU: variant.SKU || "",
          price: variant.price || 0,
          stock: variant.stock || 0,
          image: variant.image || "",
          weight: variant.weight || 0,
          length: variant.length || 0,
          size: variant.size || "",
          width: variant.width || 0,
          height: variant.height || 0,
          attributes: variant.attributes || [],
          productId: productId || "",
        });
      } catch (error) {
        setError("Failed to fetch product details");
        console.error(
          "There was an error fetching the product details!",
          error
        );
        setLoading(false);
      }
    };

    if (isEditOpen && productId && variantId) {
      fetchProductDetails();
      console.log(variantId, productId);
    }
  }, [isEditOpen, productId, variantId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const inputFields = [
    { label: "Variant Name", name: "name", type: "text", required: true },
    { label: "Variant Value", name: "value", type: "text", required: true },
    { label: "SKU", name: "SKU", type: "text", readOnly: true },
    { label: "Price", name: "price", type: "number", required: true },
    { label: "Stock", name: "stock", type: "number", required: true },
    { label: "Image URL", name: "image", type: "text" },
    { label: "Weight", name: "weight", type: "number" },
    { label: "Size", name: "size", type: "text" },
    { label: "Length", name: "length", type: "number" },
    { label: "Width", name: "width", type: "number" },
    { label: "Height", name: "height", type: "number" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Generate barcode based on SKU and price
      const barcode = generateBarcodeValue(formData);

      // Add barcode to form data
      const formDataWithBarcode = {
        ...formData,
        barcode: barcode,
      };

      const response = await axios.put(
        `http://localhost:5000/api/variants/${variantId}`,
        formDataWithBarcode
      );
      console.log("Variant added:", response.data);
      setSuccess(true);
      toast.success("Variant Updated Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setFormData({
        name: "",
        value: "",
        SKU: "", // Reset SKU to empty after submission
        price: 0,
        stock: 0,
        image: "",
        weight: 0,
        size: "",
        length: 0,
        width: 0,
        height: 0,
        attributes: [],
        productId: productId || "",
      });

      // Close the modal after successful submission
      onEditClose();
    } catch (error) {
      setError("Failed to update variant");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Automatically generate SKU based on name, value, and size when any of these fields change
    if (name === "name" || name === "value" || name === "size") {
      generateSKU(value);
    }
  };
  const generateSKU = (size) => {
    const { name, value } = formData;
    const nameSubstring = name.substring(0, 3).toUpperCase();
    const valueSubstring = value.substring(0, 3).toUpperCase();
    const sizeSubstring = size.substring(0, 5).toUpperCase(); // Assuming size is a string

    const generatedSKU = `${nameSubstring}-${valueSubstring}-${sizeSubstring}`;
    setFormData((prevData) => ({
      ...prevData,
      SKU: generatedSKU,
    }));
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:5000/api/variants/${variantId}`);
      console.log("Variant deleted");
      setSuccess(true);
      toast.success("Variant deleted successfully!", { transition: Slide });

      onDeleteClose();
    } catch (error) {
      setError("Failed to delete product");
      toast.error("Failed to delete product!", { transition: Slide });
      onDeleteClose();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button
        onClick={onEditOpen}
        color="secondary"
        variant="bordered"
        startContent={<RiEdit2Fill />}
        className="mr-2 hover:bg-purple-700 hover:text-white transition-colors duration-300 ease-in-out"
      >
        Edit
      </Button>
      <Button
        onClick={onDeleteOpen}
        color="danger"
        variant="bordered"
        startContent={<RiDeleteBin6Fill />}
        className="mr-2 hover:bg-red-700 hover:text-white transition-colors duration-300 ease-in-out"
      >
        Delete
      </Button>

      <Modal
        isOpen={isEditOpen}
        onClose={onEditClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        scrollBehavior="outside"
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Update Your Information</ModalHeader>
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
                    readOnly={field.readOnly} // Set readOnly for SKU and Barcode fields
                  />
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onEditClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="light"
                color="primary"
                disabled={loading}
                loading={loading}
              >
                {loading ? "Submitting..." : "Update"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        isDismissable={true}
        isKeyboardDismissDisabled={false}
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>Are you sure you want to delete this product?</ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onDeleteClose}>
              Cancel
            </Button>
            <Button
              variant="light"
              color="primary"
              onPress={handleDelete}
              disabled={loading}
              loading={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditVariants;
