import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Commandes from "./components/pages/orders";
import Stock from "./components/pages/Stock";
import StockManager from "./components/pages/StockManager";
import Event from "./components/pages/Event";
import Table from "./components/pages/Table"; // Importer le composant Table
import MenuPage from "./components/pages/MenuPage";
import Pack from "./components/pages/Pack";
import PackList from "./components/pages/Packlist";
import UserListAdmin from "./components/pages/UserListAdmin";
import Reservations from "./components/pages/Reservations";

import PrivateRoute from "./context/PrivateRoute";
import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "./context/ThemeProvider";

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          {/* Rediriger vers /login par défaut */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* Zone protégée par authentification */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="home" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="stock" element={<Stock />} />
            <Route path="/stock/stock-manager" element={<StockManager />} />
            <Route path="evenements" element={<Event />} />
            <Route path="tables" element={<Table />} />
            <Route path="commandes" element={<Commandes />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="pack" element={<Pack />} />
            <Route path="packlist" element={<PackList />} />
            <Route path="clients" element={<UserListAdmin />} />
            <Route path="reservations" element={<Reservations />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

// importation de limage dans le page menu






export default App;