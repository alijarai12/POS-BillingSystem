import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Textarea } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const EditProducts = ({ productId, initialSKU }) => {
  const [formData, setFormData] = useState({
    productname: "",
    description: "",
    SKU: initialSKU || "",  // Use initialSKU if provided
    price: "",
    stock: 0,
    category: "",
    brand: "",
    company: "",
    productId: productId || "",
  });

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Import useNavigate and create a navigate function

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        const product = response.data;
        setFormData({
          productname: product.productname || "",
          description: product.description || "",
          SKU: product.SKU || initialSKU || "",  // Ensure SKU is set correctly
          price: product.price || "",
          stock: product.stock || 0,
          category: product.category || "",
          brand: product.brand || "",
          company: product.company || "",
          productId: productId,
        });
      } catch (error) {
        console.error(
          "There was an error fetching the product details!",
          error
        );
        setError("Failed to fetch product details");
      }
    };

    if (isEditOpen) {
      fetchProductDetails();
    }
  }, [isEditOpen, productId, initialSKU]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      const newSKU = `${value.substring(0, 3).toUpperCase()}-${Date.now()
        .toString()
        .slice(-5)}`;
      setFormData({ ...formData, [name]: value, SKU: newSKU });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        formData
      );
      console.log("Product updated:", response.data);
      setSuccess(true);
      toast.success("Product updated successfully!", { transition: Slide });
      onEditClose();
      setFormData({
        productname: "",
        description: "",
        SKU: "",
        price: "",
        stock: 0,
        category: "",
        brand: "",
        company: "",
        productId: productId || "",
      });
    } catch (error) {
      setError("Failed to update product");
      toast.error("Failed to update product!", { transition: Slide });
      console.error("There was an error updating the product!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      console.log("Product deleted");
      setSuccess(true);
      toast.success("Product deleted successfully!", { transition: Slide });
      onDeleteClose();
      navigate("/products");
    } catch (error) {
      setError("Failed to delete product");
      toast.error("Failed to delete product!", { transition: Slide });
      console.error("There was an error deleting the product!", error);
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { id: "productname", label: "Product Name", type: "text", required: true },
    { id: "description", label: "Description", type: "textarea" },
    { id: "SKU", label: "SKU", type: "text", readOnly: true },  // Make SKU read-only
    {
      id: "price",
      label: "Price",
      type: "number",
      required: true,
      min: "0",
      step: "0.01",
    },
    { id: "stock", label: "Stock", type: "number", required: true, min: "0" },
    { id: "category", label: "Category", type: "text", required: true },
    { id: "brand", label: "Brand", type: "text" },
    { id: "company", label: "Company", type: "text", required: true },
  ];

  return (
    <>
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
                  Product updated successfully!
                </div>
              )}
              {formFields.map(({ id, label, type, required, min, step, readOnly }) => (
                <div className="mb-4" key={id}>
                  <label
                    htmlFor={id}
                    className="block text-gray-700 font-bold mb-2"
                  >
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <Textarea
                      id={id}
                      name={id}
                      label={label}
                      value={formData[id]}
                      onChange={handleChange}
                      required={required}
                    />
                  ) : (
                    <Input
                      type={type}
                      id={id}
                      name={id}
                      label={label}
                      value={formData[id]}
                      onChange={handleChange}
                      required={required}
                      min={min}
                      step={step}
                      readOnly={readOnly}  // Set readOnly attribute
                    />
                  )}
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
      <ToastContainer />
    </>
  );
};

export default EditProducts;
