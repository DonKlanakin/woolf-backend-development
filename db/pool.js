const { Pool } = require("pg");

const pool = new Pool({
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	ssl: process.env.PGSSLMODE,
	port: process.env.PGPORT,
});

module.exports = pool;
