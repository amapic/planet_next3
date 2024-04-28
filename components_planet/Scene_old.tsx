import React, { useState, useRef, useEffect } from "react";

import { useFrame } from "@react-three/fiber";

import Systeme from "./Systeme";

import Data from "../public/premierTri.json";

import { useDeplacementStore, usePlanetStore } from "./store/store";

// import { usePlanetStore } from "../pages/index";

interface dataPlaneteInt {
  name: string;
  mass: number;
  radius: number;
  semi_major_axis: number;
  orbital_period_: number;
  semi_major_axis_: number;
  period: number;
  star_radius: number;
  star_name: string;
  star_distance: number;
  star_age: string | number;
  text: string;
  discovered: number;
}

interface dataSystemeInt {
  [index: number]: {
    name: string;
    mass: number;
    radius: number;
    semi_major_axis: number;
    orbital_period_: number;
    semi_major_axis_: number;
    period: number;
    star_radius: number;
    star_name: string;
    star_distance: number;
    star_age: string | number;
    text: string;
    discovered: number;
  };
  uid: number;
}


const EmptyPlanet = (): dataPlaneteInt => ({
  name: "",
  mass: 0,
  radius: 0,
  semi_major_axis: 0,
  orbital_period_: 0,
  semi_major_axis_: 0,
  period: 0,
  star_radius: 0,
  star_name: "",
  star_distance: 0,
  star_age: 0,
  text: "",
  discovered: 0,
});

const EmptySystem = (): dataSystemeInt[] => {
  var tt: dataPlaneteInt = EmptyPlanet();

  return [{
    0:tt,
    uid: 0,
  }];
};


export default function Scene():JSX.Element {
  const { planet, updateData } = usePlanetStore((state) => state);

  var dataSysteme: dataSystemeInt[];
  var refDataSystemes = useRef<dataSystemeInt[]>(null!);
  var star_name = "!";
  var dataPlanetes: dataSystemeInt[];
  var dataPlanete: dataPlaneteInt;
  dataPlanete = EmptyPlanet();
  dataPlanetes = EmptySystem();
  dataSysteme=[];

  const [dataLoaded, setDataLoaded] = useState(false);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  useEffect(() => {
    Data.forEach((item, i) => {
      if (star_name != item.star_name && star_name != "!") {
        dataSysteme.push(JSON.parse(JSON.stringify(dataPlanetes)));
        dataPlanete = EmptyPlanet();
        dataPlanetes = EmptySystem();
      }

      star_name = item.star_name;

      dataPlanete.star_name = item.star_name;
      dataPlanete.name = item.name;
      dataPlanete.mass = item.mass;
      dataPlanete.radius = item.radius;
      dataPlanete.semi_major_axis = item.semi_major_axis;
      dataPlanete.orbital_period_ = item.orbital_period;
      dataPlanete.semi_major_axis_ = item.semi_major_axis;
      dataPlanete.period = item.orbital_period;

      dataPlanete.star_radius = item.star_radius;
      dataPlanete.star_name = item.star_name;
      dataPlanete.star_distance = item.star_distance;
      dataPlanete.star_age = item.star_age;
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

  var progress: any = null;

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
              />
            </>
          ))
        : null}
    </>
  );
}
