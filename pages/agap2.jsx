import React, { Suspense, useRef, useEffect, useState } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  createPortal,
} from "@react-three/fiber";

// import { Hook, Console } from "console-feed";

import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import PanelGauche from "../components/panneaugauche";

extend({ TextGeometry });

import roboto from "../public/Roboto_Regular.json";
// import scifiFont from "../public/sc2font.json";

const font = new FontLoader().parse(roboto);
// const scifiFont = new FontLoader().parse(scifiFont);

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

// import * as Demo from "../components/demo.js";
// import "./styles.css";
import { useSpring, animated, config } from "@react-spring/three";

import { UnrealBloomPass, WaterPass } from "three-stdlib";
import { useControls } from "leva";
import { Effects, Stars } from "@react-three/drei";

// import BoxBlendGeometry, {
//   Fform,
//   Line,
//   Prout,
// } from "../components/RoundedRectangle";

import Scene from "../components/Scene";
import Header from "../components/Header";

import FrameLimiter, { FPSLimiter } from "../components/FrameLimiter";

import TextteQuiTourne from "../components/texteQuitourne";

extend({ UnrealBloomPass });

// extend({ colorShiftMaterial });

const App2 = () => {
  // const cam = useRef();

  // const { size, scene, camera } = useThree();
  // const aspect = useMemo(() => new three.Vector2(100, 100), []);
  // const { intensity, radius } = useControls({
  //   intensity: { value: 1, min: 0, max: 1.5, step: 0.01 },
  //   radius: { value: 0.4, min: 0, max: 1, step: 0.01 },
  // });

  const intensity = 1;
  const radius = 0.4;
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Header />
        <PanelGauche />
        {/* <div style={{ backgroundColor: "#242424" }}>
          <Console logs={logs} variant="dark" />
        </div> */}
        <Canvas
          concurrent="true"
          style={
            {
              // display: "none",
            }
          }
          camera={{
            near: 0.1,
            far: 1000,
            zoom: 1,
            position: [4, 4, 4],
          }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor("#252934", 0);
            // 252934
            camera.lookAt(0, 0, 0);
            // camera.position.set(4, 4, 4);

            camera.position.set(12, 12, 12);
          }}
        >
          <FrameLimiter />
          {/* <FPSLimiter /> */}
          <Effects disableGamma>
            <unrealBloomPass
              threshold={1}
              strength={intensity}
              radius={radius}
            />
          </Effects>

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

              {/* <Line /> */}
              {/* <Prout /> */}
              <mesh>
                {/* <TextGeometry args={["tett",{font,size:10,height:10}]}/> */}
                <Text
                  position={[2, 2, 2]}
                  scale={[10, 10, 10]}
                  anchorX="center" // default
                  anchorY="middle" // default
                  color="white"
                  // ref={myMesh2}
                  // fillOpacity={hoveredd ? 1 : 0}
                  // onUpdate={(x) => {}}
                  toneMapped={false}
                >
                  {/* AA */}
                </Text>
                <meshPhysicalMaterial attach="material" color={"white"} />
              </mesh>
            </Physics>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default App2;
