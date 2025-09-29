import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polygon,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

// Type definitions
interface MarkerData {
  id?: string | number;
  position: [number, number];
  icon?: L.Icon;
  color?: string;
  size?: "small" | "medium" | "large";
  popup?: {
    title: string;
    content: string;
    image?: string;
  };
}

interface PolygonData {
  id?: string | number;
  positions: [number, number][] | [number, number][][];
  style?: L.PathOptions;
  popup?: string;
}

interface CircleData {
  id?: string | number;
  center: [number, number];
  radius: number;
  style?: L.PathOptions;
  popup?: string;
}

interface PolylineData {
  id?: string | number;
  positions: [number, number][];
  style?: L.PathOptions;
  popup?: string;
}

interface MapLayers {
  openstreetmap: boolean;
  satellite: boolean;
  dark: boolean;
  traffic: boolean;
}

interface SearchResult {
  latLng: [number, number];
  name: string;
}

interface AdvancedMapProps {
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
  enableDrawing?: boolean;
  mapLayers?: MapLayers;
  className?: string;
  style?: React.CSSProperties;
}

interface MapEventsProps {
  onMapClick?: (latlng: L.LatLng) => void;
  onLocationFound?: (latlng: [number, number]) => void;
}

interface CustomControlsProps {
  onLocate: () => void;
  onToggleLayer: (layerType: keyof MapLayers) => void;
  layers: MapLayers;
}

interface SearchControlProps {
  onSearch?: (result: SearchResult) => void;
}

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons
const createCustomIcon = (
  color: string = "blue",
  size: "small" | "medium" | "large" = "medium",
  title: string = "Map marker"
): L.Icon => {
  const sizes: Record<"small" | "medium" | "large", [number, number]> = {
    small: [20, 32],
    medium: [25, 41],
    large: [30, 50],
  };

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: sizes[size],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    // Add accessibility
    alt: title,
  } as any);
};

// Custom dot marker for modern look
const createDotIcon = (
  size: "small" | "medium" | "large" = "medium",
  title: string = "Map marker"
): L.DivIcon => {
  const sizes: Record<"small" | "medium" | "large", number> = {
    small: 12,
    medium: 16,
    large: 20,
  };

  const dotSize = sizes[size];

  return new L.DivIcon({
    className: "custom-dot-marker",
    html: `
      <div 
        role="button" 
        tabindex="0" 
        aria-label="${title}"
        title="${title}"
        onkeydown="if(event.key==='Enter'||event.key===' '){event.target.click();event.preventDefault();}"
        style="
          width: ${dotSize}px;
          height: ${dotSize}px;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(255, 255, 255, 1);
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          position: relative;
          cursor: pointer;
        "
      >
        <div style="
          width: ${dotSize * 0.4}px;
          height: ${dotSize * 0.4}px;
          background: rgba(139, 92, 246, 0.8);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        "></div>
      </div>
    `,
    iconSize: [dotSize, dotSize],
    iconAnchor: [dotSize / 2, dotSize / 2],
    popupAnchor: [0, -(dotSize / 2)],
  });
};

