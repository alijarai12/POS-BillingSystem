import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

import {
  expenseCategories,
  paymentMethods,
  currencyOptions,
  recurrenceOptions,
  transactionFields,
} from "./inputfields";
const AddExpenses = () => {
  const [expenseData, setExpenseData] = useState({
    transactionFields,
  });
  const [expenses, setExpenses] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/expenses", {
        ...expenseData,
        date: expenseData.date || new Date().toISOString().split("T")[0], // Format date as yyyy-mm-dd
      });
      toast.success(
        `Expense added successfully: ${response.data.category} - $${response.data.amount}`
      );
      setExpenses([...expenses, response.data]);
      setExpenseData(transactionFields); // Resetting the input fields
    } catch (error) {
      toast.error("Error adding expense");
    }
  };

  const handleCancel = () => {
    setExpenseData({
      transactionFields,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <Button
        radius="md"
        size="sm"
        onPress={onOpen}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
      >
        + Expenses
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        placement="center"
        classNames={{
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#e3e3f6] dark:bg-[#19172c] text-[#a8b0d3]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-5">
                <h1 className="text-3xl font-bold text-violet-800 text-center">
                  Add Expenses
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <Input
                      name="amount"
                      label="Expense Amount"
                      placeholder="0.00"
                      labelPlacement="outside"
                      required
                      className="block text-sm font-medium text-gray-700"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                      endContent={
                        <div className="flex items-center">
                          <label className="sr-only" htmlFor="currency">
                            Currency
                          </label>
                          <select
                            className="outline-none border-0 bg-transparent text-default-400 text-small"
                            id="currency"
                            name="currency"
                            value={expenseData.currency}
                            onChange={handleChange}
                          >
                            {currencyOptions.map((currency) => (
                              <option key={currency} value={currency}>
                                {currency}
                              </option>
                            ))}
                          </select>
                        </div>
                      }
                      type="number"
                      value={expenseData.amount}
                      onChange={handleChange}
                    />
                    <Select
                      name="category"
                      label="Category"
                      labelPlacement="outside"
                      placeholder="Select a Category"
                      value={expenseData.category}
                      onChange={handleChange}
                      className="block text-sm font-medium text-gray-700"
                      required
                    >
                      {expenseCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      name="Recurrence"
                      label="Recurrence"
                      labelPlacement="outside"
                      placeholder="Select Recurrence"
                      value={expenseData.recurrence}
                      onChange={handleChange}
                      className="block text-sm font-medium text-gray-700"
                      required
                    >
                      {recurrenceOptions.map((recurrence) => (
                        <SelectItem key={recurrence} value={recurrence}>
                          {recurrence}
                        </SelectItem>
                      ))}
                    </Select>

                    <Textarea
                      className="block text-sm font-medium text-gray-700"
                      name="description"
                      label="Description"
                      labelPlacement="outside"
                      placeholder="Expenses"
                      value={expenseData.description}
                      onChange={handleChange}
                      rows="3"
                    ></Textarea>
                    <div>
                      <Input
                        label="Date"
                        labelPlacement="outside"
                        id="date"
                        type="date"
                        name="date"
                        className="block text-sm font-medium text-gray-700"
                        value={expenseData.date}
                        onChange={handleChange}
                      />
                    </div>
                    <Select
                      name="paymentMethod"
                      label="Payment Method"
                      labelPlacement="outside"
                      placeholder="Select Payment Method"
                      value={expenseData.paymentMethod}
                      onChange={handleChange}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>
                          {method}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="submit"
                      color="primary"
                      variant="solid"
                      className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="light"
                      onPress={onClose}
                      color="foreground"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddExpenses;
