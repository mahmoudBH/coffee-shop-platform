import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to view your profile.");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:4000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setFormData(response.data.user);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 401) {
          setError("Session expired, please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("An error occurred while fetching the profile.");
        }
      });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    axios
      .put("http://localhost:4000/api/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(formData);
        setIsEditing(false);
      })
      .catch(() => {
        setError("Failed to update profile");
      });
  };

  const handlePasswordSubmit = () => {
    const token = localStorage.getItem("token");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match.");
      setSuccessMessage("");
      return;
    }

    axios
      .put("http://localhost:4000/api/users/change-password", passwordData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsPasswordChanging(false);
        setSuccessMessage("✅ Password updated successfully!");
        setError("");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch(() => {
        setError("Failed to update password.");
        setSuccessMessage("");
      });
  };

  if (loading) {
    return <div className="text-center text-gray-500 text-lg">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-orange-400">Your Profile</h1>
        <p className="text-gray-500 mb-4">Manage your account information</p>

        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="mt-5">
          {["firstName", "lastName", "email", "mobile"].map((field) => (
            <div key={field} className="border-l-4 border-orange-400 flex items-center py-2">
              <h2 className="text-lg font-semibold text-gray-700 ps-4">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </h2>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-2 py-1 ml-2"
                />
              ) : (
                <p className="text-gray-900 font-medium ps-2">{user[field]}</p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-4 text-orange-500 cursor-pointer" onClick={() => setIsPasswordChanging((prev) => !prev)}>
          Can you change your password?
        </p>

        {isPasswordChanging && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Change Password</h3>
            <div className="mt-4">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="border border-gray-300 rounded-md px-2 py-1 mb-4 w-full"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="border border-gray-300 rounded-md px-2 py-1 mb-4 w-full"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="border border-gray-300 rounded-md px-2 py-1 mb-4 w-full"
              />
              <button
  onClick={handlePasswordSubmit}
  className="bg-orange-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-500 transition"
>
  Save New Password
</button>

            </div>
          </div>
        )}

        {isEditing ? (
          <button
            onClick={handleSubmit}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-orange-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-500 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
