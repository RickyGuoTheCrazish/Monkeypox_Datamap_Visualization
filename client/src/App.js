import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

import ReactTooltip from "react-tooltip";

import "./styles.css";
import "./Title.css";
import Sticky from 'react-stickynode';
import MapChart from "./MapChart";
import Title from './Title';

import L0 from "./L0.png";
import L1 from "./L1.png";
import L2 from "./L2.png";
import L3 from "./L3.png";
import L4 from "./L4.png";
import L5 from "./L5.png";


function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <Sticky enabled={true} top={0.1} bottomBoundary={1000}>
        <Title />
        <img src={L0} alt="L0"/>
        <b> 0~100 </b>
        <img src={L1} alt="L1"/>
        <b> >100 </b>

        <img src={L2} alt="L2"/>
        <b> >500 </b>

        <img src={L3} alt="L3"/>
        <b> >2000 </b>

        <img src={L4} alt="L4"/>
        <b> >5000 </b>

        <img src={L5} alt="L5"/>
        <b> >10000 </b>
      </Sticky>

      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>    
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;