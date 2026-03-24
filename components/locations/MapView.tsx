"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import Link from "next/link";
import { Location } from "@/lib/types";
import "leaflet/dist/leaflet.css";

function makePin(color: string): DivIcon {
  return new DivIcon({
    className: "",
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z" fill="${color}" stroke="white" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="5" fill="white" opacity="0.9"/>
    </svg>`,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -38],
  });
}

const basicPin = makePin("#6BBF70");
const plusPin = makePin("#9CA3AF");

interface Props {
  locations: Location[];
}

export default function MapView({ locations }: Props) {
  const center: [number, number] = [39.5, -98.35];

  return (
    <div className="rounded-xl overflow-hidden border border-ww-border" style={{ height: "600px" }}>
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
            icon={location.tier === "all-access-basic" ? basicPin : plusPin}
          >
            <Popup>
              {location.tier === "all-access-basic" ? (
                <div style={{ minWidth: "180px" }}>
                  <p style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}>
                    {location.name}
                  </p>
                  <p style={{ color: "#6b6b6b", fontSize: "12px", marginBottom: "8px" }}>
                    {location.city}, {location.state}
                  </p>
                  <p style={{ fontSize: "11px", marginBottom: "8px", color: "#6BBF70", fontWeight: "600" }}>
                    ✓ Included in All Access Basic
                  </p>
                  <Link
                    href={`/locations/${location.id}`}
                    style={{ color: "#6BBF70", fontWeight: "600", fontSize: "12px", textDecoration: "none" }}
                  >
                    View details →
                  </Link>
                </div>
              ) : (
                <div style={{ minWidth: "180px" }}>
                  <p style={{ fontWeight: "bold", marginBottom: "4px", fontSize: "14px" }}>
                    {location.name}
                  </p>
                  <p style={{ color: "#6b6b6b", fontSize: "12px", marginBottom: "8px" }}>
                    {location.city}, {location.state}
                  </p>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: "600" }}>
                    All Access Plus only
                  </p>
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          right: "12px",
          background: "white",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "12px",
          zIndex: 1000,
          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#6BBF70", display: "inline-block" }} />
          <span style={{ color: "#1a1a1a" }}>All Access Basic</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#9CA3AF", display: "inline-block" }} />
          <span style={{ color: "#6b6b6b" }}>All Access Plus only</span>
        </div>
      </div>
    </div>
  );
}
