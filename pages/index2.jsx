import React, { Suspense, useRef, useEffect, useState } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  createPortal,
} from "@react-three/fiber";

import { SSAOPass, GlitchPass } from "three-stdlib";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

extend({ TextGeometry });

import roboto from "../components/Roboto_Regular.json";

const font = new FontLoader().parse(roboto);

// extend({ SSAOPass,GlitchPass })

import {
  Stats,
  OrbitControls,
  Effects as EffectsComposer,
  PerspectiveCamera,
  Text,
  Text3D,
} from "@react-three/drei";

import { Debug, Physics, usePlane, useSphere } from "@react-three/cannon";
import * as three from "three";
// import "./styles.css";
import { useSpring, animated, config } from "@react-spring/three";

import { UnrealBloomPass, WaterPass } from "three-stdlib";
import { useControls } from "leva";
import { Effects, Stars } from "@react-three/drei";

import BoxBlendGeometry, {
  Fform,
  Line,
  Prout,
} from "../components/RoundedRectangle";

import CardPlanet from "../components/TextPlanet";
import Planet from "../components/Planet";
import Scene from "../components/Scene";

import {
  ColorShiftMaterial,
  ColorShiftMaterial2,
  Wave,
  HelloBlue,
} from "../components/customShader";
// import ItemList from "./LoopCreation";
// import { Effects, BloomPerso } from "./Effects";
import FrameLimiter, { FPSLimiter } from "../components/FrameLimiter";

extend({ ColorShiftMaterial, ColorShiftMaterial2 });

const App2 = () => {
  const cam = useRef();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="grid grid-cols-4 grid-rows-4 gap-0 top-0 left-0 w-full h-screen pointer-events-none select-none z-2 absolute trace">
        <div className="border-2 border-red-500">01</div>
        <div className="border-2 border-red-500">01</div>
        <div className="border-2 border-red-500">01</div>
        <div className="border-2 border-red-500">01</div>
        <div className="border-2 border-red-500">01</div>
        <div className="border-2 border-red-500">01</div>
      </div>
      <div className="w-50">
        <div className="px-3 text-white">AAA</div>
      </div>
      RRRRRRRRRRR
      <Canvas
        concurrent
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [4, 4, 4],
        }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor("#252934");
          //
          camera.lookAt(0, 0, 0);
          camera.position.set(4, 4, 4);
          // console.log(window.devicePixelRatio);
        }}
      >
        <OrbitControls />

        <Suspense fallback={null}>
          {/* <mesh>
            <planeGeometry args={[1,1,1]} />
            <meshBasicMaterial color={"pink"} />
          </mesh> */}
          <mesh position={[1, -1, -1]}>
            <boxGeometry args={[1, 1, 1]} />
            <colorShiftMaterial color="hotpink" time={1} toneMapped={false} />
          </mesh>
          {/* <HelloBlue blue={0.5} /> */}
          {/* <Wave position={[2, -2, -2]} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App2;
