const { Pool } = require('pg');

// Create a pool of connections to the PostgreSQL database
const pool = new Pool({
    user: 'your_db_user',          // Replace with your PostgreSQL user
    host: 'localhost',             // Use 'localhost' or your cloud host
    database: 'blognest',          // The database you created
    password: 'your_db_password',  // Replace with your PostgreSQL password
    port: 5432,                    // Default PostgreSQL port
});

module.exports = pool;
