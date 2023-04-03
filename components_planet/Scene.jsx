import React, { useState, useRef, useEffect, useContext } from "react";


import { useFrame, useThree, extend } from "@react-three/fiber";



import Systeme from "./Systeme";

import Data from "premierTri.json";

import { AppContext, useDeplacementStore } from "../pages/index";

import { usePlanetStore } from "../pages/index";




export default function Scene() {
  const { planet, updateData } = usePlanetStore((state) => state);

  var dataSysteme = [];
  var refDataSystemes = useRef();
  var star_name = "!";
  var dataPlanetes = [];
  var dataPlanete = {};

  const [dataLoaded, setDataLoaded] = useState(false);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  useEffect(() => {
    Data.forEach((item, i) => {

      if (item.name=='K2-138 b'){
        console.log(item)
      }
      if (star_name != item.star_name && star_name != "!") {
        dataSysteme.push(JSON.parse(JSON.stringify(dataPlanetes)));
        dataPlanete = {};
        dataPlanetes = [];
      }

      star_name = item.star_name;

      dataPlanete.star_name = item.star_name;
      dataPlanete.name = item.name;
      // dataPlanete.mass = Math.round(item.mass * 100) / 100;
      dataPlanete.mass = item.mass;
      // dataPlanete.radius = Math.round(item.radius * 100) / 100;
      dataPlanete.radius = item.radius;
      dataPlanete.semi_major_axis =item.semi_major_axis;
        // Math.round(item.semi_major_axis * 100) / 100;
      dataPlanete.period = item.orbital_period;

      // Math.round(item.orbital_period * 100) / 100;
      // dataPlanete.star_radius = Math.round(item.star_radius * 100) / 100;
      dataPlanete.star_radius=item.star_radius
      // dataPlanete.star_name =Math.round(item.star_name* 100) / 100;
      dataPlanete.star_name=item.star_name
      // dataPlanete.star_distance =Math.round(item.star_distance* 100) / 100;
      dataPlanete.star_distance=item.star_distance
      dataPlanete.star_age =item.star_age;
      // dataPlanete.colorMap = "/earth.jpg";
      dataPlanete.text = item.name;
      dataPlanete.discovered = item.discovered;

      dataPlanetes.push(JSON.parse(JSON.stringify(dataPlanete)));
    });

    dataSysteme.push(JSON.parse(JSON.stringify(dataPlanetes)));


    dataSysteme.map((systeme, i) => {
      systeme.uid = getRandomInt(1, 1000);
    });

    updateData(dataSysteme[0][0]);

    refDataSystemes.current = dataSysteme;

    setDataLoaded(true);
  }, []);

  const [pos, setPos] = useState([
    [-40, 0, 40],
    [-20, 0, 20],
    [0, 0, 0],
    [20, 0, -20],
    [40, 0, -40],
    [60, 0, -60],
  ]);

  


  const s1 = useRef();
  const s2 = useRef();
  const s3 = useRef();

  const posInit = useRef(0);

  const [pos2, setPos2] = useState([-20, 0, 20]);

  var cumulDecalage = useRef(0);

  const {
    nActive,
    droite,
    gauche,
    gachette,
    updateGachette,
    stopDroite,
    stopGauche,
    nActiveUp,
    nActiveDown,
  } = useDeplacementStore((state) => state);

  var progress = null;

  useFrame((state, delta) => {

    progress = progress + delta;

    progress = 0;
 
    if (droite && (gachette || cumulDecalage.current != 0)) {

      let theta = 0.5;
      posInit.current = posInit.current == 0 ? pos[0][0] : posInit.current;
      cumulDecalage.current += theta;

      setPos([
        [pos[0][0] + theta, 0, pos[0][2] - theta],
        [pos[1][0] + theta, 0, pos[1][2] - theta],
        [pos[2][0] + theta, 0, pos[2][2] - theta],
        [pos[3][0] + theta, 0, pos[3][2] - theta],
        [pos[4][0] + theta, 0, pos[4][2] - theta],
        [pos[5][0] + theta, 0, pos[5][2] - theta],
      ]);

      if (Math.abs(posInit.current - pos[0][0]) >= 20) {
        updateGachette();
        cumulDecalage.current = 0;
        posInit.current = 0;


        stopDroite();
        nActiveDown();
      }
    }

    if (gauche && (gachette || cumulDecalage.current != 0)) {
      let theta = -0.5;
      posInit.current = posInit.current == 0 ? pos[0][0] : posInit.current;

      cumulDecalage.current += theta;

      setPos([
        [pos[0][0] + theta, 0, pos[0][2] - theta],
        [pos[1][0] + theta, 0, pos[1][2] - theta],
        [pos[2][0] + theta, 0, pos[2][2] - theta],
        [pos[3][0] + theta, 0, pos[3][2] - theta],
        [pos[4][0] + theta, 0, pos[4][2] - theta],
        [pos[5][0] + theta, 0, pos[5][2] - theta],
      ]);


      if (Math.abs(posInit.current - pos[0][0]) >= 20) {
        updateGachette();
        cumulDecalage.current = 0;
        posInit.current = 0;
        stopGauche();
        nActiveUp();
      }
    }
  });

  // console.log("rr",refDataSystemes.current)

  return (
    <>
   
      {dataLoaded
        ? refDataSystemes.current.map((systeme, i) => (
            <>
              <Systeme
                key={systeme.uid}
                i={i}
                gachette={gachette}
                info={systeme}
                position={pos[i]}
                nActive={nActive}
                // Mmap={Mmap}
              />
            </>
          ))
        : null}
    </>
  );
}
