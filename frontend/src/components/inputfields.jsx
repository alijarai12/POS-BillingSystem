import React from "react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

export const productfields = [
  { id: "productname", label: "Product Name", type: "text", required: true},
  { id: "description", label: "Description", type: "textarea" },
  { id: "SKU", label: "SKU", type: "text" },
  {
    id: "price",
    label: "Price",
    type: "number",
    required: true,
    min: "0",
    step: "0.01",
  },
  { id: "stock", label: "Stock", type: "number", required: true, min: "0" },
  {
    id: "threshold",
    label: "Threshold",
    type: "number",
    required: true,
    min: "0",
  },
  {
    id: "purchaseprice",
    label: "Purchaseprice",
    type: "number",
    required: true,
    min: "0",
  },

  { id: "category", label: "Category", type: "text", required: true },
  { id: "brand", label: "Brand", type: "text" },
  { id: "company", label: "Company", type: "text", required: true },
];
export const data = [
  // Data for 2022
  { name: "Jan", sales: 400, expenses: 240, revenue: 160, year: 2022 },
  { name: "Feb", sales: 300, expenses: 139, revenue: 161, year: 2022 },
  { name: "Mar", sales: 200, expenses: 980, revenue: -780, year: 2022 },
  { name: "Apr", sales: 278, expenses: 390, revenue: -112, year: 2022 },
  { name: "May", sales: 189, expenses: 480, revenue: -291, year: 2022 },
  { name: "Jun", sales: 500, expenses: 200, revenue: 300, year: 2022 },
  { name: "Jul", sales: 350, expenses: 300, revenue: 50, year: 2022 },
  { name: "Aug", sales: 200, expenses: 400, revenue: -200, year: 2022 },
  { name: "Sep", sales: 450, expenses: 100, revenue: 350, year: 2022 },
  { name: "Oct", sales: 600, expenses: 300, revenue: 300, year: 2022 },
  { name: "Nov", sales: 700, expenses: 200, revenue: 500, year: 2022 },
  { name: "Dec", sales: 800, expenses: 400, revenue: 400, year: 2022 },
  // Data for 2023
  { name: "Jan", sales: 450, expenses: 200, revenue: 250, year: 2023 },
  { name: "Feb", sales: 400, expenses: 300, revenue: 100, year: 2023 },
  { name: "Mar", sales: 550, expenses: 250, revenue: 300, year: 2023 },
  { name: "Apr", sales: 700, expenses: 400, revenue: 300, year: 2023 },
  { name: "May", sales: 600, expenses: 300, revenue: 300, year: 2023 },
  { name: "Jun", sales: 800, expenses: 350, revenue: 450, year: 2023 },
  { name: "Jul", sales: 900, expenses: 400, revenue: 500, year: 2023 },
  { name: "Aug", sales: 1000, expenses: 500, revenue: 500, year: 2023 },
  { name: "Sep", sales: 1100, expenses: 600, revenue: 500, year: 2023 },
  { name: "Oct", sales: 1200, expenses: 700, revenue: 500, year: 2023 },
  { name: "Nov", sales: 1300, expenses: 800, revenue: 500, year: 2023 },
  { name: "Dec", sales: 1400, expenses: 900, revenue: 500, year: 2023 },
  // Data for 2024
  { name: "Jan", sales: 420, expenses: 250, revenue: 170, year: 2024 },
  { name: "Feb", sales: 320, expenses: 159, revenue: 161, year: 2024 },
  { name: "Mar", sales: 220, expenses: 980, revenue: -760, year: 2024 },
  { name: "Apr", sales: 298, expenses: 380, revenue: -82, year: 2024 },
  { name: "May", sales: 189, expenses: 500, revenue: -311, year: 2024 },
  { name: "Jun", sales: 520, expenses: 180, revenue: 340, year: 2024 },
  { name: "Jul", sales: 370, expenses: 310, revenue: 60, year: 2024 },
  { name: "Aug", sales: 280, expenses: 420, revenue: -140, year: 2024 },
  { name: "Sep", sales: 480, expenses: 150, revenue: 330, year: 2024 },
  { name: "Oct", sales: 640, expenses: 270, revenue: 370, year: 2024 },
  { name: "Nov", sales: 710, expenses: 180, revenue: 530, year: 2024 },
  { name: "Dec", sales: 840, expenses: 480, revenue: 360, year: 2024 },

  { name: "Jan", sales: 430, expenses: 260, revenue: 170, year: 2025 },
  { name: "Feb", sales: 350, expenses: 169, revenue: 181, year: 2025 },
  { name: "Mar", sales: 240, expenses: 990, revenue: -750, year: 2025 },
  { name: "Apr", sales: 278, expenses: 370, revenue: -92, year: 2025 },
  { name: "May", sales: 199, expenses: 510, revenue: -311, year: 2025 },
  { name: "Jun", sales: 520, expenses: 200, revenue: 320, year: 2025 },
  { name: "Jul", sales: 380, expenses: 320, revenue: 60, year: 2025 },
  { name: "Aug", sales: 290, expenses: 440, revenue: -150, year: 2025 },
  { name: "Sep", sales: 490, expenses: 170, revenue: 320, year: 2025 },
  { name: "Oct", sales: 660, expenses: 280, revenue: 380, year: 2025 },
  { name: "Nov", sales: 720, expenses: 190, revenue: 530, year: 2025 },
  { name: "Dec", sales: 850, expenses: 500, revenue: 350, year: 2025 },
  // Data for 2026
  { name: "Jan", sales: 440, expenses: 270, revenue: 170, year: 2026 },
  { name: "Feb", sales: 370, expenses: 179, revenue: 191, year: 2026 },
  { name: "Mar", sales: 250, expenses: 1000, revenue: -750, year: 2026 },
  { name: "Apr", sales: 288, expenses: 360, revenue: -72, year: 2026 },
  { name: "May", sales: 209, expenses: 490, revenue: -281, year: 2026 },
  { name: "Jun", sales: 530, expenses: 220, revenue: 310, year: 2026 },
  { name: "Jul", sales: 390, expenses: 330, revenue: 60, year: 2026 },
  { name: "Aug", sales: 300, expenses: 450, revenue: -150, year: 2026 },
  { name: "Sep", sales: 500, expenses: 190, revenue: 310, year: 2026 },
  { name: "Oct", sales: 670, expenses: 290, revenue: 380, year: 2026 },
  { name: "Nov", sales: 730, expenses: 200, revenue: 530, year: 2026 },
  { name: "Dec", sales: 860, expenses: 510, revenue: 350, year: 2026 },
  // Data for 2027
  { name: "Jan", sales: 450, expenses: 280, revenue: 170, year: 2027 },
  { name: "Feb", sales: 390, expenses: 189, revenue: 201, year: 2027 },
  { name: "Mar", sales: 260, expenses: 1010, revenue: -750, year: 2027 },
  { name: "Apr", sales: 298, expenses: 350, revenue: -52, year: 2027 },
  { name: "May", sales: 219, expenses: 520, revenue: -301, year: 2027 },
  { name: "Jun", sales: 540, expenses: 240, revenue: 300, year: 2027 },
  { name: "Jul", sales: 400, expenses: 340, revenue: 60, year: 2027 },
  { name: "Aug", sales: 310, expenses: 460, revenue: -150, year: 2027 },
  { name: "Sep", sales: 510, expenses: 210, revenue: 300, year: 2027 },
  { name: "Oct", sales: 680, expenses: 300, revenue: 380, year: 2027 },
  { name: "Nov", sales: 740, expenses: 210, revenue: 530, year: 2027 },
  { name: "Dec", sales: 870, expenses: 520, revenue: 350, year: 2027 },
];

