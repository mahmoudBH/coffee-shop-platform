const { dbPromise } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// --- Client Authentication ---

// Inscription du client
const signupClient = async (req, res) => {
  const { firstName, lastName, email, mobile, password } = req.body;

  if (!firstName || !lastName || !email || !mobile || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existingUser] = await dbPromise.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hashage du mot de passe (Sécurité Améliorée)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbPromise.query(
      "INSERT INTO users (firstName, lastName, email, mobile, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, mobile, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Connexion du client
const loginClient = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [user] = await dbPromise.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userData = user[0];

    // Vérification avec bcrypt (On gère aussi le cas des anciens mots de passe en clair pour ne pas tout casser)
    // Idéalement, il faut forcer un reset de mot de passe, mais pour l'instant :
    const isMatch = await bcrypt.compare(password, userData.password).catch(() => false);
    
    // Si bcrypt.compare échoue, on vérifie si c'est un ancien mot de passe non hashé
    if (!isMatch && password !== userData.password) {
       return res.status(400).json({ message: "Invalid email or password" });
    }

    // Si c'est un ancien mot de passe non hashé, on le hash et on le met à jour
    if (!isMatch && password === userData.password) {
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(password, salt);
      await dbPromise.query("UPDATE users SET password = ? WHERE id = ?", [newHashedPassword, userData.id]);
    }

    // Générer JWT
    const token = jwt.sign(
      { id: userData.id, firstName: userData.firstName, lastName: userData.lastName, email: userData.email, mobile: userData.mobile },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Stocker en session (optionnel mais tu l'avais fait)
    req.session.user = { id: userData.id, email: userData.email };

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: userData.id, firstName: userData.firstName, lastName: userData.lastName, email: userData.email, mobile: userData.mobile },
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Déconnexion du client
const logoutClient = (req, res) => {
  res.clearCookie("token");
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logged out successfully" });
  });
};


// --- Admin Authentication ---

// Connexion Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await dbPromise.query("SELECT * FROM admins WHERE email = ?", [email]);
    
    if (result.length === 0) return res.status(401).json({ error: "Email incorrect" });

    const admin = result[0];

    // Comme pour les clients, on ajoute le support de bcrypt tout en gardant l'ancien
    const isMatch = await bcrypt.compare(password, admin.password).catch(() => false);
    
    if (!isMatch && password !== admin.password) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    if (!isMatch && password === admin.password) {
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(password, salt);
      await dbPromise.query("UPDATE admins SET password = ? WHERE id = ?", [newHashedPassword, admin.id]);
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  signupClient,
  loginClient,
  logoutClient,
  loginAdmin
};
