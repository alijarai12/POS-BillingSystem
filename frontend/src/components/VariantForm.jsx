import React, { useState } from "react";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { FaImage } from "react-icons/fa6";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Bounce, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { variantfields } from "./inputfields";

const VariantForm = ({ productId, initialSKU, generateBarcodeValue }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    SKU: "",
    price: 0,
    stock: 0,
    threshold: 0,
    purchaseprice: 0,
    weight: 0,
    size: "",
    length: 0,
    width: 0,
    height: 0,
    attributes: [],
    productId: productId || "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
    const { name, color } = formData;
    const nameSubstring = name.substring(0, 3).toUpperCase();
    const colorSubstring = color.substring(0, 3).toUpperCase();
    const sizeSubstring = size.substring(0, 5).toUpperCase(); // Assuming size is a string
    const generatedSKU = `${nameSubstring}-${colorSubstring}-${sizeSubstring}`;
    setFormData((prevData) => ({
      ...prevData,
      SKU: generatedSKU,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if any required field is empty
    const requiredFields = [
      "name",
      "color",
      "SKU",
      "price",
      "stock",
      "threshold",
      "purchaseprice",
    ];
    const hasEmptyField = requiredFields.some((field) => !formData[field]);
    if (hasEmptyField) {
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields!", { transition: Slide });
      setLoading(false);
      return;
    }

    try {
      // Generate barcode based on SKU and price
      const barcode = generateBarcodeValue(formData);

      // Prepare FormData
      const data = new FormData();
      data.append("name", formData.name);
      data.append("color", formData.color);
      data.append("SKU", formData.SKU);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("barcode", barcode);
      data.append("threshold", formData.threshold);
      data.append("purchaseprice", formData.purchaseprice);
      data.append("weight", formData.weight);
      data.append("length", formData.length);
      data.append("width", formData.width);
      data.append("height", formData.height);
      data.append("size", formData.size);
      data.append("attributes", JSON.stringify(formData.attributes));
      data.append("productId", formData.productId);

      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await axios.post(
        `http://localhost:5000/api/products/${productId}/variants`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Variant added:", response.data);
      setSuccess(true);
      toast.success("Variant added Successfully!", {
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
      onClose();

      setFormData({
        name: "",
        value: "",
        SKU: "", // Reset SKU to empty after submission
        price: 0,
        stock: 0,
        threshold: 0,
        purchaseprice: 0,
        weight: 0,
        size: "",
        length: 0,
        width: 0,
        height: 0,
        attributes: [],
        productId: productId || "",
      });
      setImageFile(null);
    } catch (error) {
      setError("Failed to add variant");
      toast.error("Failed to add variant!", { transition: Slide });
      console.error("There was an error adding the variant!", error);
    } finally {
      setLoading(false);
    }
  };

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
        size="2xl"
        classNames={{
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#e3e3f6] dark:bg-[#19172c] text-[#a8b0d3]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="text-2xl font-bold text-violet-800 text-center">
              Add New Variant
            </ModalHeader>

            <ModalBody>
              {error && <div className="mb-4 text-red-500">{error}</div>}
              {success && (
                <div className="mb-4 text-green-500">
                  Variant added successfully!
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 mb-2">
                  Image
                </label>
                <div className="p-2 rounded-lg w-[300px] h-[150px] flex flex-col items-center justify-center bg-gray-300 cursor-pointer hover:bg-blue-200 active:bg-blue-200 relative">
                  <input
                    onChange={handleFileChange}
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
              {/* <input
                onChange={handleFileChange}
                id="csvInput"
                name="image"
                type="file"
                accept="image/*"
              />
              {imageFile && (
                <div>
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </div>
              )} */}
              {variantfields.map((field, index) => (
                <div key={index} className="mb-2">
                  <Input
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.name}
                    labelPlacement="outside"
                    required={field.required}
                    readOnly={field.readOnly} // Set readOnly for SKU and Barcode fields
                  />
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                variant="solid"
                disabled={loading}
                loading={loading}
                className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
              >
                {loading ? "Submitting..." : "Add Variant"}
              </Button>
              <Button variant="light" onPress={onClose} color="foreground">
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VariantForm;
