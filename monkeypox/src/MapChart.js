import React, { useEffect, useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";
import { csv } from "d3-fetch";
import { scaleQuantile,scaleLinear,scaleSqrt,scaleLog } from "d3-scale";
import sortBy from "lodash/sortBy";


const geoUrl ="/countries.json";
const countryData = "/MPX-Country-Data.csv";

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    csv("/MPX-Country-Data.csv").then((country) => {
      const sortedCountries = sortBy(country, (o) => -o.Cases);
      setMaxValue(sortedCountries[0].case);
      setData(sortedCountries);
    });
  }, []);

  // useEffect(() => {
  //   // https://www.bls.gov/lau/
  //   csv("/data.csv").then((countries) => {
  //     setData(countries);
  //   });
  // }, []);

  const colorScale = scaleQuantile()
    .domain([0, 10000]) 
    .range([
      "#ccc",
      "#ffedea",
      "#fee6e2",
      "#fedfda",
      "#fed8d2",
      "#fed1c9",
      "#fecac1",
      "#fec3b9",
      "#febcb1",
      "#ffb5a9",
      "#ffaea1",
      "#ffa799",
      "#ffa090",
      "#f98",
      "#ff9280",
      "#ff8b78",
      "#ff8470",
      "#ff7d68",
      "#ff765f",
      "#ff6f57",
      "#ff684f",
      "#ff6147",
      "#ff5a3f",
      "rgba(255,83,55,0.9)",
      "rgba(255,83,55,0.91)",
      "rgba(255,83,55,0.92)",
      "rgba(255,83,55,0.93)",
      "rgba(255,83,55,0.94)",
      "rgba(255,83,55,0.95)",
      "rgba(255,83,55,0.96)",
      "rgba(255,83,55,0.97)",
      "rgba(255,83,55,0.98)",
      "rgba(255,83,55,0.99)",
      "#ff5337",
      "#ff4c2e",
      "#ff4526",
      "#ff3e1e",
      "#ff3716",
      "#ff300e",
      "#ff2906",
      "#fc2400",
      "#f42200",
      "#ec2100",
      "#e42000",
      "#dc1f00",
      "#d41e00",
      "#cc1d00",
      "#c31b00",
      "rgba(187,26,0,0.90)",
      "rgba(187,26,0,0.91)",
      "rgba(187,26,0,0.92)",
      "rgba(187,26,0,0.93)",
      "rgba(187,26,0,0.94)",
      "rgba(187,26,0,0.95)",
      "rgba(187,26,0,0.96)",
      "rgba(187,26,0,0.97)",
      "rgba(187,26,0,0.98)",
      "rgba(187,26,0,0.99)",
      "#bb1a00",
      "#b31900",
      "#ab1800",
      "#a31700",
      "#9b1600",
      "#921400",
      "#8a1300",
      "#821200",
      "#7a1100",
      "#721000",
      "rgba(106,15,0,0.9)",
      "rgba(106,15,0,0.91)",
      "rgba(106,15,0,0.92)",
      "rgba(106,15,0,0.93)",
      "rgba(106,15,0,0.94)",
      "rgba(106,15,0,0.95)",
      "rgba(106,15,0,0.96)",
      "rgba(106,15,0,0.97)",
      "rgba(106,15,0,0.98)",
      "rgba(106,15,0,0.99)",
      "#6a0f00",
      "#610d00",
      "#590c00",
      "#510b00",
      "#490a00",
      "#410900",
      "#390800",
      "#300600",
      "#280500",
      "#200400",
      "#180300",
      "rgba(16,2,0,0.9)",
      "rgba(16,2,0,0.91)",
      "rgba(16,2,0,0.92)",
      "rgba(16,2,0,0.93)",
      "rgba(16,2,0,0.94)",
      "rgba(16,2,0,0.95)",
      "rgba(16,2,0,0.96)",
      "rgba(16,2,0,0.97)",
      "rgba(16,2,0,0.98)",
      "rgba(16,2,0,0.99)",
      "#100200"

      ])

  return (
    <div data-tip="">
      <ComposableMap projectionConfig={{ rotate: [10, 0, 0] , center: [0,0]}}>
        <ZoomableGroup center={[0,0]} zoom={1} >
          
          <Geographies geography={geoUrl}>
            {({ geographies }) =>(
              data.map(({ Country, Cases, Deaths, Category,AsOf }) => {
                
                  geographies.map((geo) =>  {
                    if(geo.properties.name == Country){
                      geo.properties.case = Cases;
                    }
                    
                  })
                
              }),
              geographies.map((geo) => 

                <Geography key={geo.rsmKey} geography={geo} 
                  onMouseEnter={() => {
                      if(`${geo.properties.case}` == "undefined"){
                        geo.properties.case = 0;
                        setTooltipContent(`${geo.properties.name + " "+ 0}`);
                      }
                      else{
                        setTooltipContent(`${geo.properties.name + " "+geo.properties.case}`);
                      }

                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      // fill:"#A76",
                      fill: colorScale(geo.properties.case),
                      outline: "none"
                    },
                    hover: {
                      fill: "#006CAA",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                
                />
              ))

              
              
            }
          </Geographies>
      
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
