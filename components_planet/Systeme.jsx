import { useState, useRef } from "react";

import { animated } from "@react-spring/three";

import TextPlanet from "./TextPlanet";

import dynamic from "next/dynamic";

const DynamicPlanet = dynamic(() => import("./Planet"), {
  ssr: false,
});

const Soleil = ({ info, centre, ...args }) => {
  return (
    <>
      <TextPlanet
        info={info}
        clickedd={true}
        text={info.star_name}
        text2={info.star_age}
        text3={info.star_distance}
        text4={info.star_radius}
        position={[0, 0, 0]}
        star={true}
        centre={centre}
      />
      <animated.mesh {...args}>
        <sphereGeometry args={[0.5 * info.star_radius, 32, 32]} />
        <meshStandardMaterial color={[255, 255, 255]} toneMapped={false} />
      </animated.mesh>
    </>
  );
};

export default function Systeme({
  info,
  position,
  nActive,
  i,
  gachette,
  Mmap,
}) {
  const [compteur, setCompteur] = useState(0);

  const idSysteme = useRef(Math.ceil(1000 * Math.random()));

  let tt = useRef(info);

  var semi_major_axismax = 0;
  var semi_major_axismin = 0;

  var maxSemi_major_axis = 0;

  var periodemax = 0;
  var periodemin = 0;

  let infoOrig = JSON.parse(JSON.stringify(info));

  info.forEach((x, i) => {
    if (i == 0) {
      semi_major_axismax = x.semi_major_axis;
      semi_major_axismin = x.semi_major_axis;
      periodemax = x.period;
      periodemin = x.period;
    }
    if (x.semi_major_axis > semi_major_axismax) {
      semi_major_axismax = x.semi_major_axis;
    }

    if (x.semi_major_axis < semi_major_axismin) {
      semi_major_axismin = x.semi_major_axis;
    }

    if (x.period > periodemax) {
      periodemax = x.period;
    }

    if (x.period < periodemin) {
      periodemin = x.period;
    }
  });

  info.forEach((x, i) => {
    x.semi_major_axis_orig = infoOrig[i].semi_major_axis;
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
    x.period_orig = x.period;
    x.period =
      20 + ((x.period - periodemin) * (100 - 20)) / (periodemax - periodemin);
  });

  return nActive == i || nActive == i + 1 || nActive == i - 1 ? (
    <group position={position}>
      <gridHelper colorCenterLine={[255, 127, 0]} colorGrid={[255, 127, 0]} />
      <pointLight intensity={1.0} position={[0, 0, 0]} />
     

      <Soleil info={info[0]} centre={nActive == i} />

      {info.map((image, i) => (
        <>
          <DynamicPlanet
            key={idSysteme.current * i}
            compteur={compteur}
            image={image}
            imageData={infoOrig[i]}
          />
        </>
      ))}
    </group>
  ) : null;
}
