import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Textarea } from "@nextui-org/react";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { FaImage } from "react-icons/fa6";
import { productfields } from "./inputfields";

const EditProducts = ({ productId, initialSKU }) => {
  const [formData, setFormData] = useState({
    productname: "",
    description: "",
    SKU: initialSKU || "", // Use initialSKU if provided
    price: "",
    stock: 0,
    category: "",
    brand: "",
    company: "",
    productId: productId || "",
  });
  const [imageFile, setImageFile] = useState(null); // State for image file

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
          SKU: product.SKU || initialSKU || "", // Ensure SKU is set correctly
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
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected image file
    console.log(e.target.files[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataWithImage = new FormData(); // Create a FormData object
      formDataWithImage.append("image", imageFile); // Append the image file
      // Append other form data fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataWithImage.append(key, value);
      });

      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );
      console.log("Product updated:", response.data);
      setSuccess(true);
      toast.success("Product updated Successfully!", {
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
      toast.success("Product deleted successfully!", {
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
      onDeleteClose();
    } catch (error) {
      setError("Failed to delete product");
      toast.error("Failed to delete product!", { transition: Slide });
      console.error("There was an error deleting the product!", error);
    } finally {
      setLoading(false);
    }
  };

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
        scrollBehavior="outside"
        size="3xl"
        placement="center"
        classNames={{
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#e3e3f6] dark:bg-[#19172c] text-[#a8b0d3]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="text-violet-800">
              Update Your Information
            </ModalHeader>
            <ModalBody>
              {error && <div className="mb-4 text-red-500">{error}</div>}
              {success && (
                <div className="mb-4 text-green-500">
                  Product updated successfully!
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 mb-2">
                  Image
                </label>
                <div className="p-2 rounded-lg w-[300px] h-[150px] flex flex-col items-center justify-center bg-gray-300 cursor-pointer hover:bg-blue-200 active:bg-blue-200 relative">
                  <input
                    onChange={handleImageChange}
                    name="image"
                    type="file"
                    accept="image/*"
                    labelPlacement="outside"
                    className="opacity-0 cursor-pointer absolute"
                  />
                  <FaImage className="text-purple-400 h-16 w-16" />
                  <p className="text-sm">
                    {imageFile
                      ? imageFile.name
                      : "Drag file here or click to upload"}
                  </p>
                </div>
              </div>
              {productfields.map(
                ({ id, label, type, required, min, step, readOnly }) => (
                  <div className="mb-2" key={id}>
                    {type === "textarea" ? (
                      <Textarea
                        id={id}
                        name={id}
                        label={label}
                        value={formData[id]}
                        labelPlacement="outside"
                        placeholder={id}
                        onChange={handleChange}
                        required={required}
                      />
                    ) : (
                      <Input
                        type={type}
                        labelPlacement="outside"
                        id={id}
                        name={id}
                        placeholder={id}
                        label={label}
                        value={formData[id]}
                        onChange={handleChange}
                        required={required}
                        min={min}
                        step={step}
                        readOnly={readOnly} // Set readOnly attribute
                      />
                    )}
                  </div>
                )
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                disabled={loading}
                loading={loading}
                className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
              >
                {loading ? "Submitting..." : "Update"}
              </Button>
              <Button color="foreground" variant="light" onPress={onEditClose}>
                Close
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
