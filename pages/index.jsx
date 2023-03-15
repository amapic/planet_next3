import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  createPortal,
} from "@react-three/fiber";

import * as THREE from "three";

import { PerspectiveCamera, Hud } from "@react-three/drei";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import PanelGauche, { PanelPlanete } from "../components/PanneauMobile";

// extend({ TextGeometry });

import roboto from "../public/Roboto_Regular.json";

const font = new FontLoader().parse(roboto);

// import { usePlanetStore } from "../components/store";

import {
  Stats,
  OrbitControls,
  Effects as EffectsComposer,
  // PerspectiveCamera,
  Text,
  Text3D,
} from "@react-three/drei";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { Debug, Physics, usePlane, useSphere } from "@react-three/cannon";
import * as three from "three";

import { useSpring, animated, config } from "@react-spring/three";

import { UnrealBloomPass, WaterPass } from "three-stdlib";
import { useControls } from "leva";
import { Effects, Stars } from "@react-three/drei";

import Scene from "../components/Scene";
import Header from "../components/Header";

import FrameLimiter, { FPSLimiter } from "../components/FrameLimiter";

import TextteQuiTourne from "../components/texteQuitourne";

extend({ UnrealBloomPass });

import { create } from "zustand";

import BoxBlendGeometry, {
  Fform,
  // Line,
  Prout,
  Spprite,
} from "../components/RoundedRectangle";

// export const MyContext = createContext();
// export const BridgeContext = React.createContext();

// export const Container = ({ children }) => (
//   <MyContext.Provider value={{ hello: "true", nActive: 0 }}>
//     {children}
//   </MyContext.Provider>
// );

// export const BridgeContainer = ({ value, children }) => {
//   return (
//     <BridgeContext.Provider value={{ ...value }}>
//       {children}
//     </BridgeContext.Provider>
//   );
// };

// extend({ colorShiftMaterial });

export const AppContext = createContext();

const App = () => {
  // const cam = useRef();
  const [nActive2, setUsers] = useState(0);

  const dispatchUserEvent = (payload) => {
    setUsers(payload);
  };

  const { name, updateData } = usePlanetStore((state) => state);

  const {
    nActive,
    droite,
    gauche,
    gachette,
    onClickGauche,
    onClickDroite,
    updateGachette,
    stopDroite,
    stopGauche,
  } = useDeplacementStore((state) => state);

  // const { size, scene, camera } = useThree();
  // const aspect = useMemo(() => new three.Vector2(100, 100), []);
  // const { intensity, radius, luminanceThreshold, luminanceSmoothing } =
  //   useControls({
  //     intensity: { value: 0.1, min: 0, max: 3, step: 0.01 },
  //     radius: { value: 0.9, min: 0, max: 1, step: 0.01 },
  //     luminanceThreshold: { value: 1, min: 0, max: 1, step: 0.01 },
  //     luminanceSmoothing: { value: 0.4, min: 0, max: 1, step: 0.01 },
  //   });

  // const { x,y,z} =
  //   useControls({
  //     x: { value: 0.1, min: 0, max: 3, step: 0.01 },
  //     y: { value: 0.9, min: 0, max: 1, step: 0.01 },
  //     z: { value: 1, min: 0, max: 1, step: 0.01 },
  //     luminanceSmoothing: { value: 0.4, min: 0, max: 1, step: 0.01 },
  //   });

  const intensity = 0.1;
  const radius = 0.9;
  const luminanceThreshold = 1;
  const luminanceSmoothing = 1;

  // const values = useContext(MyContext);

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#252934",
        }}
      >
        <PanelGauche />

        <Canvas
          // concurrent="true"
          // dpr={[1, 2]}
          gl={{ antialias: false }}
          camera={{
            near: 0.1,
            far: 1000,
            zoom: 1,
            position: [4, 4, 4],
            maxPolarAngle:0.85
          }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor("#252934", 0);
            // gl.setClearColor("#000", 1);
            // 252934
            camera.lookAt(0, 0, 0);
            // camera.position.set(4, 4, 4);

            camera.position.set(10, 3, 10);
          }}
        >
          <EffectComposer>
            <Bloom
              luminanceThreshold={luminanceThreshold}
              luminanceSmoothing={luminanceSmoothing}
              // height={300},
              mipmapBlur={true}
              intensity={intensity}
              radius={radius}
            />
          </EffectComposer>
          {/* <sprite position={[1, 2, 3]}>
            <Spprite />
          </sprite> */}
          {/* <Hud>
            <EffectComposer>
              <Bloom
                luminanceThreshold={luminanceThreshold}
                luminanceSmoothing={luminanceSmoothing}
                // height={300},
                mipmapBlur={true}
                intensity={intensity}
                radius={radius}
              />
            </EffectComposer>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          </Hud> */}
          {/* <FrameLimiter /> */}
          {/* <FPSLimiter /> 
          // <Effects disableGamma>
          //   <unrealBloomPass
          //     threshold={1}
          //     strength={intensity}
          //     radius={radius}
          //   />
          // </Effects>*/}
          {/* <Line position={[0, 0, 0]} /> */}
          {/* <BoxBlendGeometry /> */}
          {/* <Prout /> */}
          <Stats />
          <OrbitControls 
          // maxPolarAngle={0.85}
          maxDistance={20}
          />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <Suspense fallback={null}>
            <Physics allowSleep={false} gravity={[0, 0, 0]}>
              <Scene />
            </Physics>
          </Suspense>
        </Canvas>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "10vh",
          left: "10vh",
          height: "20vh",
          width: "20vh",
          backgroundColor: "rgba(0, 0, 0, 0)",
          cursor: "pointer",
        }}
        onClick={() => {
          if (nActive > 0) {
            onClickGauche();
          }
        }}
      >
        <Canvas
          orthographic
          camera={{
            near: 0.1,
            far: 10,
            zoom: 25,
            position: [0.2, 0, 0],
           
          }}
        >
          <EffectComposer>
            <Bloom
              luminanceThreshold={luminanceThreshold}
              luminanceSmoothing={luminanceSmoothing}
              // height={300},
              mipmapBlur={true}
              intensity={intensity}
              radius={radius}
            />
          </EffectComposer>
          <Carre
            flecheGauche={true}
            flecheDroite={false}
            position={[0, -2, -2]}
          />
          <Fleche
            flecheGauche={true}
            flecheDroite={false}
            position={[0, -1.5, -1.5]}
            rotation={[0, 0, 0]}
          />
        </Canvas>
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "10vh",
          right: "10vh",
          height: "20vh",
          width: "20vh",
          backgroundColor: "rgba(0, 0, 0, 0)",
          cursor: "pointer",
        }}
        onClick={() => {
          if (nActive < 5) {
            onClickDroite();
          }
        }}
      >
        <Canvas
          orthographic
          camera={{
            near: 0.1,
            far: 10,
            zoom: 25,
            position: [0.2, 0, 0],
          }}
        >
          <EffectComposer>
            <Bloom
              luminanceThreshold={luminanceThreshold}
              luminanceSmoothing={luminanceSmoothing}
              // height={300},
              mipmapBlur={true}
              intensity={intensity}
              radius={radius}
            />
          </EffectComposer>
          <Carre
            flecheDroite={true}
            flecheGauche={false}
            position={[0, -2, -2]}
          />
          <Fleche
            flecheDroite={true}
            flecheGauche={false}
            position={[0, 1.5, 1.5]}
            rotation={[Math.PI, 0, 0]}
          />

          {/* <BoxBlendGeometry position={[0, 0, 0]} /> */}
        </Canvas>
      </div>
    </>
  );
};

