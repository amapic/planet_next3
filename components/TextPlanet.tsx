import { Text } from "@react-three/drei";
import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";


export default function TextPlanet({
  text ,
  text2 ,
  text3 ,
  text4,
  period_orig = null,
  mass = null,
  // rayon = null,
  semi_major_axis_orig = null,
  // position,
  // hoveredd,
  clickedd,
  image,
  // info,
  star = false,
  centre = false,

}:{text?:number|null|string,text2?:number|string,text3?:number|null,text4?:number|null,rayon?:number |null
,position?:THREE.Vector3,clickedd:boolean,star:boolean,centre?:boolean
,period_orig?:null|number,image:dataPlaneteInt,semi_major_axis_orig?:null|number,mass?:null|number
}) {
  // mass, semi_major_axis_orig, hoveredd, image
  const myMeshText = useRef<THREE.Mesh>(null);
  const myMeshText2 = useRef<THREE.Mesh>(null);
  const myMeshText3 = useRef<THREE.Mesh>(null);
  const myMeshText4 = useRef<THREE.Mesh>(null);
  const myMesh2 = useRef<THREE.Mesh>(null);

  const prout = useRef();

  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  useFrame(({ gl, scene, camera }) => {
    if (
      myMeshText4.current &&
      myMeshText3.current &&
      myMeshText2.current &&
      myMeshText.current
    ) {
      myMeshText.current.lookAt(camera.position);
      myMeshText2.current.lookAt(camera.position);
      myMeshText3.current.lookAt(camera.position);
      myMeshText4.current.lookAt(camera.position);
    }
  });

  return (
    <group>
      {star && centre ? (
        <>
          <mesh
            position={[0, 1.6, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText4}
            // transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[0.13, 0.13, 0.13]}
              anchorX="center"
              anchorY="middle"
              color="white"
              // toneMapped={false}
            >
              {text4
                ? "Rayon : " +
                  parseFloat(text4.toPrecision(2)) +
                  " rayon solaire"
                : ""}
            </Text>
          </mesh>
          <mesh
            position={[0, 2.2, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText}
            // transparent={clickedd ? false : true}
            // opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[0.13, 0.13, 0.13]}
              anchorX="center"
              anchorY="middle"
              color="white"
              // toneMapped={false}
            >
              {text3
                ? "Distance : " +
                  parseFloat(text3.toPrecision(2)) +
                  " année lumière"
                : ""}
            </Text>
          </mesh>
          <mesh
            position={[0, 2.8, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText2}
            // transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[0.13, 0.13, 0.13]}
              anchorX="center"
              anchorY="middle"
              color="white"
              // toneMapped={false}
            >
              {text2 ? "Age : " + text2 + " milliard d'année" : ""}
            </Text>
          </mesh>
          <mesh
            position={[0, 3.4, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText3}
            // transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[0.13, 0.13, 0.13]}
              anchorX="center"
              anchorY="middle"
              color="white"
              // toneMapped={false}
            >
              {text}
            </Text>
          </mesh>
        </>
      ) : (
        ""
      )}
      {!star && clickedd ? (
        <>
          <mesh
            position={[0, 1, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText4}
            // transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[0.08, 0.08, 0.08]}
              anchorX="center"
              anchorY="middle"
              color="white"
              // toneMapped={false}
            >
              {period_orig
                ? "Période de révolution : " +
                  image.orbital_period_.toPrecision(2) +
                  "  jour"
                : ""}
            </Text>
          </mesh>
          <mesh
            position={[0, 1.5, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText}
            // transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[0.08, 0.08, 0.08]}
              anchorX="center"
              anchorY="middle"
              color="white"
              // toneMapped={false}
            >
              {semi_major_axis_orig
                ? "Demi grand-Axe : " +
                  image.semi_major_axis_.toPrecision(2) +
                  " UA"
                : ""}
            </Text>
          </mesh>
          <mesh
            position={[0, 2, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText2}
            // transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[0.08, 0.08, 0.08]}
              anchorX="center"
              anchorY="middle"
              color="white"
              // toneMapped={false}
            >
              {mass
                ? "Masse : " +
                  parseFloat(mass.toPrecision(2)) +
                  " masse jupitérienne"
                : ""}
            </Text>
          </mesh>
          <mesh
            position={[0, 2.5, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText3}
            // transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[0.08, 0.08, 0.08]}
              anchorX="center"
              anchorY="middle"
              color="white"
              // transparent={clickedd ? false : true}
              // toneMapped={false}
            >
              {text}
            </Text>
          </mesh>
        </>
      ) : (
        ""
      )}

      {!star && clickedd ? (
        <mesh position={[0, 3, 0]} ref={myMesh2}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial
            color={[0, 0, 255]}
            // emissiveIntensity={1}
            transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
            toneMapped={false}
          />
        </mesh>
      ) : (
        ""
      )}
    </group>
  );
}
