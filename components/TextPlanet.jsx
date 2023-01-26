/* eslint-disable */
import { Text } from "@react-three/drei";
import React, { useRef } from "react";

import {  useFrame} from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

import roboto from "../public/Roboto_Regular.json";

import * as THREE from "three";

export default function CardPlanet({ text, position, hoveredd, ...args }) {
  const myMesh = useRef();
  const myMesh2 = useRef();


  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));


  // colorMap.needsUpdate = true;

  useFrame(({ gl, scene, camera }) => {
    if (hoveredd && myMesh2.current && myMesh.current ) {
      myMesh.current.parent.lookAt(0, camera.position.x, 0); // <-- should work when uncomment
      // console.log(myMesh.current.parent.lookAt(0, camera.position[1], 0))
      console.log(camera.position)
    }
  });

  const font = new FontLoader().parse(roboto);

  return (
    <group>
      <mesh
        position={[0, 2, 0.01]}
        scale={[4, 5, 2]}
        ref={myMesh}
        transparent={hoveredd ? false : true}
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
          fillOpacity={hoveredd ? 1 : 0}
          toneMapped={false}
          transparent={hoveredd ? false : true}
        >
          {text}
        </Text>
      </mesh>
      
      <mesh
        position={[0, 2, 0]}

        ref={myMesh2}
      >
        <planeGeometry geometry={[10, 10]} />
        <meshBasicMaterial
          color="red"
          opacity={hoveredd ? 1 : 0}
          transparent={hoveredd ? false : true}
        />
      </mesh>
    </group>
  );
}
