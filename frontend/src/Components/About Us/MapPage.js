import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Assurez-vous d'importer le CSS de Leaflet
import './App.css'; // Pour un style personnalisé

const MapPage = () => {
  // Utilisation de useRef pour éviter de réinitialiser la carte
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Assurez-vous que la carte n'est initialisée qu'une seule fois
    if (mapContainerRef.current && !mapContainerRef.current._leaflet_id) {
      // Initialisation de la carte
      const map = L.map(mapContainerRef.current).setView([36.8401, 10.2315], 13);

      // Ajouter la couche des tuiles (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      // Définir un marqueur rouge moderne
      const redIcon = new L.Icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Map_marker_icon_red.svg', // Icône rouge
        iconSize: [35, 35], // Taille de l'icône
        iconAnchor: [17, 35], // Ancrage de l'icône
        popupAnchor: [0, -30], // Ancrage du popup
      });

      // Ajouter un marqueur avec un popup
      L.marker([36.8401, 10.2315], { icon: redIcon })
        .addTo(map)
        .bindPopup('<strong>Zone Lac 1</strong><p>Un endroit central et bien connu pour les visiteurs.</p>');

      // Nettoyage lors du démontage du composant
      return () => {
        map.remove(); // Supprimer la carte lorsque le composant est démonté
      };
    }
  }, []); // Le tableau vide [] signifie que l'effet sera exécuté une seule fois

  return (
    <div className="map-container">
      <h1 className="map-title">Carte Modernisée - Lac 1</h1>
      {/* Style modifié ici pour augmenter la taille */}
      <div ref={mapContainerRef} style={{ height: '80vh', width: '90%' }} />
    </div>
  );
};

export default MapPage;
