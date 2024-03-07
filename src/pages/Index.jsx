import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Select, Stack, Text, Textarea } from "@chakra-ui/react";
import { FaEdit, FaTrash, FaFileExport, FaPlus } from "react-icons/fa";

// Initialize dummy data for transactions
const initialTransactions = [
  { id: 1, date: "2023-04-01", amount: 500, type: "income", category: "Salary" },
  { id: 2, date: "2023-04-02", amount: 50, type: "expense", category: "Groceries" },
  { id: 3, date: "2023-04-03", amount: 20, type: "expense", category: "Transport" },
];

const categories = ["Salary", "Groceries", "Bills", "Transport", "Entertainment", "Work"];

const Index = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "income",
    category: categories[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      ...formData,
      amount: parseFloat(formData.amount),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setFormData(transaction);
  };

  const handleEditTransaction = () => {
    setTransactions(transactions.map((transaction) => (transaction.id === selectedTransaction.id ? { ...formData, amount: parseFloat(formData.amount) } : transaction)));
    setSelectedTransaction(null);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const handleExportTransactions = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "transactions.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const getTotalBalance = () => {
    let income = transactions.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
    let expenses = transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
    return income - expenses;
  };

  const renderTransactionsList = () => (
    <List spacing={3}>
      {transactions.map((transaction) => (
        <ListItem key={transaction.id} p={2} borderWidth="1px" borderRadius="lg">
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="sm">{transaction.date}</Text>
              <Text fontWeight="bold">{transaction.category}</Text>
              <Text color={transaction.type === "expense" ? "red.500" : "green.500"}>
                {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
              </Text>
            </Box>
            <Box>
              <Button size="sm" leftIcon={<FaEdit />} mr={2} onClick={() => handleSelectTransaction(transaction)}>
                Edit
              </Button>
              <Button size="sm" leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDeleteTransaction(transaction.id)}>
                Delete
              </Button>
            </Box>
          </Flex>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box p={5}>
      <Heading mb={5}>Personal Financial Manager</Heading>

      {/* Transaction Form */}
      <Box borderWidth="1px" borderRadius="lg" p={4} mb={5}>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={formData.date} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input type="number" name="amount" value={formData.amount} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select name="type" value={formData.type} onChange={handleInputChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select name="category" value={formData.category} onChange={handleInputChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={selectedTransaction ? handleEditTransaction : handleAddTransaction}>
            {selectedTransaction ? "Edit Transaction" : "Add Transaction"}
          </Button>
        </Stack>
      </Box>

      {/* Transactions List */}
      {renderTransactionsList()}

      {/* Total Balance */}
      <Flex justify="space-between" align="center" mt={5}>
        <Heading as="h3" size="lg">
          Total Balance: ${getTotalBalance().toFixed(2)}
        </Heading>
        <Button leftIcon={<FaFileExport />} colorScheme="blue" onClick={handleExportTransactions}>
          Export Transactions
        </Button>
      </Flex>
    </Box>
  );
};

export default Index;
