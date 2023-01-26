import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  useMemo,
} from "react";

import { useFrame } from "@react-three/fiber";

import {RenderTexture, OrbitControls, PerspectiveCamera, Text} from "@react-three/drei";
import * as THREE from "three";

import { Effects, Stars } from "@react-three/drei";

export default function BoxBlendGeometry({
  width = 1,
  height = 2,
  radius = 0.2,
  depth = 0.1,
}) {
  const geometry = useRef();
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, -height / 2 + radius);
    s.lineTo(-width / 2, height / 2 - radius);
    s.absarc(
      -width / 2 + radius,
      height / 2 - radius,
      radius,
      1 * Math.PI,
      0.5 * Math.PI,
      true
    );
    s.lineTo(width / 2 - radius, height / 2);
    s.absarc(
      width / 2 - radius,
      height / 2 - radius,
      radius,
      0.5 * Math.PI,
      0 * Math.PI,
      true
    );
    s.lineTo(width / 2, -height / 2 + radius);
    s.absarc(
      width / 2 - radius,
      -height / 2 + radius,
      radius,
      2 * Math.PI,
      1.5 * Math.PI,
      true
    );
    s.lineTo(-width / 2 + radius, -height / 2);
    s.absarc(
      -width / 2 + radius,
      -height / 2 + radius,
      radius,
      1.5 * Math.PI,
      1 * Math.PI,
      true
    );
    return new THREE.Shape(s.getPoints(10));
  }, [width, height, radius, depth]);

  const config = useMemo(() => ({ depth, bevelEnabled: false }), [depth]);
  useEffect(() => {
    // useLayoutEffect(() => {
    geometry.current.translate(0, 0, -depth / 2);
    geometry.current.computeVertexNormals();
  }, [shape]);
  return <extrudeGeometry ref={geometry} args={[shape, config]} />;
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

export function Line() {
  const width = 4;
  const height = 4;
  const ref = useRef();
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 0, width));
  points.push(new THREE.Vector3(0, height, width));
  points.push(new THREE.Vector3(0, height, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (ref.current) {
      ref.current.geometry.setFromPoints(points);
    }
  });
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={[127, 255, 0]} toneMapped={false} />
    </line>
  );
}

export function Prout() {

  const textRef = useRef()
  useFrame((state) => (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2))
  return (
    <mesh position={[-2,-2,-2]}>
      <boxGeometry args={[2,2,2]}/>
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
