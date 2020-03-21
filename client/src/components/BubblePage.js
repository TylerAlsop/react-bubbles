import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [colorChanged, setColorChanged] = useState(false)

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
        .get("/api/colors")
        .then(res => {
            console.log("Res for BubblePage.js", res);
            setColorList(res.data);
        })
        .catch()
}, [colorChanged])

  // colorAdded

  return (
    <>
      <ColorList 
        colors={colorList} 
        updateColors={setColorList} 
        colorChanged={colorChanged} 
        setColorChanged={setColorChanged} 
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
