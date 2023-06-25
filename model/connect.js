const { Client } = require("pg");

const pgClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'jaba',
    password: 'yzaman',
    port: 5432,
});

pgClient.connect(err => {
    if (err) throw error;
    console.log("Подключено");
  });
module.exports = pgClient;
