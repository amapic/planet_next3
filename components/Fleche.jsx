import {useEffect,useState,useRef} from "react"
import * as THREE from "three"
import { useDeplacementStore } from "../components/store/store";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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
export function Fleche({ position, flecheGauche, flecheDroite, rotation }) {
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
