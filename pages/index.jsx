import React, { Suspense, useRef, useEffect, useState } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  createPortal,
} from "@react-three/fiber";

import { PerspectiveCamera, Hud } from "@react-three/drei";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import PanelGauche from "../components/PanneauMobile";

// extend({ TextGeometry });

import roboto from "../public/Roboto_Regular.json";

const font = new FontLoader().parse(roboto);

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

import BoxBlendGeometry, {
  Fform,
  Line,
  Prout,
  Spprite,
} from "../components/RoundedRectangle";

// extend({ colorShiftMaterial });

const App2 = () => {
  // const cam = useRef();

  // const { size, scene, camera } = useThree();
  // const aspect = useMemo(() => new three.Vector2(100, 100), []);
  const { intensity, radius, luminanceThreshold, luminanceSmoothing } =
    useControls({
      intensity: { value: 0.1, min: 0, max: 3, step: 0.01 },
      radius: { value: 0.9, min: 0, max: 1, step: 0.01 },
      luminanceThreshold: { value: 1, min: 0, max: 1, step: 0.01 },
      luminanceSmoothing: { value: 0.4, min: 0, max: 1, step: 0.01 },
    });

  // const intensity = 1;
  // const radius = 0.4;
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#252934",
        }}
      >
        {/* <Header /> */}
        <PanelGauche />

        <Canvas
          // concurrent="true"
          camera={{
            near: 0.1,
            far: 1000,
            zoom: 1,
            position: [4, 4, 4],
          }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor("#252934", 0);
            // gl.setClearColor("#000", 1);
            // 252934
            camera.lookAt(0, 0, 0);
            // camera.position.set(4, 4, 4);

            camera.position.set(12, 12, 12);
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
          <Line />
          {/* <BoxBlendGeometry /> */}
          {/* <Prout /> */}
          <Stats />
          <OrbitControls />
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
    </>
  );
};

export default App2;
