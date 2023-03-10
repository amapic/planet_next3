import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";

import { useFrame } from "@react-three/fiber";

import { Container, BridgeContainer, BridgeContext } from "../pages/index";

import {
  RenderTexture,
  OrbitControls,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

import { Effects, Stars } from "@react-three/drei";

export default function BoxBlendGeometry({
  width = 3,
  height = 4,
  radius = 0.2,
  depth = 0.1,
  position,
}) {
  const geometry = useRef();

  // const ref = useRef();

  const [hovered, setHovered] = useState(false);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, -height / 2 + radius);
    s.lineTo(-width / 2, height / 2 - radius);
    // s.absarc(
    //   -width / 2 + radius,
    //   height / 2 - radius,
    //   radius,
    //   1 * Math.PI,
    //   0.5 * Math.PI,
    //   true
    // );
    s.lineTo(width / 2 - radius, 0);
    // s.absarc(
    //   width / 2 - radius,
    //   height / 2 - radius,
    //   radius,
    //   0.5 * Math.PI,
    //   0 * Math.PI,
    //   true
    // );
    s.moveTo(-width / 2, -height / 2 + radius);

    // s.absarc(
    //   width / 2 - radius,
    //   -height / 2 + radius,
    //   radius,
    //   2 * Math.PI,
    //   1.5 * Math.PI,
    //   true
    // );
    s.lineTo(-width / 2 + radius, -height / 2);

    // s.absarc(
    //   -width / 2 + radius,
    //   -height / 2 + radius,
    //   radius,
    //   1.5 * Math.PI,
    //   1 * Math.PI,
    //   true
    // );
    return new THREE.Shape(s.getPoints(8));
  }, [width, height, radius, depth]);

  const config = useMemo(() => ({ depth, bevelEnabled: false }), [depth]);

  useEffect(() => {
    geometry.current.translate(-depth / 2, 0, 0);
    geometry.current.computeVertexNormals();
  }, [shape]);

  // const geometry = new THREE.BufferGeometry().setFromPoints(points);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={position}
        rotation={[0, Math.PI / 2, 0]}
      >
        <extrudeGeometry
          ref={geometry}
          args={[shape, config]}
          color={hovered ? [127, 0, 127] : [127, 127, 127]}
          toneMapped={false}
        />
        <meshPhongMaterial />
      </mesh>
    </>
  );
}

export function Fform({ width = 1, height = 2, radius = 0.2, depth = 0.1 }) {
  // const geometry = useRef();

  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 0, width));
  points.push(new THREE.Vector3(0, height, width));
  points.push(new THREE.Vector3(0, height, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // const line = new THREE.Line( geometry, material );

  // const shape = useMemo(() => {
  //   const s = new THREE.Shape();
  //   s.moveTo(-width / 2, -height / 2 + radius);
  //   s.lineTo(-width / 2, height / 2 - radius);
  //   s.absarc(
  //     -width / 2 + radius,
  //     height / 2 - radius,
  //     radius,
  //     1 * Math.PI,
  //     0.5 * Math.PI,
  //     true
  //   );
  //   s.lineTo(width / 2 - radius, height / 2);
  //   s.absarc(
  //     width / 2 - radius,
  //     height / 2 - radius,
  //     radius,
  //     0.5 * Math.PI,
  //     0 * Math.PI,
  //     true
  //   );
  //   s.lineTo(width / 2, -height / 2 + radius);
  //   s.absarc(
  //     width / 2 - radius,
  //     -height / 2 + radius,
  //     radius,
  //     2 * Math.PI,
  //     1.5 * Math.PI,
  //     true
  //   );
  //   s.lineTo(-width / 2 + radius, -height / 2);
  //   s.absarc(
  //     -width / 2 + radius,
  //     -height / 2 + radius,
  //     radius,
  //     1.5 * Math.PI,
  //     1 * Math.PI,
  //     true
  //   );
  //   return new THREE.Shape(s.getPoints(10));
  // }, [width, height, radius, depth]);

  // const config = useMemo(() => ({ depth, bevelEnabled: false }), [depth]);
  // useEffect(() => {
  //   // useLayoutEffect(() => {
  //   // geometry.current.translate(0, 0, -depth / 2);
  //   geometry.current.computeVertexNormals();
  // }, [shape]);

  return <lineGeometry ref={geometry} />;
}

export function ArrayButton({ position }) {
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

  // var bb = new THREE.Vector3(1, 1, 1);
  useEffect(() => {
    if (ref.current) {
      ref.current.geometry.setFromPoints(points);
    }
  });

  // const { camera, size } = useThree();

  // useFrame(({ gl, scene, camera }) => {
  //   // Spin mesh to the inverse of the default cameras matrix
  //   if (ref2.current) {
  //     var aa = new THREE.Vector3(1, 1, 1);
  //     // aa.add(camera.position);
  //     // console.log(camera.position);
  //     // ref2.current.lookAt(aa);

  //     // function updatePositionForCamera(camera) {
  //     // fixed distance from camera to the object
  //     var dist = 10;
  //     var cwd = new THREE.Vector3();

  //     camera.getWorldDirection(cwd);

  //     // cwd.multiplyScalar(dist);
  //     cwd.add(camera.position);

  //     // ref.current.position.set(cwd.x - 2, cwd.y - 2, cwd.z - 2);
  //     // ref.current.setRotationFromQuaternion(camera.quaternion);
  //     // }
  //   }
  // });

  return (
    <mesh ref={ref2} position={position}>
      <line ref={ref}>
        <bufferGeometry />
        <lineBasicMaterial color={[127, 0, 127]} toneMapped={false} />
      </line>
    </mesh>
  );
}

export function Prout() {
  const textRef = useRef();
  useFrame(
    (state) =>
      (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2)
  );
  return (
    <mesh position={[-2, -2, -2]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial>
        <RenderTexture attach="map" anisotropy={16}>
          {/* <Effects disableGamma> */}
          {/* threshhold has to be 1, so nothing at all gets bloom by default */}

          {/* <SSAO /> */}
          {/* <sSAOPass /> */}
          {/* <Noise
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.ADD} // blend mode
          /> */}
          {/* <unrealBloomPass threshold={1} strength={intensity} radius={radius} /> */}
          {/* <glitchPass /> */}
          {/* </Effects> */}
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 5]}
          />
          {/* <color attach="background" args={["orange"]} /> */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Text ref={textRef} fontSize={4} color="#555">
            hello
          </Text>
          {/* <Dodecahedron /> */}
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
}

export function Spprite({ width = 1, height = 2, radius = 0.2, depth = 0.1 }) {
  const ref = useRef();
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 0, width));
  points.push(new THREE.Vector3(0, height, width));
  points.push(new THREE.Vector3(0, height, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (ref.current) {
      ref.current.setFromPoints(points);
    }
  });

  return <bufferGeometry ref={ref} />;
}
