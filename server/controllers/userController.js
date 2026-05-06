const { dbPromise } = require("../config/db");
const bcrypt = require("bcrypt");

// --- Profil Client ---
const getClientProfile = async (req, res) => {
  const userId = req.user.id; // Issu de verifyClientToken
  try {
    const [results] = await dbPromise.query('SELECT id, firstName, lastName, email, mobile, points FROM users WHERE id = ?', [userId]);
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.json({ user: results[0] });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const updateClientProfile = async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, email, mobile } = req.body;

  try {
    await dbPromise.query(
      'UPDATE users SET firstName = ?, lastName = ?, email = ?, mobile = ? WHERE id = ?',
      [firstName, lastName, email, mobile, userId]
    );
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

const changeClientPassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const [userResult] = await dbPromise.query("SELECT password FROM users WHERE id = ?", [userId]);
    if (userResult.length === 0) return res.status(404).json({ message: "User not found" });
    
    const dbPassword = userResult[0].password;
    
    // Support des anciens mots de passe en clair + bcrypt
    const isMatch = await bcrypt.compare(currentPassword, dbPassword).catch(() => false);
    if (!isMatch && currentPassword !== dbPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hashage du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await dbPromise.query("UPDATE users SET password = ? WHERE id = ?", [hashedNewPassword, userId]);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --- Profil Admin ---
const getAdminProfile = async (req, res) => {
  const adminId = req.adminId; // Issu de verifyAdminToken
  try {
    const [result] = await dbPromise.query("SELECT email FROM admins WHERE id = ?", [adminId]);
    if (result.length === 0) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ email: result[0].email });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const updateAdminEmail = async (req, res) => {
  const adminId = req.adminId;
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Tous les champs sont requis" });

  try {
    const [result] = await dbPromise.query("SELECT * FROM admins WHERE id = ?", [adminId]);
    if (result.length === 0) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const admin = result[0];
    const isMatch = await bcrypt.compare(password, admin.password).catch(() => false);
    
    if (!isMatch && password !== admin.password) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    await dbPromise.query("UPDATE admins SET email = ? WHERE id = ?", [email, adminId]);
    res.json({ message: "Email mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const updateAdminPassword = async (req, res) => {
  const adminId = req.adminId;
  const { password, newPassword } = req.body;

  if (!password || !newPassword) return res.status(400).json({ error: "Tous les champs sont requis" });

  try {
    const [result] = await dbPromise.query("SELECT * FROM admins WHERE id = ?", [adminId]);
    if (result.length === 0) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const admin = result[0];
    const isMatch = await bcrypt.compare(password, admin.password).catch(() => false);
    
    if (!isMatch && password !== admin.password) {
      return res.status(401).json({ error: "Mot de passe actuel incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await dbPromise.query("UPDATE admins SET password = ? WHERE id = ?", [hashedNewPassword, adminId]);
    res.json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// --- Utilisateurs (Admin) ---
const getAllUsers = async (req, res) => {
  try {
    const [results] = await dbPromise.query("SELECT id, firstName, lastName, email, mobile, points FROM users");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  getClientProfile,
  updateClientProfile,
  changeClientPassword,
  getAdminProfile,
  updateAdminEmail,
  updateAdminPassword,
  getAllUsers
};
