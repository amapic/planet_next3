/* eslint-disable */
import { Text } from "@react-three/drei";
import React, { useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import roboto from "../public/Roboto_Regular.json";

import * as THREE from "three";

import Parser from "html-react-parser";

export default function CardPlanet({
  text="",
  text2="",
  text3="",
  position,
  hoveredd,
  clickedd,
  image,
  info,
  star = false,
  ...args
}) {
  const myMesh = useRef();
  const myMesh2 = useRef();

  // clickedd = true;
  // if (clickedd.current) {
  //   console.log("textplanete", image);
  // }

  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));

  // colorMap.needsUpdate = true;

  useFrame(({ gl, scene, camera }) => {
    if ((hoveredd || clickedd) && myMesh2.current && myMesh.current) {
      myMesh.current.lookAt(camera.position); // <-- should work when uncomment
      // console.log(myMesh.current.parent.lookAt(0, camera.position[1], 0))
      // console.log(camera.position);
    }
  });

  const font = new FontLoader().parse(roboto);

  return (
    <group>
      <mesh
        position={[0, 2, 0.01]}
        scale={[4, 5, 2]}
        ref={myMesh}
        transparent={clickedd ? false : true}
        opacity={clickedd ? 1 : 0}
        // transparent={hoveredd ? false : true}
        // onPointerOver={(x) => {
        //   x.stopPropagation(); //not to have 2 elements hovered in the same time
        //   hover(true);
        //   // let hh = x.position;
        //   var vec = new THREE.Vector3();
        //   var box2 = new THREE.Box3().setFromObject(x.object);
        //   var boxx3 = new THREE.Box3();
        //   x.object.getWorldPosition();

        //   // console.log("object", box2);
        //   // console.log("boxsize", box2.getSize(vec));
        //   // console.log("world_position", vec);
        //   const box = new THREE.BoxHelper(x.object, 0xffff00);
        //   // setBoxGeo(vec);

        //   // boxx3 = x.object.parent.geometry.boundingBox;
        // }}
        // onPointerOut={() => hover(false)}
      >
        <Text
          scale={[1, 1, 1]}
          anchorX="center" // default
          anchorY="middle" // default
          color="white"
          ref={myMesh2}
          // fillOpacity={hoveredd ? 1 : 0}
          toneMapped={false}
          // transparent={star ? true : false}
        >
          {/* {clickedd ? "cliqué" : ""} */}
          {text}
        </Text>
      </mesh>
      <mesh
        position={[0, 2.5, 0.01]}
        scale={[4, 5, 2]}
        ref={myMesh}
        transparent={clickedd ? false : true}
        opacity={clickedd ? 1 : 0}
      >
        <Text
          scale={[1, 1, 1]}
          anchorX="center" // default
          anchorY="middle" // default
          color="white"
          ref={myMesh2}
          // fillOpacity={hoveredd ? 1 : 0}
          toneMapped={false}
          // transparent={star ? true : false}
        >
          {/* {clickedd ? "cliqué" : ""} */}
          {text2}
        </Text>
      </mesh>
      <mesh
        position={[0, 3, 0.01]}
        scale={[4, 5, 2]}
        ref={myMesh}
        transparent={clickedd ? false : true}
        opacity={clickedd ? 1 : 0}
      >
        <Text
          scale={[1, 1, 1]}
          anchorX="center" // default
          anchorY="middle" // default
          color="white"
          ref={myMesh2}
          // fillOpacity={hoveredd ? 1 : 0}
          toneMapped={false}
          // transparent={star ? true : false}
        >
          {/* {clickedd ? "cliqué" : ""} */}
          {text3}
        </Text>
      </mesh>

      {/* <mesh position={[0, 2, 0]} ref={myMesh2}>
        <planeGeometry geometry={[10, 10]} />
        <meshBasicMaterial
          color="red"
          transparent={hoveredd ? false : true}
          opacity={hoveredd ? 1 : 0}
        />
      </mesh> */}
      <mesh position={[0, 2.5, 0]} ref={myMesh2}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial
          color={[0, 0, 255]}
          emissiveIntensity={1}
          transparent={(clickedd && !star) ? false : true}
          opacity={(clickedd && !star) ? 1 : 0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
