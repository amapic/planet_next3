/* eslint-disable */

import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as three from "three";


import { useSpring, animated, config } from "@react-spring/three";

import Planet from "./Planet";

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
        <meshBasicMaterial color={[255,255,255]} toneMapped={false} />
      </animated.mesh>
    </>
  );
};

export default function Scene() {

  const IMAGES = [
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
  ];

  const [infoEtoile, setInfoEtoile] = useState(IMAGES);
  const [compteur, setCompteur] = useState(0);



  function AA(x) {
    setInfoEtoile(x);
    console.log(compteur);
    setCompteur(compteur + 1);
  }

  return (
    <>
      <gridHelper />
      <axesHelper />
      <pointLight intensity={1.0} position={[0, 0, 0]} />
      <Soleil infoEtoile={infoEtoile} aa={AA} position={[0, 0, 0]} />

      {infoEtoile.map((image, i) => (
        <>
          <Planet compteur={compteur} key={i} image={image} />
        </>
      ))}
    </>
  );
}
