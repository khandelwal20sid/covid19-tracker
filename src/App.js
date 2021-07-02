import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");

  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getData();
  }, []);

  const onCountryChange = (e) => {
    const CountryCode = e.target.value;
    setSelectedCountry(CountryCode);
  };

  return (
    <div className="app">
      <div className="app_leftSide">
        {/* header */}
        <div className="app_header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={selectedCountry}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox title="Coronvirus Cases" cases={1200} num={2000} />
          <InfoBox title="Recovered" cases={1200} num={2000} />
          <InfoBox title="Deaths" cases={1200} num={2000} />
        </div>

        <Map />
      </div>

      <Card className="app_rightSide">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* table */}
          <h3>Worldwise new cases</h3>
          {/* graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
