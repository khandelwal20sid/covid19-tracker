import React from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  useMap,
  Circle,
  Popup,
} from "react-leaflet";
import "./Map.css";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 80,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 120,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 200,
  },
};

function Map({ countries, casesType, center, zoom }) {
  console.log(countries, "MapLoc");

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords);
    return null;
  }

  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetViewOnClick coords={center} />
        {countries.map((country) => {
          return (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              color={casesTypeColors[casesType].hex}
              fillColor={casesTypeColors[casesType].hex}
              fillOpacity={0.4}
              radius={
                Math.sqrt(country[casesType]) *
                casesTypeColors[casesType].multiplier
              }
            >
              <Popup>
                <div className="info-container">
                  <div
                    className="info-flag"
                    style={{
                      backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                  ></div>
                  <div className="info-name">{country.country}</div>
                  <div className="info-confirmed">
                    Cases: {country.cases}
                  </div>
                  <div className="info-recovered">
                    Recovered: {country.recovered}
                  </div>
                  <div className="info-deaths">
                    Deaths: {country.deaths}
                  </div>
                </div>
              </Popup>
            </Circle>
          );
        })}
      </LeafletMap>
    </div>
  );
}

export default Map;