export const variantfields = [
  { label: "Variant Name", name: "name", type: "text", required: true },
  { label: "Variant Color", name: "color", type: "text", required: true },
  { label: "SKU", name: "SKU", type: "text", readOnly: true },
  { label: "Price", name: "price", type: "number", required: true },
  { label: "Stock", name: "stock", type: "number", required: true },
  {
    name: "threshold",
    label: "Threshold",
    type: "number",
    required: true,
    min: "0",
  },
  {
    name: "purchaseprice",
    label: "Purchaseprice",
    type: "number",
    required: true,
    min: "0",
  },

  { label: "Weight", name: "weight", type: "number" },
  { label: "Size", name: "size", type: "text" },
  { label: "Length", name: "length", type: "number" },
  { label: "Width", name: "width", type: "number" },
  { label: "Height", name: "height", type: "number" },
];
export const expenseCategories = [
  "Rent",
  "Utilities",
  "Office Supplies",
  "Marketing",
  "Travel",
  "Meals & Entertainment",
  "Salaries & Wages",
  "Insurance",
  "Equipment",
  "Maintenance & Repairs",
  "Taxes",
  "Professional Fees",
  "Training & Education",
  "Software & Subscriptions",
  "Advertising",
  "Legal",
  "Transportation",
  "Miscellaneous",
  "Others", // Additional option for unspecified categories
];

