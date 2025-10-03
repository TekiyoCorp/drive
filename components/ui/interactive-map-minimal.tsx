"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Minimal types for essential functionality only
export interface MinimalMarkerData {
  id?: string | number;
  position: [number, number];
  color?: string;
  popup?: {
    title: string;
    content: string;
  };
  // Accessibility properties
  ariaLabel?: string;
  title?: string;
}

export interface MinimalMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MinimalMarkerData[];
  className?: string;
  style?: React.CSSProperties;
}

// Minimal icon creation - only essential features with accessibility
const createMinimalIcon = (
  color: string = "#4285f4",
  ariaLabel: string = "Map marker",
  title: string = "Interactive map marker"
) => {
  const iconHtml = `
    <div 
      role="button"
      tabindex="0"
      aria-label="${ariaLabel}"
      title="${title}"
      onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}"
      style="
      width: 20px;
      height: 20px;
      background-color: #9ca3af;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 14px;
        height: 14px;
        background-color: ${color};
        border-radius: 50%;
        border: 1px solid #ffffff;
      "></div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: "minimal-marker-icon",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

// Minimal map component with only essential features
const MinimalInteractiveMap: React.FC<MinimalMapProps> = ({
  center = [51.505, -0.09],
  zoom = 13,
  markers = [],
  className = "",
  style = { height: "500px", width: "100%" },
}) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div
        className={`minimal-map ${className}`}
        style={style}
        aria-label="Loading map of DRIVE agency locations"
        role="status"
        aria-live="polite"
      >
        <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-gray-500" aria-hidden="true">
            Loading map...
          </div>
          <span className="sr-only">
            Loading interactive map with agency locations
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`minimal-map ${className}`}
      style={style}
      aria-label="Interactive map showing DRIVE agency locations across France"
      role="application"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
        preferCanvas={true} // Use canvas for better performance
        worldCopyJump={false} // Disable world copy jump for performance
        zoomControl={false} // Minimal controls
        aria-label="Map of DRIVE agency locations"
      >
        {/* Only essential tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          updateWhenIdle={true}
          updateWhenZooming={false}
          keepBuffer={1}
          maxZoom={18}
          minZoom={6}
        />

        {/* Minimal markers with accessibility */}
        {markers.map((marker, index) => {
          const ariaLabel =
            marker.ariaLabel ||
            marker.popup?.title ||
            `Map marker ${index + 1}`;
          const title =
            marker.title || marker.popup?.title || "Interactive map marker";

          return (
            <Marker
              key={marker.id || index}
              position={marker.position}
              icon={createMinimalIcon(
                marker.color || "#4285f4",
                ariaLabel,
                title
              )}
            >
              {marker.popup && (
                <Popup>
                  <div>
                    <h3
                      style={{ margin: 0, fontSize: "14px", fontWeight: "600" }}
                    >
                      {marker.popup.title}
                    </h3>
                    <p style={{ margin: "4px 0 0 0", fontSize: "12px" }}>
                      {marker.popup.content}
                    </p>
                  </div>
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MinimalInteractiveMap;
