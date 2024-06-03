import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import {
  Card,
  Button,
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { FaCloudArrowUp } from "react-icons/fa6";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const AddBulk = () => {
  // This state will store the parsed data
  const [data, setData] = useState({ columns: [], rows: [] });

  // This state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // This state will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when the file input changes
  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      // Check the file extensions, if it not included in the allowed extensions we show the error
      const fileExtension = inputFile?.name.split(".").pop();
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };

  const handleParse = () => {
    // If user clicks the parse button without a file we show an error
    if (!file) return alert("Enter a valid file");

    // Initialize a reader which allows user to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
        skipEmptyLines: true,
      });
      const parsedData = csv?.data;
      const columns = csv?.meta?.fields;

      // Normalize data to ensure each row has the same number of cells as columns
      const normalizedData = parsedData.map((row) => {
        const normalizedRow = {};
        columns.forEach((column) => {
          normalizedRow[column] = row[column] || "";
        });
        return normalizedRow;
      });

      setData({ columns, rows: normalizedData });
    };
    reader.readAsText(file);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/csv/download", {
        responseType: "blob",
      });

      // Create a URL for the blob object
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.csv"); // or whatever you want to name the file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file to upload");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/csv/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading the file", error);
      alert("Failed to upload file");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-violet-800 text-center">
        Add Bulk Product
      </h2>
      <Card className="p-5 w-full">
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <p>Select a CSV file:</p>
            <Button onClick={handleDownload}>Download Sample</Button>
          </div>
          <div className="p-2 rounded-lg w-[300px] h-[150px] flex flex-col items-center justify-center bg-gray-300 cursor-pointer hover:bg-blue-200 active:bg-blue-200 relative">
            <input
              onChange={handleFileChange}
              id="csvInput"
              name="file"
              type="file"
              className="opacity-0 h-[150px] w-[300px] cursor-pointer absolute"
            />
            <FaCloudArrowUp className="text-purple-400 hover:text-purple-600 h-16 w-16" />
            <p className="text-sm">
              {file ? file.name : "Drag file here or click to upload"}
            </p>
          </div>
          <div className="mt-4 flex justify-between">
            <Button onClick={handleParse}>Preview</Button>
            <Button onClick={handleUpload}>Upload</Button>
          </div>
        </div>
        <div className="mt-4 w-[800px] h-auto overflow-auto">
  {data.columns.length > 0 && data.rows.length > 0 ? (
    <Table className="w-full">
      <TableHeader>
        {data.columns &&
          data.columns.map((key, index) => (
            <TableColumn key={index}>{key}</TableColumn>
          ))}
      </TableHeader>
      <TableBody>
        {data.rows &&
          data.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {data.columns.map((col, colIndex) => (
                <TableCell key={colIndex}>{row[col]}</TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  ) : (
    <p className="font-semibold text-center text-xl p-4">
      No data available
    </p>
  )}
</div>
      </Card>
      

    </div>
  );
};

export default AddBulk;
