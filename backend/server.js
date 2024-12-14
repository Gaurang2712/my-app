const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Setup PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Table creation query (this will create the table if it doesn't already exist)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL
  );
`;

// Create table if it doesn't exist when the server starts
pool.query(createTableQuery)
  .then(() => console.log('Table created or already exists'))
  .catch(err => console.error('Error creating table:', err));

// Routes
app.use('/api/users', userRoutes(pool));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
