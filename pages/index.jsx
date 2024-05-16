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
import PanelGauche, { PanelPlanete } from "../components/PanneauMobile";
import { Stats, OrbitControls, Text, Text3D } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { useDeplacementStore } from "../components/store/store";
import { Physics } from "@react-three/cannon";
import { Effects, Stars } from "@react-three/drei";

import Scene from "../components/Scene";
import {Fleche,Carre} from "../components/Fleche";

import Head from "next/head";
export const AppContext = createContext();
const App = () => {

  const [_isMobile, setMobile] = useState(true);

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
              
            </Canvas>
          </div>
        </>
      )}

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
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