// Map event handler component
const MapEvents: React.FC<MapEventsProps> = ({
  onMapClick,
  onLocationFound,
}) => {
  const map = useMapEvents({
    click: (e: L.LeafletMouseEvent) => {
      onMapClick && onMapClick(e.latlng);
    },
    locationfound: (e: L.LocationEvent) => {
      const latlng: [number, number] = [e.latlng.lat, e.latlng.lng];
      onLocationFound && onLocationFound(latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
};

// Custom control component
const CustomControls: React.FC<CustomControlsProps> = ({
  onLocate,
  onToggleLayer,
  layers,
}) => {
  const map = useMap();

  useEffect(() => {
    const control = new L.Control({ position: "topright" });

    control.onAdd = () => {
      const div = L.DomUtil.create("div", "custom-controls");
      div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
          <button id="locate-btn" aria-label="Locate my position on map" style="margin: 2px; padding: 8px; border: none; border-radius: 3px; cursor: pointer;">📍 Locate Me</button>
          <button id="satellite-btn" aria-label="Toggle satellite view" style="margin: 2px; padding: 8px; border: none; border-radius: 3px; cursor: pointer;">🛰️ Satellite</button>
          <button id="traffic-btn" aria-label="Toggle traffic overlay" style="margin: 2px; padding: 8px; border: none; border-radius: 3px; cursor: pointer;">🚦 Traffic</button>
        </div>
      `;

      L.DomEvent.disableClickPropagation(div);

      const locateBtn = div.querySelector("#locate-btn") as HTMLButtonElement;
      const satelliteBtn = div.querySelector(
        "#satellite-btn"
      ) as HTMLButtonElement;
      const trafficBtn = div.querySelector("#traffic-btn") as HTMLButtonElement;

      if (locateBtn) locateBtn.onclick = () => onLocate();
      if (satelliteBtn) satelliteBtn.onclick = () => onToggleLayer("satellite");
      if (trafficBtn) trafficBtn.onclick = () => onToggleLayer("traffic");

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
        onSearch && onSearch({ latLng, name: display_name });
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    const control = new L.Control({ position: "topleft" });

    control.onAdd = () => {
      const div = L.DomUtil.create("div", "search-control");
      div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: flex; gap: 5px;">
          <input 
            id="search-input" 
            type="text" 
            placeholder="Search places..." 
            aria-label="Search places on map"
            style="padding: 8px; border: 1px solid #ddd; border-radius: 3px; width: 200px;"
          />
          <button 
            id="search-btn" 
            aria-label="Search map location"
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
        input.addEventListener("input", (e: Event) => {
          const target = e.target as HTMLInputElement;
          setQuery(target.value);
        });
        input.addEventListener("keypress", (e: KeyboardEvent) => {
          if (e.key === "Enter") handleSearch();
        });
      }

      if (button) {
        button.addEventListener("click", handleSearch);
      }

      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map]);

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
  enableDrawing = false,
  mapLayers = {
    openstreetmap: true,
    satellite: false,
    dark: false,
    traffic: false,
  },
  className = "",
  style = { height: "500px", width: "100%" },
}) => {
  const [currentLayers, setCurrentLayers] = useState<MapLayers>(mapLayers);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [clickedLocation, setClickedLocation] = useState<L.LatLng | null>(null);

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
      onMapClick && onMapClick(latlng);
    },
    [onMapClick]
  );

  // Handle search results
  const handleSearch = useCallback((result: SearchResult) => {
    setSearchResult(result);
  }, []);

  // Handle location found
  const handleLocationFound = useCallback((latlng: [number, number]) => {
    setUserLocation(latlng);
  }, []);

  return (
    <div className={`advanced-map ${className}`} style={style}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        {/* Base tile layers */}
        {currentLayers?.openstreetmap && (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        {currentLayers?.satellite && (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        {currentLayers?.dark && (
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
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
            layers={currentLayers}
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
                  createDotIcon(
                    marker.size,
                    marker.popup?.title || `Location marker ${index + 1}`
                  )
                }
                eventHandlers={{
                  click: () => onMarkerClick && onMarkerClick(marker),
                }}
              >
                {marker.popup && (
                  <Popup>
                    <div>
                      <h3>{marker.popup.title}</h3>
                      <p>{marker.popup.content}</p>
                      {marker.popup.image && (
                        <img
                          src={marker.popup.image}
                          alt={marker.popup.title}
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
                createDotIcon(
                  marker.size,
                  marker.popup?.title || `Location marker ${index + 1}`
                )
              }
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(marker),
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
            icon={createCustomIcon("red", "medium", "Your current location")}
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
              `Search result: ${searchResult.name}`
            )}
          >
            <Popup>{searchResult.name}</Popup>
          </Marker>
        )}

        {/* Clicked location marker */}
        {clickedLocation && (
          <Marker
            position={[clickedLocation.lat, clickedLocation.lng]}
            icon={createCustomIcon("orange", "small", "Clicked location")}
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

// Default export
export default AdvancedMap;

// Additional utility exports
export { createCustomIcon, createDotIcon };
export type {
  AdvancedMapProps,
  MarkerData,
  PolygonData,
  CircleData,
  PolylineData,
  MapLayers,
  SearchResult,
};
