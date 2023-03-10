import { useState } from "react";

import Planet from "./Planet";
import Echelle from "./Echelleeee";
// import {
//   motion,
//   useScroll,
//   useSpring,
//   useTransform,
//   useMotionValue,
// } from "framer-motion";

import { animated } from "@react-spring/three";

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

  // console.log("rr", infoEtoile);
  return (
    <>
      <animated.mesh
        {...args}
        onClick={(x) => {
          IMAGES.map((x) => (x.radius = x.radius + 1));
          aa(IMAGES);
        }}
      >
        <sphereGeometry args={[0.5 * infoEtoile, 32, 32]} />
        <meshBasicMaterial
          emissiveIntensity={4}
          color={[255, 255, 255]}
          toneMapped={false}
        />
      </animated.mesh>
    </>
  );
};

export default function Systeme({ info, position, nActive, i, gachette }) {
  const [infoEtoile, setInfoEtoile] = useState(info);
  const [compteur, setCompteur] = useState(0);

  // console.log("rrgt", nActive);

  function AA(x) {
    setInfoEtoile(x);
    setCompteur(compteur + 1);
  }

  var semi_major_axismax = 0;
  var semi_major_axismin = 0;

  var maxSemi_major_axis = 0;

  var periodemax = 0;
  var periodemin = 0;

  info.forEach((x, i) => {
    if (i == 0) {
      semi_major_axismax = x.semi_major_axis;
      semi_major_axismin = x.semi_major_axis;
      periodemax = x.periode;
      periodemin = x.periode;
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
    x.semi_major_axis_orig = x.semi_major_axis;
    x.semi_major_axis =
      1 +
      ((x.semi_major_axis - semi_major_axismin) * (8 - 1)) /
        (semi_major_axismax - semi_major_axismin);
    maxSemi_major_axis =
      maxSemi_major_axis > x.semi_major_axis_orig
        ? maxSemi_major_axis
        : x.semi_major_axis_orig;
  });

  info.forEach((x, i) => {
    x.periode =
      20 + ((x.periode - periodemin) * (100 - 20)) / (periodemax - periodemin);
    x.colorMap = Math.floor(Math.random() * 3); //nombre de map possible
  });

  return nActive == i ||
    nActive == i + 1 ||
    nActive == i + 2 ||
    nActive == i - 1 ||
    nActive == i - 2 ? (
    // return 1 == 1 ? (
    <group position={position}>
      <gridHelper />
      <axesHelper />
      <pointLight intensity={1.0} position={[0, 0, 0]} />
      {/* {gachette && nActive == i ? ( */}
      {/* <Echelle
        maxSemi_major_axis={maxSemi_major_axis}
        name={info[0].star_name}
      /> */}
      {/* ) : null} */}
      <Soleil infoEtoile={info[0].star_radius} aa={AA} position={[0, 0, 0]} />

      {info.map((image, i) => (
        <>
          <Planet key={i} compteur={compteur} image={image} />
        </>
      ))}
    </group>
  ) : null;
}
