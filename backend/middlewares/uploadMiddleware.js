const multer = require("multer");
const path = require("path");

// Configuration de Multer pour le téléchargement générique de fichiers (ex: événements)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique
  },
});

// Configuration de Multer spécifique pour le menu
const menuStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "menu/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique
  },
});

const uploadGeneral = multer({ storage });
const uploadMenu = multer({ storage: menuStorage });

module.exports = { uploadGeneral, uploadMenu };
