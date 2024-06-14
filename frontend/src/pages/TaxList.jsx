import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UpdateTaxModal from "./UpdateTaxModal";

const TaxList = () => {
  const [taxes, setTaxes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTax, setSelectedTax] = useState(null);

  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/taxes");
        setTaxes(response.data);
      } catch (error) {
        console.error("Error fetching taxes:", error);
        setError("Failed to fetch taxes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaxes();
  }, []);

  const handleDeleteTax = async (taxId) => {
    try {
      await axios.delete(`http://localhost:5000/api/taxes/${taxId}`);
      setTaxes(taxes.filter((tax) => tax.taxId !== taxId));
    } catch (error) {
      console.error("Error deleting tax:", error);
      setError("Failed to delete tax. Please try again.");
    }
  };

  const handleOpenUpdateModal = (tax) => {
    setSelectedTax(tax);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedTax(null);
  };

  const handleUpdateTax = (updatedTax) => {
    const updatedTaxes = taxes.map((tax) =>
      tax.taxId === updatedTax.taxId ? updatedTax : tax
    );
    setTaxes(updatedTaxes);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tax List</h1>
        <Link
          to="/create-tax"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Tax
        </Link>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {taxes.length === 0 && !isLoading && !error && <p>No taxes found.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {taxes.map((tax) => (
          <div
            key={tax.taxId}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{tax.name}</h2>
              <p className="text-gray-600">Type: {tax.type}</p>
              <p className="text-gray-600">Rate: {tax.rate}</p>
              <p className="text-gray-600">
                Product: {tax.product ? tax.product.name : "N/A"}
              </p>
              <p className="text-gray-600">
                Variant: {tax.variant ? tax.variant.name : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-700 mt-2">{tax.description}</p>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleOpenUpdateModal(tax)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteTax(tax.taxId)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <UpdateTaxModal
        isOpen={showUpdateModal}
        taxId={selectedTax?.taxId}
        onClose={handleCloseUpdateModal}
        onUpdate={handleUpdateTax}
      />
    </div>
  );
};

export default TaxList;
