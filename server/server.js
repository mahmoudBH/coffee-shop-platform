const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();

// --- Middlewares Globaux ---
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// Fichiers statiques (Images, Menus)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/menu", express.static(path.join(__dirname, "menu")));

// Configuration de la session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret_key_here",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production", maxAge: 3600000, httpOnly: true },
  })
);

// Middleware de vérification d'URL invalide
app.use((req, res, next) => {
  try {
    decodeURIComponent(req.path);
    next();
  } catch (e) {
    console.warn('❌ URL invalide détectée :', req.url);
    res.status(400).send('Bad Request: Malformed URL');
  }
});

// --- Routes ---
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const stockRoutes = require("./routes/stockRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const packRoutes = require("./routes/packRoutes");
const statRoutes = require("./routes/statRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/packs", packRoutes);
app.use("/api/statistics", statRoutes);
// app.use("/api/admin", adminRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("🚀 Serveur Centralisé en ligne !");
});

// --- Démarrage du serveur ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur centralisé lancé sur le port ${PORT}`);
});