export function Carre({ position, flecheGauche, flecheDroite }) {
  const width = 4;
  const height = 4;
  const ref = useRef();
  const ref2 = useRef();
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 0, width));
  points.push(new THREE.Vector3(0, height, width));
  points.push(new THREE.Vector3(0, height, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  const [hovered, setHovered] = useState(false);


  useEffect(() => {
    if (ref.current) {
      ref.current.geometry.setFromPoints(points);
    }
  });



  const {
    nActive,
    droite,
    gauche,
    gachette,
    onClickGauche,
    onClickDroite,
    updateGachette,
    stopDroite,
    stopGauche,
  } = useDeplacementStore((state) => state);

  return (
    <mesh ref={ref2} position={position}>
      <line ref={ref}>
        <bufferGeometry />
        <lineBasicMaterial color={[127, 0, 127]} toneMapped={false} />
      </line>
    </mesh>
  );
}

function Fleche({ position, flecheGauche, flecheDroite, rotation }) {
  const width = 3;
  const height = 3;
  const ref = useRef();
  const ref2 = useRef();
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, height, 0));
  points.push(new THREE.Vector3(0, height / 2, width));
  points.push(new THREE.Vector3(0, 0, 0));

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.geometry.setFromPoints(points);
    }
  });

  return (
    <mesh ref={ref2} position={position} rotation={rotation}>
      <line ref={ref}>
        <bufferGeometry />
        <lineBasicMaterial color={[127, 0, 127]} toneMapped={false} />
      </line>
    </mesh>
  );
}

export const useDeplacementStore = create((set) => ({
  nActive: 2,
  gachette: false,
  droite: false,
  gauche: false,
  onClickGauche: () =>
    set((state) => ({
      gachette: true,
      droite: true,
    })),
  onClickDroite: () =>
    set((state) => ({
      gachette: true,
      gauche: true,
    })),
  updateGachette: () => set((state) => ({ gachette: false })),
  stopDroite: () => set((state) => ({ gauche: false, droite: false })),
  stopGauche: () => set((state) => ({ droite: false, gauche: false })),
  nActiveUp: () => set((state) => ({ nActive: state.nActive + 1 })),
  nActiveDown: () => set((state) => ({ nActive: state.nActive - 1 })),
}));

export const usePlanetStore = create((set) => ({
  planet: { name: "" },
  updateData: (planet) =>
    set((state) => ({
      planet: planet,
    })),
}));

export default App;
