import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./WorldMap.css";
import markerIcon from "../../assets/Marker.png"; // Ensure correct path
import logo from "../../assets/logo.png"; 

const markers = [
  { lat: 41.9028, lng: 12.4964, city: "Rome", country: "Italy" },
  { lat: 45.4642, lng: 9.1900, city: "Milan", country: "Italy" },
  { lat: 40.8518, lng: 14.2681, city: "Naples", country: "Italy" },
  { lat: 48.8566, lng: 2.3522, city: "Paris", country: "France" },
  { lat: 45.7640, lng: 4.8357, city: "Lyon", country: "France" },
  { lat: 43.2965, lng: 5.3698, city: "Marseille", country: "France" },
  { lat: 52.52, lng: 13.405, city: "Berlin", country: "Germany" },
  { lat: 48.1351, lng: 11.5820, city: "Munich", country: "Germany" },
  { lat: 50.1109, lng: 8.6821, city: "Frankfurt", country: "Germany" },
  { lat: 35.6895, lng: 139.6917, city: "Tokyo", country: "Japan" },
  { lat: 34.6937, lng: 135.5023, city: "Osaka", country: "Japan" },
  { lat: 35.0116, lng: 135.7681, city: "Kyoto", country: "Japan" },
  { lat: 37.5665, lng: 126.978, city: "Seoul", country: "South Korea" },
  { lat: 35.1796, lng: 129.0756, city: "Busan", country: "South Korea" },
  { lat: 36.3504, lng: 127.3845, city: "Daejeon", country: "South Korea" },
  { lat: 28.6139, lng: 77.2090, city: "Delhi", country: "India" },
  { lat: 19.0760, lng: 72.8777, city: "Mumbai", country: "India" },
  { lat: 12.9716, lng: 77.5946, city: "Bangalore", country: "India" },
  { lat: 39.9042, lng: 116.4074, city: "Beijing", country: "China" },
  { lat: 31.2304, lng: 121.4737, city: "Shanghai", country: "China" },
  { lat: 23.1291, lng: 113.2644, city: "Guangzhou", country: "China" },
  { lat: 45.4215, lng: -75.6972, city: "Ottawa", country: "Canada" },
  { lat: 43.6532, lng: -79.3832, city: "Toronto", country: "Canada" },
  { lat: 49.2827, lng: -123.1207, city: "Vancouver", country: "Canada" },
  { lat: -23.5505, lng: -46.6333, city: "São Paulo", country: "Brazil" },
  { lat: -22.9068, lng: -43.1729, city: "Rio de Janeiro", country: "Brazil" },
  { lat: -15.8267, lng: -47.9218, city: "Brasilia", country: "Brazil" },
];

// Property Names
const propertyNames = [
  "Sunset Villas", "Grand Horizon Suites", "Lakeside Residence",
  "Oceanview Penthouse", "Golden Gate Estates", "Maplewood Manor",
  "Emerald Heights", "Skyline Towers", "Crystal Bay Homes",
  "Aurora Apartments", "Harborfront Lofts", "Imperial Plaza"
];

const getRandomPropertyName = () => {
  return propertyNames[Math.floor(Math.random() * propertyNames.length)];
};

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [50, 70],
  iconAnchor: [25, 70],
  popupAnchor: [0, -65],
});

// Custom Zoom Controls
const CustomZoomControl = () => {
  const map = useMap();

  useEffect(() => {
    map.zoomControl.remove(); // Hide default zoom controls
  }, [map]);

  return (
    <div className="custom-zoom-controls">
      <button className="zoom-btn" onClick={() => map.zoomIn()}>+</button>
      <button className="zoom-btn" onClick={() => map.zoomOut()}>−</button>
    </div>
  );
};

const WorldMap = () => {
  return (
    <div className="map-container">
      <div className="map-overlay">
        <img src={logo} alt="Propertia Logo" />
        <span>PROPERTIA</span>
      </div>

      <MapContainer center={[20, 0]} zoom={2} className="map">
        {/* Apply USGS Satellite Imagery */}
        <TileLayer
          url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"
          attribution=""
        />

        {/* Place Multiple City Markers */}
        {markers.map((marker, index) => {
          const propertyName = getRandomPropertyName();
          return (
            <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
              <Popup>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "18px", fontWeight: "bold", margin: "5px 0" }}>
                    {propertyName}
                  </p>
                  <p style={{ fontSize: "14px", fontStyle: "italic", margin: "0" }}>
                    {marker.city}, {marker.country}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Custom Zoom Control */}
        <CustomZoomControl />
      </MapContainer>

      {/* Legend */}
      <div className="map-legend">
        <p><strong>Number of Properties:</strong> <span>{markers.length}</span></p>
      </div>
    </div>
  );
};

export default WorldMap;