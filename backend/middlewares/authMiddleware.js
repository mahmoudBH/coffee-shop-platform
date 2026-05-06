const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware pour vérifier l'authentification des clients (via Cookie ou Header)
const verifyClientToken = (req, res, next) => {
  const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Stocker les infos du client dans la requête
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware pour vérifier l'authentification de l'admin (via Header)
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Accès refusé. Aucun token fourni." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token invalide ou expiré" });
    }
    req.adminId = decoded.id; // Stocker l'id de l'admin dans la requête
    next();
  });
};

module.exports = { verifyClientToken, verifyAdminToken };
