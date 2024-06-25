// import React, { useState } from "react";
// import axios from "axios";
// import { Button, Input, Textarea } from "@nextui-org/react";
// import { productfields } from "./inputfields";
// import { FaImage } from "react-icons/fa6";

// const ProductForm = () => {
//   const [formData, setFormData] = useState({
//     productfields,
//   });
//   const [imageFile, setImageFile] = useState(null); // State for image file
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "company") {
//       // Generate SKU when company name changes
//       const sku = generateSKU(value);
//       setFormData({ ...formData, [name]: value, SKU: sku });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]); // Set the selected image file
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const formDataWithImage = new FormData(); // Create a FormData object
//       formDataWithImage.append("image", imageFile); // Append the image file
//       // Append other form data fields
//       Object.entries(formData).forEach(([key, value]) => {
//         formDataWithImage.append(key, value);
//       });

//       const response = await axios.post(
//         "http://localhost:5000/api/products",
//         formDataWithImage,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
//           },
//         }
//       );
//       console.log("Product added:", response.data);
//       setSuccess(true);
//       setFormData({
//         productfields,
//       });
//       setImageFile(null); // Reset the image file state
//     } catch (error) {
//       setError("Failed to add product");
//       console.error("There was an error adding the product!", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateSKU = (company) => {
//     const prefix = company.substring(0, 3).toUpperCase();
//     const timestamp = Date.now().toString().slice(-5);
//     return `${prefix}-${timestamp}`;
//   };

//   return (
//     <div className="flex items-start justify-center min-h-screen bg-slate-400 p-4">
//       <form
//         className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md fade-in mt-2"
//         onSubmit={handleSubmit}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-violet-800 text-center">
//           Add New Product
//         </h2>
//         {error && <div className="mb-4 text-red-500">{error}</div>}
//         {success && (
//           <div className="mb-4 text-green-500">Product added successfully!</div>
//         )}

//         {productfields.map(({ id, label, type, required, min, step }) => (
//           <div className="mb-4" key={id}>
//             <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
//               {label}
//             </label>
//             {type === "textarea" ? (
//               <Textarea
//                 id={id}
//                 name={id}
//                 label={label}
//                 value={formData[id]}
//                 onChange={handleChange}
//                 required={required}
//               />
//             ) : (
//               <Input
//                 type={type}
//                 id={id}
//                 name={id}
//                 label={label}
//                 value={formData[id]}
//                 onChange={handleChange}
//                 required={required}
//                 min={min}
//                 step={step}
//               />
//             )}
//           </div>
//         ))}

//         <div className="mb-4">
//           <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
//             Image
//           </label>
//           <div className="p-2 rounded-lg w-[300px] h-[150px] flex flex-col items-center justify-center bg-gray-300 cursor-pointer hover:bg-blue-200 active:bg-blue-200 relative">
//             <input
//               onChange={handleImageChange}
//               name="image"
//               type="file"
//               accept="image/*"
//               className="opacity-0 cursor-pointer absolute"
//             />
//             <FaImage className="text-purple-400 h-16 w-16" />
//             <p className="text-sm">
//               {imageFile ? imageFile.name : "Drag file here or click to upload"}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <Button type="submit" disabled={loading} color="primary">
//             {loading ? "Submitting..." : "Add Product"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import { productfields } from "./inputfields";
import { FaImage } from "react-icons/fa6";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Initialize react-hook-form

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("image", imageFile);
      Object.entries(data).forEach(([key, value]) => {
        formDataWithImage.append(key, value);
      });

      const response = await axios.post(
        "http://localhost:5000/api/products",
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added:", response.data);
      setSuccess(true);
      reset(); // Reset form fields
      setImageFile(null);
    } catch (error) {
      setError("Failed to add product");
      console.error("There was an error adding the product!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-3 text-violet-800 text-center">
        Add New Product
      </h2>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full fade-in mt-2 grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-1">
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {success && (
            <div className="mb-4 text-green-500">
              Product added successfully!
            </div>
          )}
          {productfields.map(({ id, label, type, required, min, step }) => (
            <div className="pb-4" key={id}>
              {type === "textarea" ? (
                <Textarea
                  {...register(id, { required })}
                  id={id}
                  name={id}
                  label={label}
                  labelPlacement="outside"
                  placeholder={id}
                />
              ) : (
                <Input
                  {...register(id, { required, min })}
                  type={type}
                  id={id}
                  name={id}
                  label={label}
                  labelPlacement="outside"
                  placeholder={id}
                  step={step} 
                />
              )}
              {/* {errors[id] && (
      <p className="text-red-500 text-sm mt-1">
        This field is required.
      </p>
    )} */}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
            <span className="text-red-500">*</span>
          </label>
          <div className="p-2 rounded-lg h-[150px] flex items-center justify-center bg-gray-300 cursor-pointer hover:bg-blue-200 active:bg-blue-200 relative">
            <input
              onChange={handleImageChange}
              name="image"
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer absolute"
            />
            <FaImage className="text-purple-400 h-16 w-16" />
            <p className="text-sm">
              {imageFile ? imageFile.name : "Drag file here or click to upload"}
            </p>
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">Image is required.</p>
          )}
        </div>
        <div className="flex items-center justify-end">
          <Button type="submit" disabled={loading} color="primary">
            {loading ? "Submitting..." : "Add Product"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
