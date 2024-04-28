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
  const [hovered, setHovered] = useState(false);
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-width / 2, -height / 2 + radius);
    s.lineTo(-width / 2, height / 2 - radius);
    s.lineTo(width / 2 - radius, 0);
    s.moveTo(-width / 2, -height / 2 + radius);
    s.lineTo(-width / 2 + radius, -height / 2);
    return new THREE.Shape(s.getPoints(8));
  }, [width, height, radius, depth]);
  const config = useMemo(() => ({ depth, bevelEnabled: false }), [depth]);
  useEffect(() => {
    geometry.current.translate(-depth / 2, 0, 0);
    geometry.current.computeVertexNormals();
  }, [shape]);
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
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 0, width));
  points.push(new THREE.Vector3(0, height, width));
  points.push(new THREE.Vector3(0, height, 0));
  points.push(new THREE.Vector3(0, 0, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
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
  useEffect(() => {
    if (ref.current) {
      ref.current.geometry.setFromPoints(points);
    }
  });
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
          
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 5]}
          />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Text ref={textRef} fontSize={4} color="#555">
            hello
          </Text>
         
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
