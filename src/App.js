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
import Table from "./components/Table";
import SideGraph from "./components/SideGraph";
import { sortData } from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setListData(sortedData);
          setCountries(countries);
        });
    };
    getData();
  }, []);

  const onCountryChange = async (e) => {
    const CountryCode = e.target.value;

    const url =
      CountryCode == "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${CountryCode}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSelectedCountry(CountryCode);
        setCountryInfo(data);
      });
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
          <InfoBox
            title="Coronvirus Cases"
            cases={countryInfo.todayCases}
            num={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            num={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            num={countryInfo.deaths}
          />
        </div>

        <Map />
      </div>

      <Card className="app_rightSide">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={listData} />
          <h3>Worldwise new cases</h3>
          <SideGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
