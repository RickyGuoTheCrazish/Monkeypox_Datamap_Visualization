import React, { useEffect, useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";
import { csv } from "d3-fetch";
import { scaleLinear,scaleSqrt,scaleLog } from "d3-scale";
import sortBy from "lodash/sortBy";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const MapChart = () => {
  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    csv("/data.csv").then((cities) => {
      const sortedCities = sortBy(cities, (o) => -o.population);
      setMaxValue(sortedCities[0].population);
      setData(sortedCities);
    });
  }, []);

  const popScale = useMemo(
    () => scaleSqrt().domain([0, maxValue]).range([0, 10]),
    [maxValue]
  );

  return (
    <ComposableMap projectionConfig={{ rotate: [-10, 0, 0] }}>
      <ZoomableGroup center={[33, 33]} zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#ABC" />
            ))
          }
        </Geographies>
        {data.map(({ city_code, lng, lat, population,city }) => {
          return (
            <Marker key={city_code} coordinates={[lng, lat]}>
              <circle fill="#b67" r={popScale(population/2)} />
              <text
                textAnchor="middle"
                y={10 + popScale(population/2)}
                style={{ fontSize:"10px", fontFamily: "system-ui", fill: "#5D5A6D" }}
              >
                {city}
              </text>
            </Marker>
          );
        })}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
