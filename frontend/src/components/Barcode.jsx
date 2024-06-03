// import React, { useState } from 'react';
// import Barcode from 'react-barcode';

// const BarcodeGenerator = () => {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [scannedBarcode, setScannedBarcode] = useState('');

//   const handleSelectChange = (e) => {
//     const options = Array.from(e.target.selectedOptions, option => option.value);
//     setSelectedOptions(options);
//   };

//   const generateBarcode = () => {
//     const barcodeData = selectedOptions.join('-');
//     return <Barcode value={barcodeData} />;
//   };

//   const handleBarcodeScanned = (scannedData) => {
//     // Simulate accessing database based on scanned barcode
//     // Replace this with your actual database access logic
//     const productData = getProductDataFromDatabase(scannedData);
//     console.log('Product data:', productData);
//   };

//   const getProductDataFromDatabase = (barcode) => {
//     // This is a mock function, replace it with your actual database access code
//     // Here you can make a request to your backend API to fetch product data based on the scanned barcode
//     // For demonstration purposes, we'll return a mock product data object
//     return {
//       name: 'Product Name',
//       price: '$19.99',
//       description: 'Product description goes here...',
//     };
//   };

//   return (
//     <div>
//       <select multiple onChange={handleSelectChange}>
//         <option value="option1">Option 1</option>
//         <option value="option2">Option 2</option>
//         <option value="option3">Option 3</option>
//       </select>
//       <button onClick={generateBarcode}>Generate Barcode</button>
//       {selectedOptions.length > 0 && generateBarcode()}

//       {/* Simulated barcode scanner */}
//       <div>
//         <label>Scan Barcode:</label>
//         <input
//           type="text"
//           value={scannedBarcode}
//           onChange={(e) => setScannedBarcode(e.target.value)}
//           onBlur={() => handleBarcodeScanned(scannedBarcode)}
//         />
//       </div>
//     </div>
//   );
// };

// export default BarcodeGenerator;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarcodeGenerator = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    SKU: '',
    price: 0,
    stock: 0,
    category: '',
    brand: '',
    company: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({ category: '', brand: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products'); // Adjust the URL to your API endpoint
      setProducts(response.data);
      extractCategoriesAndBrands(response.data);
    } catch (error) {
      console.error('There was an error fetching the products!', error);
    }
  };

  const extractCategoriesAndBrands = (products) => {
    const categories = [...new Set(products.map(product => product.category))];
    const brands = [...new Set(products.map(product => product.brand))];
    setCategories(categories);
    setBrands(brands);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData); // Adjust the URL to your API endpoint
      console.log('Product added:', response.data);
      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        SKU: '',
        price: 0,
        stock: 0,
        category: '',
        brand: '',
        company: '',
      });
      fetchProducts(); // Refresh the product list
    } catch (error) {
      setError('Failed to add product');
      console.error('There was an error adding the product!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`); // Adjust the URL to your API endpoint
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('There was an error deleting the product!', error);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProducts = products.filter(product => {
    return (
      (filters.category === '' || product.category === filters.category) &&
      (filters.brand === '' || product.brand === filters.brand)
    );
  });

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg fade-in mr-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Add New Product</h2>

        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">Product added successfully!</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="SKU" className="block text-gray-700 font-bold mb-2">SKU</label>
            <input
              type="text"
              id="SKU"
              name="SKU"
              value={formData.SKU}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="brand" className="block text-gray-700 font-bold mb-2">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-700 font-bold mb-2">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? 'Submitting...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg fade-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Product List</h2>

        <div className="mb-4 flex">
          <div className="mr-2">
            <label htmlFor="categoryFilter" className="block text-gray-700 font-bold mb-2">Category</label>
            <select
              id="categoryFilter"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="brandFilter" className="block text-gray-700 font-bold mb-2">Brand</label>
            <select
              id="brandFilter"
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-700 text-center">No products found.</p>
        ) : (
          <ul>
            {filteredProducts.map(product => (
              <li key={product.productId} className="mb-4 border-b pb-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>
                  <div>
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-700 focus:outline-none"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.productId)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-gray-700">Price: ${product.price}</p>
                <p className="text-gray-700">Stock: {product.stock}</p>
                <p className="text-gray-700">Category: {product.category}</p>
                <p className="text-gray-700">Brand: {product.brand}</p>
                <p className="text-gray-700">Company: {product.company}</p>
                {product.variants && (
                  <div className="mt-2">
                    <h4 className="font-bold text-gray-700">Variants:</h4>
                    <ul className="ml-4">
                      {product.variants.map(variant => (
                        <li key={variant.variantId} className="text-gray-700">
                          {variant.name}: ${variant.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BarcodeGenerator;
