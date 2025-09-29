"use client";

import { AdvancedMapWrapper } from "../ui/interactive-map-wrapper";

const MapTest = () => {
  return (
    <div className="w-full h-96">
      <AdvancedMapWrapper
        center={[48.8566, 2.3522]}
        zoom={10}
        markers={[]}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export default MapTest;
