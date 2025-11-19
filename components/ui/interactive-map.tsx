import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/map-markers.css";
import Image from "next/image";
import React, { useCallback, useEffect, useState, startTransition } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// Fix for Leaflet default icon issue - disable default icon loading
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })
  ._getIconUrl;

// Custom CSS-based icon creation - Pure CSS div markers only
export const createCustomIcon = (
  color: string = "#4285f4",
  size: "small" | "medium" | "large" = "medium",
  pulse: boolean = false,
  accessibilityLabel?: string,
  title?: string
) => {
  const sizes = {
    small: { outerWidth: 16, innerWidth: 10 },
    medium: { outerWidth: 20, innerWidth: 14 },
    large: { outerWidth: 24, innerWidth: 18 },
  };

  const iconSize = sizes[size];
  const pulseClass = pulse ? " pulse" : "";

  // Default accessibility label if none provided
  const defaultLabel = accessibilityLabel || `Map marker at location`;
  const defaultTitle = title || `Interactive map marker`;

  // Create pure CSS div-based marker with outer ring and inner dot
  const iconHtml = `
    <div class="custom-dot-marker${pulseClass}" 
         role="button"
         tabindex="0"
         aria-label="${defaultLabel}"
         title="${defaultTitle}"
         onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}"
         style="
      width: ${iconSize.outerWidth}px;
      height: ${iconSize.outerWidth}px;
      background-color: #9ca3af;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: ${iconSize.innerWidth}px;
        height: ${iconSize.innerWidth}px;
        background-color: ${color};
        border-radius: 50%;
        border: 1px solid #ffffff;
      "></div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: "custom-marker-icon",
    iconSize: [iconSize.outerWidth + 8, iconSize.outerWidth + 8], // Extra space for border and shadow
    iconAnchor: [(iconSize.outerWidth + 8) / 2, (iconSize.outerWidth + 8) / 2],
    popupAnchor: [0, -(iconSize.outerWidth + 8) / 2],
  });
};

// Create a default blue dot icon for cases where no icon is specified
export const createDefaultIcon = () =>
  createCustomIcon(
    "#4285f4",
    "medium",
    false,
    "Default map marker",
    "Interactive map marker"
  );

// Create a pulsing marker for special attention
export const createPulsingIcon = (
  color: string = "red",
  size: "small" | "medium" | "large" = "large",
  accessibilityLabel?: string
) =>
  createCustomIcon(
    color,
    size,
    true,
    accessibilityLabel || "Important map marker",
    "Pulsing map marker"
  );

// Type definitions
export interface MarkerData {
  id?: string | number;
  position: [number, number];
  icon?: L.Icon | L.DivIcon;
  color?: string;
  size?: "small" | "medium" | "large";
  popup?: {
    title: string;
    content: string;
    image?: string;
  };
  // Accessibility properties
  ariaLabel?: string;
  title?: string;
  description?: string;
}

export interface PolygonData {
  id?: string | number;
  positions: [number, number][];
  style?: L.PathOptions;
  popup?: string;
}

export interface CircleData {
  id?: string | number;
  center: [number, number];
  radius: number;
  style?: L.PathOptions;
  popup?: string;
}

export interface PolylineData {
  id?: string | number;
  positions: [number, number][];
  style?: L.PathOptions;
  popup?: string;
}

export interface MapLayers {
  openstreetmap: boolean;
  satellite: boolean;
  traffic: boolean;
}

export interface SearchResult {
  latLng: [number, number];
  name: string;
}

interface MapEventsProps {
  onMapClick?: (latlng: L.LatLng) => void;
  onLocationFound?: (latlng: [number, number]) => void;
}

interface CustomControlsProps {
  onLocate: () => void;
  onToggleLayer: (layerType: keyof MapLayers) => void;
}

interface SearchControlProps {
  onSearch?: (result: SearchResult) => void;
}

export interface AdvancedMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  polygons?: PolygonData[];
  circles?: CircleData[];
  polylines?: PolylineData[];
  onMarkerClick?: (marker: MarkerData) => void;
  onMapClick?: (latlng: L.LatLng) => void;
  enableClustering?: boolean;
  enableSearch?: boolean;
  enableControls?: boolean;
  mapLayers?: MapLayers;
  className?: string;
  style?: React.CSSProperties;
}

// Map event handler component
const MapEvents: React.FC<MapEventsProps> = ({
  onMapClick,
  onLocationFound,
}) => {
  const map = useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng);
      }
    },
    locationfound: (e) => {
      const location: [number, number] = [e.latlng.lat, e.latlng.lng];
      if (onLocationFound) {
        onLocationFound(location);
      }
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
};

// Custom control component
const CustomControls: React.FC<CustomControlsProps> = ({
  onLocate,
  onToggleLayer,
}) => {
  const map = useMap();

  useEffect(() => {
    const control = new L.Control({ position: "topright" });

    control.onAdd = () => {
      const div = L.DomUtil.create("div", "custom-controls");
      div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
          <button id="locate-btn" aria-label="Find my current location on map" title="Locate Me" style="margin: 2px; padding: 8px; border: none; border-radius: 3px; cursor: pointer;">📍 Locate Me</button>
          <button id="satellite-btn" aria-label="Toggle satellite view" title="Toggle Satellite View" style="margin: 2px; padding: 8px; border: none; border-radius: 3px; cursor: pointer;">🛰️ Satellite</button>
          <button id="traffic-btn" aria-label="Toggle traffic information" title="Toggle Traffic" style="margin: 2px; padding: 8px; border: none; border-radius: 3px; cursor: pointer;">🚦 Traffic</button>
        </div>
      `;

      L.DomEvent.disableClickPropagation(div);

      const locateBtn = div.querySelector("#locate-btn") as HTMLButtonElement;
      const satelliteBtn = div.querySelector(
        "#satellite-btn"
      ) as HTMLButtonElement;
      const trafficBtn = div.querySelector("#traffic-btn") as HTMLButtonElement;

      if (locateBtn) {
        locateBtn.onclick = () => onLocate();
      }
      if (satelliteBtn) {
        satelliteBtn.onclick = () => onToggleLayer("satellite");
      }
      if (trafficBtn) {
        trafficBtn.onclick = () => onToggleLayer("traffic");
      }

      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, onLocate, onToggleLayer]);

  return null;
};