export const paymentMethods = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Cheque",
  "PayPal",
  "Venmo",
  "Apple Pay",
  "Google Pay",
  "Wire Transfer",
  "ACH Transfer",
  "Cryptocurrency",
  "Mobile Wallet",
  "Electronic Funds Transfer (EFT)",
  "Prepaid Card",
  "Money Order",
  "Bill Payment Service",
  "Cash App",
  "Other", // Additional option for unspecified payment methods
];

export const currencyOptions = [
  "USD (United States Dollar)",
  "EUR (Euro)",
  "GBP (British Pound Sterling)",
  "JPY (Japanese Yen)",
  "CNY (Chinese Yuan)",
  "CAD (Canadian Dollar)",
  "AUD (Australian Dollar)",
  "INR (Indian Rupee)",
  "NPR (Nepalese Rupee)",
  "Others", // Additional option for unspecified currencies or countries
];

export const recurrenceOptions = [
  "One-time",
  "Daily",
  "Weekly",
  "Bi-weekly",
  "Monthly",
  "Quarterly",
  "Semi-annually",
  "Annually",
];

export const transactionFields = [
  {
    name: "amount",
    label: "Expense Amount",
    type: "number",
    placeholder: "Enter amount",
  },
  {
    name: "currency",
    label: "Currency",
    type: "text",
    // defaultValue: "USD",
    placeholder: "Enter currency (e.g., USD)",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "Enter category",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
  },
  {
    name: "paymentMethod",
    label: "Payment Method",
    type: "text",
    placeholder: "Enter payment method",
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    placeholder: "Enter date",
  },
  {
    name: "Recurrence",
    label: "Recurrence",
    type: "text",
    placeholder: "Enter recurrence",
  },
];

