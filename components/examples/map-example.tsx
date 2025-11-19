import {
  AdvancedMap,
  createCustomIcon,
  createPulsingIcon,
  type MarkerData,
} from "../ui/interactive-map";

// Example usage of the AdvancedMap component with pure CSS div markers
export default function MapExample() {
  // Sample markers with different colors and sizes - all pure CSS
  const sampleMarkers: MarkerData[] = [
    {
      id: 1,
      position: [51.505, -0.09],
      color: "black",
      size: "medium",
      popup: {
        title: "Default Black Dot",
        content: "This is a pure CSS black dot marker (default style)",
      },
    },
    {
      id: 2,
      position: [51.51, -0.1],
      color: "red",
      size: "large",
      popup: {
        title: "Red Marker",
        content: "This is a large red CSS marker",
      },
    },
    {
      id: 3,
      position: [51.515, -0.08],
      color: "blue",
      size: "small",
      popup: {
        title: "Blue Marker",
        content: "This is a small blue CSS marker",
      },
    },
    {
      id: 4,
      position: [51.52, -0.07],
      color: "green",
      size: "medium",
      popup: {
        title: "Green Marker",
        content: "This is a green CSS marker",
      },
    },
    {
      id: 5,
      position: [51.525, -0.06],
      // No color/size specified - will use default black dot
      popup: {
        title: "Default Marker",
        content: "This marker uses the default black CSS dot",
      },
    },
    {
      id: 6,
      position: [51.53, -0.05],
      icon: createPulsingIcon("orange", "large"), // Pulsing marker for attention
      popup: {
        title: "Pulsing Marker",
        content: "This is a pulsing orange marker for special attention",
      },
    },
  ];

  const handleMarkerClick = (marker: MarkerData) => {
    console.log("Marker clicked:", marker);
  };

  const handleMapClick = (latlng: L.LatLng) => {
    console.log("Map clicked at:", latlng);
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <AdvancedMap
        center={[51.505, -0.09]}
        zoom={13}
        markers={sampleMarkers}
        onMarkerClick={handleMarkerClick}
        onMapClick={handleMapClick}
        enableClustering={true}
        enableSearch={true}
        enableControls={true}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

// Pure CSS marker creation functions - no images needed
export const createBlackDotIcon = () => createCustomIcon("black", "medium");
export const createRedDotIcon = () => createCustomIcon("red", "large");
export const createBlueDotIcon = () => createCustomIcon("blue", "small");
export const createGreenDotIcon = () => createCustomIcon("green", "medium");
export const createPurpleDotIcon = () => createCustomIcon("purple", "medium");
export const createYellowDotIcon = () => createCustomIcon("yellow", "medium");

// Pulsing markers for special attention
export const createPulsingRedIcon = () => createPulsingIcon("red", "large");
export const createPulsingBlueIcon = () => createPulsingIcon("blue", "medium");
