import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  createContext,
} from "react";
import dynamic from "next/dynamic";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import PanelGauche, { PanelPlanete } from "../components_planet/PanneauMobile";
import { Stats, OrbitControls, Text, Text3D } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import TransitionProvider, {
//   TransitionLayout,
//   FadeInOut,
//   AnimateInOut,
//   CuubeCanvas,
// } from "../components_planet/context";
import { useDeplacementStore } from "../components_planet/store/store";
import { Physics } from "@react-three/cannon";
import { Effects, Stars } from "@react-three/drei";
// import { useMediaQuery } from "react-responsive";
import Scene from "../components_planet/Scene";
// import Carousel from "../components_planet/Carousel";
// import Navv from "../components_planet/Nav";
// import { create } from "zustand";
import Head from "next/head";
export const AppContext = createContext();
const App = () => {
  // const [nActive2, setUsers] = useState(0);
  const [_isMobile, setMobile] = useState(true);
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: "(min-width: 1224px)",
  // });
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  // const dispatchUserEvent = (payload) => {
  //   setUsers(payload);
  // };
  function useDeviceDetect() {
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);
    React.useEffect(() => {
      if (!window.matchMedia) return;
      setIsTouchDevice(window.matchMedia("(pointer:coarse)").matches);
    }, []);
    return isTouchDevice;
  }
  const isTabletOrMobile = useDeviceDetect()
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
  const intensity = 0.1;
  const radius = 0.9;
  const luminanceThreshold = 1;
  const luminanceSmoothing = 1;
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {}, []);
  return (
    <>
    <Head>
        <title>Amaury PICHAT</title>
      </Head>
    
      {!isTabletOrMobile && (
        <>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: "#252934",
              display: isTabletOrMobile ? "none" : "block",
            }}
          >
            <PanelGauche />
            <Canvas
              gl={{ antialias: false }}
              camera={{
                near: 0.1,
                far: 50,
                zoom: 1,
                position: [4, 4, 4],
                maxPolarAngle: 0.85,
              }}
              onCreated={({ gl, camera }) => {
                gl.setClearColor("#252934", 0);
                camera.lookAt(0, 0, 0);
                camera.position.set(10, 3, 10);
              }}
            >
              <EffectComposer>
                <Bloom
                  luminanceThreshold={luminanceThreshold}
                  luminanceSmoothing={luminanceSmoothing}
                  mipmapBlur={true}
                  intensity={intensity}
                  radius={radius}
                />
              </EffectComposer>
              <OrbitControls maxDistance={20} />
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
              />
              <Physics allowSleep={false} gravity={[0, 0, 0]}>
                <Scene />
              </Physics>
              {}
            </Canvas>
          </div>
          <div
            id="div_canvas1"
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
              {}
            </Canvas>
          </div>
        </>
      )}
      {}
      {}
      {}
      {}
      {isTabletOrMobile && (
        <div
          style={{
            backgroundColor: "white",
            height: "100vh",
            width: "100wh",
            color: "black",
            textAlign: "center",
            lineHeight: "25vh",
            display: isTabletOrMobile ? "block" : "none",
          }}
        >
          Site non optimisé pour Smartphone. Merci de revenir consulter cette
          page sur PC !
        </div>
      )}
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
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
