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

import PanelGauche from "../components/panneaugauche";

extend({ TextGeometry });

import roboto from "../components/Roboto_Regular.json";
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
import Header from "../components/Header";

// import {ColorShiftMaterial,ColorShiftMaterial2,Wave} from "../components/customShader";
// import ItemList from "./LoopCreation";
// import { Effects, BloomPerso } from "./Effects";
import FrameLimiter, { FPSLimiter } from "../components/FrameLimiter";

import TextteQuiTourne from "../components/texteQuitourne";
// import { SSAOPass } from "three-stdlib";

// function RenderHud({ defaultScene, defaultCamera, renderPriority = 1 }) {
//   const { gl, scene, camera } = useThree();
//   useFrame(() => {
//     if (renderPriority === 1) {
//       // Clear scene and render the default scene
//       gl.autoClear = true;
//       gl.render(defaultScene, defaultCamera);
//     }
//     // Disable cleaning and render the portal with its own camera
//     gl.autoClear = false;
//     gl.clearDepth();
//     gl.render(scene, camera);
//   }, renderPriority);
// }

// function Hud({ children, renderPriority = 1 }) {
//   const { scene: defaultScene, camera: defaultCamera } = useThree();
//   const [hudScene] = useState(() => new three.Scene());
//   return createPortal(
//     <>
//       {children}
//       <RenderHud
//         defaultScene={defaultScene}
//         defaultCamera={defaultCamera}
//         renderPriority={renderPriority}
//       />
//     </>,
//     hudScene,
//     { events: { priority: renderPriority + 1 } }
//   );
// }
// import { Pass } from "three";
// import { SSAO } from "three/examples/jsm/postprocessing";
// import { EffectComposer, SSAO, SMAA } from "@react-three/drei/po";
// import { SSAO } from "@react-three/postprocessing";
// import { SSAO, SSR } from "@react-three/postprocessing";

// import {
//   EffectComposer,
//   DepthOfField,
//   Bloom,
//   Noise,
//   Vignette,
// } from "@react-three/postprocessing";

// extend({ UnrealBloomPass, WaterPass, GlitchPass ,ColorShiftMaterial,ColorShiftMaterial2});
extend({ UnrealBloomPass });

// extend({ colorShiftMaterial });

const App2 = () => {
  const cam = useRef();

  // const { size, scene, camera } = useThree();
  // const aspect = useMemo(() => new three.Vector2(100, 100), []);
  const { intensity, radius } = useControls({
    intensity: { value: 1, min: 0, max: 1.5, step: 0.01 },
    radius: { value: 0.4, min: 0, max: 1, step: 0.01 },
  });

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* <Header /> */}
        <PanelGauche />

        <Canvas
          concurrent="true"
          style={{
            display: "none",
          }}
          camera={{
            near: 0.1,
            far: 1000,
            zoom: 1,
            position: [4, 4, 4],
          }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor("#252934");
            camera.lookAt(0, 0, 0);
            camera.position.set(4, 4, 4);
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

          {/* <Stats /> */}
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
              {/* <Wave position={[2,-2,-2]} /> */}
              {/* <mesh position={[1,-1,-1]}>
              <boxGeometry args={[1, 1, 1]} />
              <colorShiftMaterial color="hotpink" time={1} toneMapped={false} />
              {/* <colorShiftMaterial  color="hotpink" time={1} /> 
            </mesh> */}
              {/* <Fform /> */}
              {/* <mesh position={[0, 6, 0]} >
              <Fform radius={0.4} />
              <meshBasicMaterial wireframe color={[255, 10, 1]} toneMapped={false} />
            </mesh> */}
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

            {/* <Hud renderPriority={2}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <Line />
            {/* <Effects> */}
            {/* <sSAOPass args={[scene, camera, 100, 100]} kernelRadius={1.2} kernelSize={0} /> */}
            {/* <glitchPass /> */}
            {/* </Effects> */}
            {/* <mesh>
              <ringGeometry args={[0.5, 1, 64]} />
              <meshBasicMaterial color="hotpink" />
            </mesh> */}

            {/* <mesh position={[0, 1, 0]} toneMapped={false}>
              <BoxBlendGeometry radius={0.4} depth={0} />
              <meshBasicMaterial
                color={[255, 10, 1]}
                toneMapped={false}
                // wireframe
              />
            </mesh> */}

            {/* <group rotation={[0, 0, 1.7]}> */}
            {/* <mesh position={[0, 6, 0]} >
              <BoxBlendGeometry radius={0.4} depth={0} />
              <meshBasicMaterial color={[255, 10, 1]} toneMapped={false} />
            </mesh> */}
            {/* </group> */}
            {/* unrealBloomPass */}
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default App2;

{
  /* <RoundedRectangle args={[0.5, 1, 64, 1]} /> */
}
{
  /* <mesh position={[3, 3, 3]}
            
            >
              <bufferGeometry attach="geometry" geometry={yy} />
              <meshBasicMaterial color="hotpink" />
            </mesh> */
}

{
  /* <mesh>
          <kk.RoundedrectGeometry args={[0.5, 1, 64, 1]}>
              <meshBasicMaterial color="hotpink" />
              </mesh> */
}
