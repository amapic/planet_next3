import { useRef, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { MeshBasicMaterial, PlaneGeometry } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useControls } from "leva";
import * as THREE from "three";
import { ScrollControls, useScroll } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
function PictureSlide({ i }) {
  const ref = useRef();
  const data = useScroll();
  const map = useLoader(TextureLoader, `homepage/${i + 1}.jpg`);
  const vec = new THREE.Vector3();
  const [hover, setHover] = useState([1, 1, 1]);
  const rrandom = useRef(0);

  rrandom.current = rrandom.current = 0 ? Math.random() : rrandom.current;

  const { scale } = useSpring({
    scale: hover ? [1.1, 1.1, 1] : [1, 1, 1],
  });

  const { rotation } = useSpring({
    rotation: hover ? [0, -0.2, 0] : [0, 0, 0],
  });

  useFrame(({ gl, scene, camera }) => {
    ref.current.position.y = data.offset * 5 * 2 - i * 2;
  });

  return (
    <animated.mesh
      scale={scale}
      rotation={rotation}
      ref={ref}
      position={[rrandom.current + 1, -i * 2, 0]}
      onPointerEnter={() => {
        setHover(true);
      }}
      onPointerLeave={() => {
        setHover(false);
      }}
    >
      <planeGeometry args={[1.5, 1.5, 16, 16]} />
      <meshBasicMaterial map={map} />
    </animated.mesh>
  );
}

function Scene() {
  return (
    <group>
      <PictureSlide i={0} />
      <PictureSlide i={1} />
      <PictureSlide i={2} />
      <PictureSlide i={3} />
      <PictureSlide i={4} />
      <PictureSlide i={5} />
    </group>
  );
}

export default function App() {
  const { y } = useControls({
    y: { value: 1, min: -5, max: 5, step: 0.01 },
    // radius: { value: 0.4, min: 0, max: 1, step: 0.01 },
  });

  function scrolll(e) {
    console.log(e);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
          position: [0, 0, 2],
        }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor("#000", 1);
        }}
      >
        <ScrollControls pages={1}>
          <ambientLight intensity={0.5} />
          <pointLight color="white" intensity={1} position={[10, 10, 10]} />
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
