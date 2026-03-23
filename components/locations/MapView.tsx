"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import Link from "next/link";
import { Location } from "@/lib/types";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default marker icon in Next.js
const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Props {
  locations: Location[];
}

export default function MapView({ locations }: Props) {
  useEffect(() => {
    // Ensure Leaflet CSS is applied correctly
  }, []);

  const center: [number, number] = [39.5, -98.35];

  return (
    <div className="rounded-xl overflow-hidden border border-white/10" style={{ height: "600px" }}>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div style={{ minWidth: "180px" }}>
                <p style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}>
                  {location.name}
                </p>
                <p style={{ color: "#666", fontSize: "12px", marginBottom: "8px" }}>
                  {location.city}, {location.state}
                </p>
                <p style={{ fontSize: "12px", marginBottom: "8px", color: "#444" }}>
                  {location.address}
                </p>
                <Link
                  href={`/locations/${location.id}`}
                  style={{
                    color: "#c4933f",
                    fontWeight: "600",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  View details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
