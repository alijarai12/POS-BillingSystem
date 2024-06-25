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
import { FaFileCsv } from "react-icons/fa";
import { FaDownload, FaUpload, FaEye } from "react-icons/fa";

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
      console.log(inputFile);
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
      console.log(parsedData);
      console.log(columns);
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
      const response = await axios.get(
        "http://localhost:5000/api/csv/download",
        {
          responseType: "blob",
        }
      );

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
  const handleDownloadSample = async () => {
    try {
      // Make a GET request to download the sample CSV file
      const response = await axios.get("http://localhost:5000/api/csv/sample", {
        responseType: "blob", // Ensure the response type is set to blob
      });

      // Create a URL for the blob object
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sample.csv"); // Set the filename for the download
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Cleanup
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the sample file", error);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file to upload");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/csv/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading the file", error);
      alert("Failed to upload file");
    }
  };

  return (
    <div className=" mx-auto p-4">
      <h2 className="font-bold text-3xl font-roboto text-violet-800 text-center mb-6">
        Add Bulk Product
      </h2>
      <Card className="p-5 w-full">
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <p>Select a CSV file:</p>
            <Button
              onClick={handleDownloadSample}
              startContent={<FaDownload />}
              className="bg-gradient-to-tl from-cyan-500 to-lime-500 text-white shadow-lg"
            >
              Download Sample
            </Button>
          </div>
          <div className="p-2 rounded-lg w-[300px] h-[150px] flex flex-col items-center justify-center bg-gray-300 cursor-pointer hover:bg-blue-200 active:bg-blue-200 relative">
            <input
              onChange={handleFileChange}
              id="csvInput"
              name="file"
              type="file"
              className="opacity-0 h-[150px] w-[300px] cursor-pointer absolute"
            />
            <FaFileCsv className="text-purple-400 hover:text-purple-600 h-16 w-16" />
            <p className="text-sm">
              {file ? file.name : "Drag file here or click to upload"}
            </p>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              onClick={handleParse}
              startContent={<FaEye />}
              className="bg-gradient-to-br from-teal-500 to-indigo-500 text-white shadow-lg"
            >
              Preview
            </Button>
            <Button
              onClick={handleUpload}
              startContent={<FaUpload />}
              className="bg-gradient-to-tl from-cyan-500 to-lime-500 text-white shadow-lg"
            >
              Upload
            </Button>
          </div>
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-br from-teal-500 to-indigo-500 text-white shadow-lg mt-2"
          >
            Export
          </Button>
        </div>
      </Card>

      <div className="mt-4 h-auto overflow-auto">
        {data.columns.length > 0 && data.rows.length > 0 ? (
          <Table>
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
          <p className="font-semibold text-xl p-4 text-violet-800 ">
            No data available
          </p>
        )}
      </div>
    </div>
  );
};

export default AddBulk;