export const salesTableData = [
  {
    date: "2023-01-15",
    salesRep: "John Doe",
    product: "Product A",
    price: 20.5,
    quantity: 10,
    totalValue: 205.0,
    status: "Completed",
  },
  {
    date: "2023-02-10",
    salesRep: "Jane Smith",
    product: "Product B",
    price: 50.0,
    quantity: 5,
    totalValue: 250.0,
    status: "Pending",
  },
  {
    date: "2023-03-05",
    salesRep: "Alice Johnson",
    product: "Product C",
    price: 100.0,
    quantity: 2,
    totalValue: 200.0,
    status: "Completed",
  },
  {
    date: "2023-04-20",
    salesRep: "Bob Brown",
    product: "Product D",
    price: 30.0,
    quantity: 8,
    totalValue: 240.0,
    status: "Cancelled",
  },
  {
    date: "2023-05-15",
    salesRep: "Charlie Davis",
    product: "Product E",
    price: 75.0,
    quantity: 3,
    totalValue: 225.0,
    status: "Completed",
  },
  {
    date: "2023-01-15",
    salesRep: "John Doe",
    product: "Product A",
    price: 20.5,
    quantity: 10,
    totalValue: 205.0,
    status: "Completed",
  },
  {
    date: "2023-02-20",
    salesRep: "Jane Smith",
    product: "Product B",
    price: 15.75,
    quantity: 8,
    totalValue: 126.0,
    status: "Completed",
  },
  {
    date: "2023-03-10",
    salesRep: "Mike Johnson",
    product: "Product C",
    price: 30.0,
    quantity: 5,
    totalValue: 150.0,
    status: "Pending",
  },
  {
    date: "2023-04-05",
    salesRep: "Emily Brown",
    product: "Product A",
    price: 20.5,
    quantity: 15,
    totalValue: 307.5,
    status: "Completed",
  },
  {
    date: "2023-05-12",
    salesRep: "John Doe",
    product: "Product B",
    price: 15.75,
    quantity: 12,
    totalValue: 189.0,
    status: "Completed",
  },
  {
    date: "2023-06-18",
    salesRep: "Jane Smith",
    product: "Product C",
    price: 30.0,
    quantity: 10,
    totalValue: 300.0,
    status: "Pending",
  },
  {
    date: "2023-07-22",
    salesRep: "Mike Johnson",
    product: "Product A",
    price: 20.5,
    quantity: 20,
    totalValue: 410.0,
    status: "Completed",
  },
  {
    date: "2023-08-30",
    salesRep: "Emily Brown",
    product: "Product B",
    price: 15.75,
    quantity: 18,
    totalValue: 283.5,
    status: "Pending",
  },
  {
    date: "2023-09-05",
    salesRep: "John Doe",
    product: "Product C",
    price: 30.0,
    quantity: 6,
    totalValue: 180.0,
    status: "Completed",
  },
  {
    date: "2023-10-17",
    salesRep: "Jane Smith",
    product: "Product A",
    price: 20.5,
    quantity: 25,
    totalValue: 512.5,
    status: "Pending",
  },
  {
    date: "2023-11-25",
    salesRep: "Mike Johnson",
    product: "Product B",
    price: 15.75,
    quantity: 14,
    totalValue: 220.5,
    status: "Completed",
  },
  {
    date: "2023-12-10",
    salesRep: "Emily Brown",
    product: "Product C",
    price: 30.0,
    quantity: 8,
    totalValue: 240.0,
    status: "Completed",
  },
];

// InputField.js

export const InputField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  startContent,
  endContent,
  required = false,
}) => (
  <div className="flex flex-col gap-3">
    <Input
      name={name}
      label={label}
      placeholder={placeholder}
      labelPlacement="outside"
      required={required}
      className="block text-sm font-medium text-gray-700"
      startContent={startContent}
      endContent={endContent}
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

// SelectField.js

export const SelectField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  options,
  required = false,
}) => (
  <div className="flex flex-col gap-3">
    <Select
      name={name}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block text-sm font-medium text-gray-700"
      required={required}
    >
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ))}
    </Select>
  </div>
);

// TextAreaField.js

export const TextAreaField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  rows = 3,
}) => (
  <div className="flex flex-col gap-3">
    <Textarea
      className="block text-sm font-medium text-gray-700"
      name={name}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
    />
  </div>
);

export const blogs = [
  {
    id: 1,
    title: "10 Tips for Effective POS Billing",
    imageUrl: "https://example.com/image1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae augue arcu.",
    date: "June 1, 2024",
  },
  {
    id: 2,
    title: "Why POS Systems Are Crucial for Retail Businesses",
    imageUrl: "https://example.com/image2.jpg",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    date: "May 15, 2024",
  },
  {
    id: 3,
    title: "How to Choose the Right POS System for Your Restaurant",
    imageUrl: "https://example.com/image3.jpg",
    description:
      "Fusce tempor felis sit amet ultrices. Sed eu aliquam justo, vitae hendrerit mi.",
    date: "April 25, 2024",
  },
];
