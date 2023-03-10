import React, { useState, useRef, useEffect, useContext } from "react";

import { animated } from "@react-spring/three";

import { useFrame, useThree, extend } from "@react-three/fiber";

import Planet from "./Planet";

import { Html } from "@react-three/drei";

import Systeme from "./Systeme";

import Data from "public/data/premierTri.json";

import { AppContext, useDeplacementStore } from "../pages/index";

import { usePlanetStore } from "../pages/index";

// export const usePlanetStore = create((set) => ({
//   planet: { name: "rr", semi_major: "2", radius: "3", mass: "5" },
//   semi_major: "",
//   mass: "",
//   radius: "",
//   discovered: "",
//   updateData: (planet) =>
//     set((state) => ({
//       planet: planet,
//     })),
// }));

export default function Scene() {
  const { planet, updateData } = usePlanetStore((state) => state);

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

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  useEffect(() => {
    Data.forEach((item, i) => {
      if (star_name != item.star_name && star_name != "!") {
        dataSysteme.push(JSON.parse(JSON.stringify(dataPlanetes)));
        dataPlanete = {};
        dataPlanetes = [];
      }

      star_name = item.star_name;

      dataPlanete.star_name = item.star_name;
      dataPlanete.name = item.name;
      dataPlanete.mass = Math.round(item.mass * 100) / 100;
      dataPlanete.radius = Math.round(item.radius * 100) / 100;
      dataPlanete.semi_major_axis =
        Math.round(item.semi_major_axis * 100) / 100;
      dataPlanete.period = Math.round(item.orbital_period * 100) / 100;
      dataPlanete.star_radius = Math.round(item.star_radius * 100) / 100;
      dataPlanete.colorMap = "/earth.jpg";
      dataPlanete.text = item.name;
      dataPlanete.discovered = item.discovered;
      // dataPlanete.star_mass = item.name;

      dataPlanetes.push(JSON.parse(JSON.stringify(dataPlanete)));
    });

    dataSysteme.push(JSON.parse(JSON.stringify(dataPlanetes)));

    // dataSysteme.map((x)=>{x.uid:getRandomInt(1,1000)})

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

  const [pos2, setPos2] = useState([-20, 0, 20]);

  // const [droite, setDroite] = useState(false);
  // const [gauche, setGauche] = useState(false);
  // const [nActive, setnActive] = useState(2);

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
  // var gachette = useRef(false);

  // function shift(arr) {
  //   return arr.map((_, i, a) => a[(i + a.length + 1) % a.length]);
  // }

  // function shiftBackward(arr) {
  //   return arr.map((_, i, a) => a[(i + a.length - 1) % a.length]);
  // }

  // const bears = useBearStore((state) => state.nActive);

  const {
    nActive,
    droite,
    gauche,
    gachette,
    onClickgauche,
    updateGachette,
    stopDroite,
    stopGauche,
    nActiveUp,
    nActiveDown,
  } = useDeplacementStore((state) => state);

  var progress = null;

  useFrame((state, delta) => {
    // if (!progress) progress = delta;
    // var progress = time - startTime;
    // const paw = useBearStore.getState().nActive;
    // console.log(delta);

    // if (progress < 0.1) {
    //   progress = progress + delta;
    // }
    // if (progress > 0.1) {
    if (1 == 1) {
      // progress = 0;
      // console.log(bears);
      if (droite && (gachette || cumulDecalage.current != 0)) {
        // console.log("nActive2", nActive2);
        // gachette.current = false;
        updateGachette();
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
          // console.log("droite", refDataSystemes.current);

          // setDroite(false);
          stopDroite();
          nActiveDown();
          // refDataSystemes.current = shift(refDataSystemes.current);
        }
      }

      if (gauche && (gachette || cumulDecalage.current != 0)) {
        let theta = -0.5;

        cumulDecalage.current += theta;
        updateGachette();

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
          stopGauche();
          nActiveUp();
        }
      }
    }
  });

  // console.log("data", dataLoaded, refDataSystemes);
  return (
    <>
      {/* <Html>
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
      </Html> */}
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
