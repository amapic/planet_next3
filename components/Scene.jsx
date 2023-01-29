/* eslint-disable */

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";

import { animated } from "@react-spring/three";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";

import Planet from "./Planet";

import { Html } from "@react-three/drei";

// import Data from "./data/data";

const Soleil = ({ infoEtoile, aa, ...args }) => {
  const IMAGES = [
    {
      rotation: 200,
      position: [-2, 1, 1],
      radius: 1,
      periode: 50,
      text: "A",
      colorMap: "/earth.jpg",
      internalRadius: 0.1,
    },
    {
      rotation: 145,
      position: [-1, 1, 1],
      radius: 2,
      periode: 50,
      text: "B",
      colorMap: "/earth.jpg",
      internalRadius: 0.2,
    },
    {
      rotation: 190,
      position: [-0, 1, 1],
      radius: 3,
      periode: 70,
      text: "C",
      colorMap: "/earth.jpg",
      internalRadius: 0.3,
    },
  ];
  return (
    <>
      <animated.mesh
        {...args}
        onClick={(x) => {
          IMAGES.map((x) => (x.radius = x.radius + 1));
          aa(IMAGES);
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={[255, 255, 255]} toneMapped={false} />
      </animated.mesh>
    </>
  );
};

import Data from "public/premierTri.json";

export default function Scene() {
  // const [pos, setPos] = useState([
  //   [-20 * Math.cos(Math.PI / 4), 0, 20 * Math.sin(Math.PI / 4)],
  //   [0, 0, 0],
  //   [20 * Math.cos(Math.PI / 4), 0, -20 * Math.sin(Math.PI / 4)],
  // ]);

  // console.log(Data)
  var dataSysteme = [];
  var star_name = "!";
  var dataPlanetes = [];
  var dataPlanete = {};
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

    // rotation: 700,
    //     position: [-1, 1, 1],
    //     radius: 2,
    //     periode: 60,
    //     text: "B",
    //     colorMap: "/earth.jpg",
    //     internalRadius: 0.2,
  });

  dataSysteme.push(JSON.parse(JSON.stringify(dataPlanetes)));

  // console.log(dataSysteme[1]);

  const [pos, setPos] = useState([
    [-20, 0, 20],
    [0, 0, 0],
    [20, 0, -20],
  ]);

  const s1 = useRef();
  const s2 = useRef();
  const s3 = useRef();

  const [pos2, setPos2] = useState([-20, 0, 20]);

  const [droite, setDroite] = useState(false);
  const [gauche, setGauche] = useState(false);

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

  // var theta = useRef(0.5);
  var cumulDecalage = useRef(0);
  // useFrame(() => {
  //   if (droite) {
  //     let theta = 0.5;
  //     cumulDecalage.current += theta;
  //     setPos([
  //       [pos[0][0] + theta, 0, pos[0][2] - theta],
  //       [pos[1][0] + theta, 0, pos[1][2] - theta],
  //       [pos[2][0] + theta, 0, pos[2][2] - theta],
  //     ]);
  //     if (cumulDecalage.current >= 20) {
  //       cumulDecalage.current = 0;
  //       setDroite(false);
  //       console.log("droite false");
  //     }
  //   }

  //   if (gauche) {
  //     let theta = -0.5;

  //     cumulDecalage.current += theta;
  //     setPos([
  //       [pos[0][0] + theta, 0, pos[0][2] - theta],
  //       [pos[1][0] + theta, 0, pos[1][2] - theta],
  //       [pos[2][0] + theta, 0, pos[2][2] - theta],
  //     ]);

  //     if (cumulDecalage.current <= -20) {
  //       cumulDecalage.current = 0;
  //       setGauche(false);
  //       console.log("droite false");
  //     }
  //   }
  // });



  return (
    <>
      <Html>
        <div
          onClick={() => {
            setDroite(!droite);
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
            setGauche(!gauche);
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
      {dataSysteme.slice(0, 1).map((systeme, i) => (
      <>
        <Systeme key={i} info={dataSysteme[i]} position={pos[i]} />
      </>
      ))}
    </>
  );
}

function Systeme({ info, position }) {
  const [infoEtoile, setInfoEtoile] = useState(info);
  const [compteur, setCompteur] = useState(0);

  function setSystemPosition(value) {
    return value;
  }

  function AA(x) {
    setInfoEtoile(x);
    setCompteur(compteur + 1);
  }

  // console.log(info)

  // const result = Object.entries(info.radius).reduce((a, b) => a[1] > b[1] ? a : b)[0]

  var semi_major_axismax = 0;
  var semi_major_axismin = 0;

  var periodemax = 0;
  var periodemin = 0;

  info.forEach((x, i) => {

    if (i==0){
      semi_major_axismax = x.semi_major_axis
      semi_major_axismin = x.semi_major_axis
      periodemax = x.periode
      periodemin = x.periode
    }
    if (x.semi_major_axis > semi_major_axismax) {
      semi_major_axismax = x.semi_major_axis;
    }

    if (x.semi_major_axis < semi_major_axismin) {
      semi_major_axismin = x.semi_major_axis;
    }

    if (x.periode > periodemax) {
      periodemax = x.periode;
    }

    if (x.periode < periodemin) {
      periodemin = x.periode;
    }
  });

  //8 = valeur max , 1 valeur min
  info.forEach((x, i) => {
    x.semi_major_axis = 1+ (x.semi_major_axis - semi_major_axismin) * (8 - 1) / (semi_major_axismax - semi_major_axismin);
  });

  info.forEach((x, i) => {
    x.periode = 20 + (x.periode  - periodemin)* (100 - 20) / (periodemax - periodemin);
    // x.periode=50
  });

  console.log("rr", info);

  return (
    <group position={position}>
      <gridHelper />
      <axesHelper />
      <pointLight intensity={1.0} position={[0, 0, 0]} />
      <Soleil infoEtoile={infoEtoile} aa={AA} position={[0, 0, 0]} />

      {info.map((image, i) => (
        <>
          <Planet compteur={compteur} key={i} image={image} />
        </>
      ))}
    </group>
  );
}
