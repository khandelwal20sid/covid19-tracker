import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
// import { showDataOnMap } from "../util";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer
        className="markercluster-map"
        center={[51.0, 19.0]}
        zoom={4}
        maxZoom={18}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {showDataOnMap(countries, casesType)} */}
      </MapContainer>
    </div>
  );
}

export default Map;
