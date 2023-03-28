/* eslint-disable */
import { Text } from "@react-three/drei";
import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import roboto from "../public/Roboto_Regular.json";

import * as THREE from "three";

import Parser from "html-react-parser";

export default function TextPlanet({
  text = null,
  text2 = null,
  text3 = null,
  text4 = null,
  period_orig=null,
  mass=null,
  rayon=null,
  semi_major_axis_orig=null,
  position,
  hoveredd,
  clickedd,
  image,
  info,
  star = false,
  centre=false,
  ...args
}) {
  const myMeshText = useRef();
  const myMeshText2 = useRef();
  const myMeshText3 = useRef();
  const myMeshText4 = useRef();
  const myMesh2 = useRef();

  if (!star && clickedd){
    // console.log(image)
  }

  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));



  useFrame(({ gl, scene, camera }) => {
    if (myMeshText4.current && myMeshText3.current && myMeshText2.current && myMeshText.current) {
      myMeshText.current.lookAt(camera.position); // <-- should work when uncomment
      myMeshText2.current.lookAt(camera.position);
      myMeshText3.current.lookAt(camera.position);
      myMeshText4.current.lookAt(camera.position);
    }
  });

  const font = new FontLoader().parse(roboto);

  return (
    <group>
      {(star && centre) ? (
        <>
          <mesh
            position={[0, 2, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText4}
            transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[1, 1, 1]}
              anchorX="center" // default
              anchorY="middle" // default
              color="white"
              // ref={myMesh}
              // fillOpacity={hoveredd ? 1 : 0}
              toneMapped={false}
              // transparent={star ? true : false}
            >
              {/* {clickedd ? "cliqué" : ""} */}
              {text4?"Rayon : " + parseFloat(text4.toPrecision(2)) + " rayon solaire":""}
            </Text>
          </mesh>
          <mesh
            position={[0, 2.5, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText}
            transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[1, 1, 1]}
              anchorX="center" // default
              anchorY="middle" // default
              color="white"
              // ref={myMesh}
              // fillOpacity={hoveredd ? 1 : 0}
              toneMapped={false}
              // transparent={star ? true : false}
            >
              {/* {clickedd ? "cliqué" : ""} */}
              {text3?"Distance : " + parseFloat(text3.toPrecision(2)) + " année lumière":""}
            </Text>
          </mesh>
          <mesh
            position={[0, 3, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText2}
            transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[1, 1, 1]}
              anchorX="center" // default
              anchorY="middle" // default
              color="white"
              // ref={myMesh}
              // fillOpacity={hoveredd ? 1 : 0}
              toneMapped={false}
              // transparent={star ? true : false}
            >
              {/* {clickedd ? "cliqué" : ""} */}
              {text2?"Age : " + text2 + " milliard d'année":""}
              {/* {"Age : " + text2} */}
            </Text>
          </mesh>
          <mesh
            position={[0, 3.5, 0.01]}
            scale={[4, 5, 2]}
            ref={myMeshText3}
            transparent={clickedd ? false : true}
            opacity={clickedd ? 1 : 0}
          >
            <Text
              scale={[1, 1, 1]}
              anchorX="center" // default
              anchorY="middle" // default
              color="white"
              // ref={myMesh}
              // fillOpacity={hoveredd ? 1 : 0}
              toneMapped={false}
              // transparent={star ? true : false}
            >
              {/* {clickedd ? "cliqué" : ""} */}
              {text}
            </Text>
          </mesh>
        </>
      ):("")}
      {(!star && clickedd) ? (
        <>
        <mesh
          position={[0, 1, 0.01]}
          scale={[4, 5, 2]}
          ref={myMeshText4}
          transparent={clickedd ? false : true}
          opacity={clickedd ? 1 : 0}
        >
          <Text
            scale={[1, 1, 1]}
            anchorX="center" // default
            anchorY="middle" // default
            color="white"
            toneMapped={false}
          >
            {period_orig?"Période de révolution : " + parseFloat(period_orig.toPrecision(2))+ "  jour":""}
          </Text>
        </mesh>
        <mesh
          position={[0, 1.5, 0.01]}
          scale={[4, 5, 2]}
          ref={myMeshText}
          transparent={clickedd ? false : true}
          opacity={clickedd ? 1 : 0}
        >
          <Text
            scale={[1, 1, 1]}
            anchorX="center" // default
            anchorY="middle" // default
            color="white"
            toneMapped={false}
          >
            {semi_major_axis_orig?"Demi grand-Axe : " +  parseFloat(semi_major_axis_orig.toPrecision(2)) + " UA":""}
          </Text>
        </mesh>
        <mesh
          position={[0, 2, 0.01]}
          scale={[4, 5, 2]}
          ref={myMeshText2}
          transparent={clickedd ? false : true}
          opacity={clickedd ? 1 : 0}
        >
          <Text
            scale={[1, 1, 1]}
            anchorX="center" // default
            anchorY="middle" // default
            color="white"
            toneMapped={false}
          >
            {mass?"Masse : " + parseFloat(mass.toPrecision(2)) + " masse jupitérienne":""}
          </Text>
        </mesh>
        <mesh
          position={[0, 2.5, 0.01]}
          scale={[4, 5, 2]}
          ref={myMeshText3}
          transparent={clickedd ? false : true}
          opacity={clickedd ? 1 : 0}
        >
          <Text
            scale={[1, 1, 1]}
            anchorX="center" // default
            anchorY="middle" // default
            color="white"
            toneMapped={false}
          >
            {text}
          </Text>
        </mesh>
      </>
      ):""}

      {(!star && clickedd) ? (
        <mesh position={[0, 3, 0]} ref={myMesh2}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial
            color={[0, 0, 255]}
            emissiveIntensity={1}
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
