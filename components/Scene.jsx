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

import Data from "public/data.json";

export default function Scene() {
  // const [pos, setPos] = useState([
  //   [-20 * Math.cos(Math.PI / 4), 0, 20 * Math.sin(Math.PI / 4)],
  //   [0, 0, 0],
  //   [20 * Math.cos(Math.PI / 4), 0, -20 * Math.sin(Math.PI / 4)],
  // ]);

  // console.log(Data())

  Data.forEach((item, i) => {
    if (
      item.radius != "" &&
      item.semi_major_axis != "" &&
      item.name != "" &&
      item.star_name != "" &&
      item.orbital_period != "" &&
      item.star_radius != ""
    ) {
      if (
        item.radius != "" &&
        item.semi_major_axis != null &&
        item.name != "" &&
        item.star_name != "" &&
        item.orbital_period != ""
      ) {
        console.log(
          item.star_name,
          item.name,
          item.radius,
          item.semi_major_axis,
          item.orbital_period,
          item.temp,
          item.star_radius
        );
      }
    }
  });

  // var infos

  // useRef(()=>{
  //   Data[0].name

  //   Data.forEach((item,i)=>{

  //     let aarray
  //     let ddict
  //     ddict.radius
  //     aarray.append(ddict)
  //     infos.append(aarray)
  //   })

  //   // for (let pas = 0; pas < 5; pas++) {

  //   // }

  //   // infos.
  // },[])

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
  useFrame(() => {
    if (droite) {
      let theta = 0.5;
      cumulDecalage.current += theta;
      setPos([
        [pos[0][0] + theta, 0, pos[0][2] - theta],
        [pos[1][0] + theta, 0, pos[1][2] - theta],
        [pos[2][0] + theta, 0, pos[2][2] - theta],
      ]);
      if (cumulDecalage.current >= 20) {
        cumulDecalage.current = 0;
        setDroite(false);
        console.log("droite false");
      }
    }

    if (gauche) {
      let theta = -0.5;

      cumulDecalage.current += theta;
      setPos([
        [pos[0][0] + theta, 0, pos[0][2] - theta],
        [pos[1][0] + theta, 0, pos[1][2] - theta],
        [pos[2][0] + theta, 0, pos[2][2] - theta],
      ]);

      if (cumulDecalage.current <= -20) {
        cumulDecalage.current = 0;
        setGauche(false);
        console.log("droite false");
      }
    }
  });

  function setPosSysteme() {
    if (nSystemevisible == 0) {
      return [
        [20 * Math.cos(Math.PI / 4), 0, -20 * Math.sin(Math.PI / 4)],
        [0, 0, 0],
        [20 * Math.cos(Math.PI / 4), 0, -20 * Math.sin(Math.PI / 4)],
      ];
    }
  }

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
      {infos.map((info, i) => (
        <>
          <Systeme key={i} info={info} position={pos[i]} />
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

  // useEffect(() => {
  //   // console.log("ref position",refGroup.current.position.x)
  // });

  // useFrame(() => {
  //   if (false) {
  //     setPos(pos + 0.05);
  //   }
  //   // if (sysVisible && refGroup.current){
  //   //   refGroup.current.position.set(
  //   //     [refGroup.current.position.x-0.001,0,0]
  //   //   )
  //   // }
  //   // else{
  //   //   refGroup.current.position.set(
  //   //     [0,refGroup.current.position.x+0.01,0]
  //   //   )
  //   // }

  // })

  return (
    <group
      position={position}
      // ref={refGroup}

      // onMouseEnter={() => {
      //   // x.set(0);
      //   console.log("rrr")
      //   setSysVisible(false)
      // }}
    >
      <gridHelper />
      <axesHelper />
      <pointLight intensity={1.0} position={[0, 0, 0]} />
      <Soleil infoEtoile={infoEtoile} aa={AA} position={[0, 0, 0]} />

      {infoEtoile.map((image, i) => (
        <>
          <Planet compteur={compteur} key={i} image={image} />
        </>
      ))}
    </group>
  );
}
