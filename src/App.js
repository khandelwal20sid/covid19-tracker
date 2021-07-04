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
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [listData, setListData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

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
          setMapCountries(data);
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
        CountryCode === "worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
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
            isRed
            active={casesType == "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronvirus Cases"
            cases={countryInfo.todayCases}
            num={countryInfo.cases}
          />
          <InfoBox
            active={casesType == "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            num={countryInfo.recovered}
          />
          <InfoBox
            isRed
            active={casesType == "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            num={countryInfo.deaths}
          />
        </div>

        <marquee className="marquee">
          <h4>
            Wear a mask | Stay 6 feet away from others | Get Vaccinated | Avoid
            crowds and poorly ventilated spaces | Wash your hands often | Clean
            and disinfect | Monitor your health daily | Stay Safe | --Siddharth Khandelwal
          </h4>
        </marquee>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app_rightSide">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={listData} />
          <h3 className="sideGraph_title">Worldwise new {casesType}</h3>
          <SideGraph className="app_graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
