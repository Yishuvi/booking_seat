const app = require('./app');
const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.DATABASE_URL, // or config object
});

app.set('db', db);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
