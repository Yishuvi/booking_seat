const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  
});

console.log("Connected to the database successfully");

module.exports = pool;