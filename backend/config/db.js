const mysql = require("mysql2");
require("dotenv").config();

// Connexion à MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "coffee_shop",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion à MySQL:", err);
  } else {
    console.log("✅ Connexion à MySQL réussie !");
  }
});

// Reconnexion automatique en cas de perte de connexion
db.on('error', (err) => {
  console.error('Erreur MySQL:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    db.connect(); 
  }
});

// Exporter une version avec .promise() pour utiliser async/await
const dbPromise = db.promise();

module.exports = { db, dbPromise };
