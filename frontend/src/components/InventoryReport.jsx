import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Card,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
} from "@nextui-org/react";

function InventoryReport() {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stockFilter, setStockFilter] = useState("");
  const itemsPerPage = 10;
  const stocks = ["in", "out", "low"];
  useEffect(() => {
    fetchProducts();
    fetchVariants();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      console.log("Fetched Products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchVariants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/variants");
      console.log("Fetched Variants:", response.data);
      setVariants(response.data);
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };

  const totalStock = useMemo(() => {
    return variants.reduce((sum, variant) => sum + variant.stock, 0);
  }, [variants]);

  const filteredVariants = useMemo(() => {
    return variants.filter((variant) => {
      switch (stockFilter) {
        case "low":
          return variant.stock < variant.threshold;
        case "out":
          return variant.stock === 0;
        case "in":
          return variant.stock > 0 && variant.stock >= variant.threshold;
        default:
          return true;
      }
    });
  }, [variants, stockFilter]);

  const paginatedVariants = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredVariants.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVariants, currentPage, itemsPerPage]);

  const getProductName = (productId) => {
    const product = products.find((product) => product.productId === productId);
    return product ? product.productname : "Unknown Product";
  };

  const calculateTotalCost = (variant) => variant.stock * variant.purchaseprice;
  const calculateTotalPrice = (variant) => variant.stock * variant.price;

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-3xl font-roboto text-violet-800 mb-6">
        Inventory Report
      </h1>

      <div className="flex space-x-4 mb-4">
        <Select
          value={stockFilter}
          placeholder="Select Stock"
          onChange={(e) => setStockFilter(e.target.value)}
          className="rounded-lg w-[150px] hover"
          size="sm"
        >
          {stocks.map((stock) => (
            <SelectItem key={stock} value={stock}>
              {stock}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Card className="overflow-x-auto">
        <Table className="min-w-full bg-white">
          <TableHeader>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Product Name
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              SKU
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Variant
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Stock
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Price
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Cost
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Total Cost
            </TableColumn>
            <TableColumn className="text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
              Total Price
            </TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedVariants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell className="px-6 py-4">
                  {getProductName(variant.productId)}
                </TableCell>
                <TableCell>{variant.SKU}</TableCell>
                <TableCell>{variant.name}</TableCell>
                <TableCell>{variant.stock}</TableCell>
                <TableCell>{variant.price}</TableCell>
                <TableCell>{variant.purchaseprice}</TableCell>
                <TableCell>{calculateTotalCost(variant).toFixed(2)}</TableCell>
                <TableCell>{calculateTotalPrice(variant).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-black">
          Total Stock: {totalStock}
        </span>
        <Pagination
          total={Math.ceil(filteredVariants.length / itemsPerPage)}
          initialPage={1}
          currentPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default InventoryReport;
