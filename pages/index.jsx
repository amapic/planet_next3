import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  createContext,
} from "react";
import dynamic from "next/dynamic";
// import Player  from "../components_planet/audio";

import { Canvas, extend } from "@react-three/fiber";

import * as THREE from "three";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

// import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import PanelGauche, { PanelPlanete } from "../components_planet/PanneauMobile";



import {
  Stats,
  OrbitControls,
  Text,
  Text3D,
} from "@react-three/drei";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

import TransitionProvider, {
  TransitionLayout,
  FadeInOut,
  AnimateInOut,
  CuubeCanvas,
} from "../components_planet/context";

// import { Debug, Physics, usePlane, useSphere } from "@react-three/cannon";

// import { UnrealBloomPass, WaterPass } from "three-stdlib";
import { useControls } from "leva";
import { Effects, Stars } from "@react-three/drei";
import { useMediaQuery } from 'react-responsive'
import Scene from "../components_planet/Scene";

import Carousel from "../components_planet/Carousel";

import Navv from "../components_planet/Nav";

// import FrameLimiter, { FPSLimiter } from "../components_planet/FrameLimiter";

// extend({ UnrealBloomPass });

import { create } from "zustand";

export const AppContext = createContext();

const App = () => {
  // const cam = useRef();
  const [nActive2, setUsers] = useState(0);

  const [_isMobile, setMobile] = useState(true);

  // useEffect(() => {
  //   // setMobile(isMobile);
  //   // alert(isMobile);
  // }, []);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  // console.log("rr",isMobile);

  const dispatchUserEvent = (payload) => {
    setUsers(payload);
  };

  function useDeviceDetect() {
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);
    React.useEffect(() => {
      if (!window.matchMedia) return;
      setIsTouchDevice(window.matchMedia("(pointer:coarse)").matches);
    }, []);

    return isTouchDevice;
  }
  // var isNotTouchDevice = true;

  // const { name, updateData } = usePlanetStore((state) => state);

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

  // const values = useContext(MyContext);

  // useEffect(() => {
  //   isPlaying ? audio.play() : audio.pause();
  // }, [isPlaying]);

  useEffect(() => {
    // if (window.innerWidth <= 768) {
    //   FOV = 50
    //   FAR = 1200
    //   // 769px - 1080px screen width camera
    // } else if (window.innerWidth >= 769 && window.innerWidth <= 1080) {
    //   FOV = 50
    //   FAR = 1475
    //   // > 1080px screen width res camera
    // } else {
    //   FOV = 40
    //   FAR = 1000
    // }
  }, []);

  return (
    <>
      {/* <BrowserView> */}
        {/* {isTabletOrMobile && <CuubeCanvas />} */}
        {/* {isTabletOrMobile && <TransitionProvider> */}
          {/* <TransitionLayout> */}
            {/* <FadeInOut> */}
            
            {!isTabletOrMobile && 
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

                {/* <Carousel /> */}
                {/* <Navv /> */}
                {/* <div
            style={{
              height: "15vh",
              width: "40vh",
              position:"fixed",
              right:"5vw",
              bottom:"40vh",
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              zIndex:"10000"
            }}
            >
               
               <a style={{
                cursor: "pointer"
               }} href="http://46.101.250.41:4000/agap2/agap2.html"><img height="100%" width="50vh" src="/planet/image/fleche_gauche.svg"/></a>
               <a 
               style={{
                cursor: "pointer"
               }}
               href="http://46.101.250.41:4000/siteWeb1/index.html"><img height="100%" width="50vh" src="/planet/image/fleche_droit.svg"/></a>
            </div>  */}

                <Canvas
                  // concurrent="true"
                  // dpr={[1, 2]}
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
                      // height={300},
                      mipmapBlur={true}
                      intensity={intensity}
                      radius={radius}
                    />
                  </EffectComposer>

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

                  {/* <Physics allowSleep={false} gravity={[0, 0, 0]}> */}
                    <Scene />
                  {/* </Physics> */}
                  {/* </Suspense> */}
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
                  cursor: "pointer"
                  
                  // display: _isMobile ? "none" : "block",
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
                  // display: _isMobile ? "none" : "block",
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
              </>}
              {/* ) : ( */}
            {/* </FadeInOut> */}
          {/* </TransitionLayout> */}
        {/* // </TransitionProvider>} */}
                  
        {isTabletOrMobile && <div
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
          Site non optimisé pour Smartphone. Merci de revenir consulter cette page sur PC !
        </div>}
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



export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
