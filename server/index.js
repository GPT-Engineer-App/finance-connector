import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001; // Use a different port from Vite's default (3000)

app.use(cors());
app.use(express.json());

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend bossman!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});