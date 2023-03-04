/* eslint-disable */

import React, { useState, useRef, useEffect } from "react";

import { animated } from "@react-spring/three";

import { useFrame, useThree, extend } from "@react-three/fiber";

import Planet from "./Planet";

import { Html } from "@react-three/drei";

import Systeme from "./Systeme";


// import Data from "./data/data";

import Data from "public/premierTri.json";

export default function Scene() {
  // const [pos, setPos] = useState([
  //   [-20 * Math.cos(Math.PI / 4), 0, 20 * Math.sin(Math.PI / 4)],
  //   [0, 0, 0],
  //   [20 * Math.cos(Math.PI / 4), 0, -20 * Math.sin(Math.PI / 4)],
  // ]);

  // console.log(Data)
  var dataSysteme = [];
  var refDataSystemes = useRef();
  var star_name = "!";
  var dataPlanetes = [];
  var dataPlanete = {};

  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    Data.forEach((item, i) => {
      // console.log(
      //   item.star_name,
      //   item.name,
      //   item.radius,
      //   item.semi_major_axis,
      //   item.orbital_period,
      //   item.temp,
      //   item.star_radius
      // );

      if (star_name != item.star_name && star_name != "!") {
        dataSysteme.push(JSON.parse(JSON.stringify(dataPlanetes)));
        dataPlanete = {};
        dataPlanetes = [];
      }

      star_name = item.star_name;

      dataPlanete.star_name = item.star_name;
      dataPlanete.name = item.name;
      dataPlanete.radius = item.radius;
      dataPlanete.semi_major_axis = item.semi_major_axis;
      dataPlanete.periode = item.orbital_period;
      dataPlanete.star_radius = item.star_radius;
      dataPlanete.colorMap = "/earth.jpg";
      dataPlanete.text = item.name;

      dataPlanetes.push(JSON.parse(JSON.stringify(dataPlanete)));
    });

    dataSysteme.push(JSON.parse(JSON.stringify(dataPlanetes)));
    refDataSystemes.current = dataSysteme;
    console.log("useeffect", refDataSystemes.current);
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

  const [pos2, setPos2] = useState([-20, 0, 20]);

  const [droite, setDroite] = useState(false);
  const [gauche, setGauche] = useState(false);
  const [nActive, setnActive] = useState(2);

  const infos = [
    [
      {
        rotation: 900,
        position: [-2, 1, 1],
        radius: 1,
        periode: 50,
        text: "A",
        colorMap: "/earth.jpg",
        internalRadius: 0.1,
      },
      {
        rotation: 700,
        position: [-1, 1, 1],
        radius: 2,
        periode: 60,
        text: "B",
        colorMap: "/earth.jpg",
        internalRadius: 0.2,
      },
      {
        rotation: 600,
        position: [-0, 1, 1],
        radius: 3,
        periode: 80,
        text: "C",
        colorMap: "/earth.jpg",
        internalRadius: 0.3,
      },
    ],
    [
      {
        rotation: 900,
        position: [-2, 1, 1],
        radius: 1,
        periode: 50,
        text: "A",
        colorMap: "/earth.jpg",
        internalRadius: 0.1,
      },
      {
        rotation: 700,
        position: [-1, 1, 1],
        radius: 2,
        periode: 60,
        text: "B",
        colorMap: "/earth.jpg",
        internalRadius: 0.2,
      },
      {
        rotation: 600,
        position: [-0, 1, 1],
        radius: 3,
        periode: 80,
        text: "C",
        colorMap: "/earth.jpg",
        internalRadius: 0.3,
      },
    ],
    [
      {
        rotation: 900,
        position: [-2, 1, 1],
        radius: 1,
        periode: 50,
        text: "A",
        colorMap: "/earth.jpg",
        internalRadius: 0.1,
      },
      {
        rotation: 700,
        position: [-1, 1, 1],
        radius: 2,
        periode: 60,
        text: "B",
        colorMap: "/earth.jpg",
        internalRadius: 0.2,
      },
      {
        rotation: 600,
        position: [-0, 1, 1],
        radius: 3,
        periode: 80,
        text: "C",
        colorMap: "/earth.jpg",
        internalRadius: 0.3,
      },
    ],
  ];

  var cumulDecalage = useRef(0);
  var gachette = useRef(false);

  function shift(arr) {
    return arr.map((_, i, a) => a[(i + a.length + 1) % a.length]);
  }

  function shiftBackward(arr) {
    return arr.map((_, i, a) => a[(i + a.length - 1) % a.length]);
  }

  useFrame(() => {
    if (droite && (gachette || cumulDecalage.current != 0)) {
      gachette.current = false;
      let theta = 0.5;
      cumulDecalage.current += theta;

      setPos([
        [pos[0][0] + theta, 0, pos[0][2] - theta],
        [pos[1][0] + theta, 0, pos[1][2] - theta],
        [pos[2][0] + theta, 0, pos[2][2] - theta],
        [pos[3][0] + theta, 0, pos[3][2] - theta],
        [pos[4][0] + theta, 0, pos[4][2] - theta],
        [pos[5][0] + theta, 0, pos[5][2] - theta],
      ]);
      if (cumulDecalage.current >= 20) {
        cumulDecalage.current = 0;

        //
        console.log("droite", refDataSystemes.current);

        setDroite(false);
        // refDataSystemes.current = shift(refDataSystemes.current);
      }
    }

    if (gauche && (gachette || cumulDecalage.current != 0)) {
      let theta = -0.5;

      cumulDecalage.current += theta;
      gachette.current = false;

      setPos([
        [pos[0][0] + theta, 0, pos[0][2] - theta],
        [pos[1][0] + theta, 0, pos[1][2] - theta],
        [pos[2][0] + theta, 0, pos[2][2] - theta],
        [pos[3][0] + theta, 0, pos[3][2] - theta],
        [pos[4][0] + theta, 0, pos[4][2] - theta],
        [pos[5][0] + theta, 0, pos[5][2] - theta],
      ]);

      if (cumulDecalage.current <= -20) {
        cumulDecalage.current = 0;

        //
        console.log("gauche", refDataSystemes);

        setGauche(false);
        // refDataSystemes.current = shiftBackward(refDataSystemes.current);
      }
    }
  });

  // console.log("data", dataLoaded, refDataSystemes);
  return (
    <>
      <Html>
        <div
          onClick={() => {
            if (nActive != 0) {
              gachette.current = true;
              setnActive(nActive - 1);
              setDroite(!droite);
            }
          }}
          style={{
            width: "100px",
            height: "100px",
            position: "fixed",
            top: "0px",
            left: "0px",
            backgroundColor: "red",
          }}
        ></div>
        <div
          onClick={() => {
            if (nActive != 5) {
              gachette.current = true;
              setnActive(nActive + 1);
              setGauche(!gauche);
            }
          }}
          style={{
            width: "100px",
            height: "100px",
            position: "fixed",
            top: "100px",
            left: "100px",
            backgroundColor: "blue",
          }}
        ></div>
      </Html>
      {dataLoaded
        ? refDataSystemes.current.map((systeme, i) => (
            <>
              <Systeme
                key={i}
                i={i}
                gachette={gachette}
                info={systeme}
                position={pos[i]}
                nActive={nActive}
              />
            </>
          ))
        : null}
    </>
  );
}
