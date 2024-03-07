import express from 'express';
const app = express();
const PORT = process.env.PORT || 3001; // Use a different port from Vite's default (3000)

app.use(express.json());

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend boss!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});