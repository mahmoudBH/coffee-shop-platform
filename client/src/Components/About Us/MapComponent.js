import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icône personnalisée pour le marqueur
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448590.png", // Lien vers une icône
  iconSize: [38, 38], // Taille de l'icône
});

const MapComponent = () => {
  // Coordonnées du restaurant
  const restaurantLocation = [36.8065, 10.1815]; // Exemple : Tunis, Tunisie

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={restaurantLocation} zoom={15} style={{ height: "100%", width: "100%" }}>
        {/* Couche de tuiles (carte de base) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marqueur avec popup */}
        <Marker position={restaurantLocation} icon={customIcon}>
          <Popup>
            <strong>Restaurant Name</strong>
            <br />
            Address: Example Street, Tunis
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