// Search component
const SearchControl: React.FC<SearchControlProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const map = useMap();

  useEffect(() => {
    const handleSearch = async () => {
      if (!query.trim()) return;

      try {
        // Using Nominatim API for geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}`
        );
        const results = await response.json();

        if (results.length > 0) {
          const { lat, lon, display_name } = results[0];
          const latLng: [number, number] = [parseFloat(lat), parseFloat(lon)];
          map.flyTo(latLng, 13);
          if (onSearch) {
            onSearch({ latLng, name: display_name });
          }
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const control = new L.Control({ position: "topleft" });

    control.onAdd = () => {
      const div = L.DomUtil.create("div", "search-control");
      div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: flex; gap: 5px;">
          <input 
            id="search-input" 
            type="text" 
            placeholder="Search places..." 
            aria-label="Search for places on the map"
            style="padding: 8px; border: 1px solid #ddd; border-radius: 3px; width: 200px;"
          />
          <button 
            id="search-btn" 
            aria-label="Search for location"
            title="Search"
            style="padding: 8px 12px; border: none; border-radius: 3px; cursor: pointer; background: #007bff; color: white;"
          >
            🔍
          </button>
        </div>
      `;

      L.DomEvent.disableClickPropagation(div);

      const input = div.querySelector("#search-input") as HTMLInputElement;
      const button = div.querySelector("#search-btn") as HTMLButtonElement;

      if (input) {
        input.addEventListener("input", (e) => {
          const target = e.target as HTMLInputElement;
          if (target) {
            setQuery(target.value);
          }
        });
        input.addEventListener("keypress", (e) => {
          const keyboardEvent = e as KeyboardEvent;
          if (keyboardEvent.key === "Enter") void handleSearch();
        });
      }

      if (button) {
        button.addEventListener("click", () => void handleSearch());
      }

      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, query, onSearch]);

  return null;
};

// Main AdvancedMap component
export const AdvancedMap: React.FC<AdvancedMapProps> = ({
  center = [51.505, -0.09],
  zoom = 13,
  markers = [],
  polygons = [],
  circles = [],
  polylines = [],
  onMarkerClick,
  onMapClick,
  enableClustering = true,
  enableSearch = true,
  enableControls = true,
  mapLayers = {
    openstreetmap: true,
    satellite: false,
    traffic: false,
  },
  className = "",
  style = { height: "500px", width: "100%" },
}) => {
  const [isClient, setIsClient] = useState(false);
  const [currentLayers, setCurrentLayers] = useState<MapLayers>(mapLayers);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [clickedLocation, setClickedLocation] = useState<L.LatLng | null>(null);

  // Ensure component only renders on client side
  useEffect(() => {
    startTransition(() => {
      setIsClient(true);
    });
  }, []);

  // Handle layer toggling
  const handleToggleLayer = useCallback((layerType: keyof MapLayers) => {
    setCurrentLayers((prev) => ({
      ...prev,
      [layerType]: !prev[layerType],
    }));
  }, []);

  // Handle geolocation
  const handleLocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  // Handle map click
  const handleMapClick = useCallback(
    (latlng: L.LatLng) => {
      setClickedLocation(latlng);
      if (onMapClick) {
        onMapClick(latlng);
      }
    },
    [onMapClick]
  );

  // Handle search results
  const handleSearch = useCallback((result: SearchResult) => {
    setSearchResult(result);
  }, []);

  // Handle location found
  const handleLocationFound = useCallback((location: [number, number]) => {
    setUserLocation(location);
  }, []);

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div
        className={`advanced-map ${className}`}
        style={style}
        aria-label="Loading interactive map"
      >
        <div className="h-full w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`advanced-map ${className}`}
      style={style}
      aria-label="Interactive map showing agency locations"
      role="application"
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        {/* Base tile layers */}
        {currentLayers.openstreetmap && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {currentLayers.satellite && (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        {/* Map events */}
        <MapEvents
          onMapClick={handleMapClick}
          onLocationFound={handleLocationFound}
        />

        {/* Search control */}
        {enableSearch && <SearchControl onSearch={handleSearch} />}

        {/* Custom controls */}
        {enableControls && (
          <CustomControls
            onLocate={handleLocate}
            onToggleLayer={handleToggleLayer}
          />
        )}

        {/* Markers with clustering */}
        {enableClustering ? (
          <MarkerClusterGroup>
            {markers.map((marker, index) => (
              <Marker
                key={marker.id || index}
                position={marker.position}
                icon={
                  marker.icon ||
                  createCustomIcon(
                    marker.color || "#4285f4",
                    marker.size || "medium",
                    false,
                    marker.ariaLabel ||
                      marker.popup?.title ||
                      `Map marker ${index + 1}`,
                    marker.title ||
                      marker.popup?.title ||
                      `Interactive map marker`
                  )
                }
                eventHandlers={{
                  click: () => {
                    if (onMarkerClick) {
                      onMarkerClick(marker);
                    }
                  },
                }}
              >
                {marker.popup && (
                  <Popup>
                    <div>
                      <h3>{marker.popup.title}</h3>
                      <p>{marker.popup.content}</p>
                      {marker.popup.image && (
                        <Image
                          src={marker.popup.image}
                          alt={marker.popup.title}
                          width={200}
                          height={150}
                          style={{ maxWidth: "200px", height: "auto" }}
                        />
                      )}
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MarkerClusterGroup>
        ) : (
          markers.map((marker, index) => (
            <Marker
              key={marker.id || index}
              position={marker.position}
              icon={
                marker.icon ||
                createCustomIcon(
                  marker.color || "#4285f4",
                  marker.size || "medium",
                  false,
                  marker.ariaLabel ||
                    marker.popup?.title ||
                    `Map marker ${index + 1}`,
                  marker.title ||
                    marker.popup?.title ||
                    `Interactive map marker`
                )
              }
              eventHandlers={{
                click: () => {
                  if (onMarkerClick) {
                    onMarkerClick(marker);
                  }
                },
              }}
            >
              {marker.popup && (
                <Popup>
                  <div>
                    <h3>{marker.popup.title}</h3>
                    <p>{marker.popup.content}</p>
                  </div>
                </Popup>
              )}
            </Marker>
          ))
        )}

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={createCustomIcon(
              "red",
              "medium",
              false,
              "Your current location",
              "Your current location marker"
            )}
          >
            <Popup>Your current location</Popup>
          </Marker>
        )}

        {/* Search result marker */}
        {searchResult && (
          <Marker
            position={searchResult.latLng}
            icon={createCustomIcon(
              "green",
              "large",
              false,
              `Search result: ${searchResult.name}`,
              `Search result marker for ${searchResult.name}`
            )}
          >
            <Popup>{searchResult.name}</Popup>
          </Marker>
        )}

        {/* Clicked location marker */}
        {clickedLocation && (
          <Marker
            position={[clickedLocation.lat, clickedLocation.lng]}
            icon={createCustomIcon(
              "orange",
              "small",
              false,
              `Clicked location at ${clickedLocation.lat.toFixed(
                4
              )}, ${clickedLocation.lng.toFixed(4)}`,
              "Clicked location marker"
            )}
          >
            <Popup>
              Lat: {clickedLocation.lat.toFixed(6)}
              <br />
              Lng: {clickedLocation.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}

        {/* Polygons */}
        {polygons.map((polygon, index) => (
          <Polygon
            key={polygon.id || index}
            positions={polygon.positions}
            pathOptions={
              polygon.style || { color: "purple", weight: 2, fillOpacity: 0.3 }
            }
          >
            {polygon.popup && <Popup>{polygon.popup}</Popup>}
          </Polygon>
        ))}

        {/* Circles */}
        {circles.map((circle, index) => (
          <Circle
            key={circle.id || index}
            center={circle.center}
            radius={circle.radius}
            pathOptions={
              circle.style || { color: "blue", weight: 2, fillOpacity: 0.2 }
            }
          >
            {circle.popup && <Popup>{circle.popup}</Popup>}
          </Circle>
        ))}

        {/* Polylines */}
        {polylines.map((polyline, index) => (
          <Polyline
            key={polyline.id || index}
            positions={polyline.positions}
            pathOptions={polyline.style || { color: "red", weight: 3 }}
          >
            {polyline.popup && <Popup>{polyline.popup}</Popup>}
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
};
