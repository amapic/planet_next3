/* eslint-disable */
// @ts-ignore
import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";

import { useSphere } from "@react-three/cannon";
import * as three from "three";

import { animated } from "@react-spring/three";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import CardPlanet from "./TextPlanet";

import { debounce } from "lodash"

export default function Planet({ compteur, image, ...args }) {
  const cube = useRef();

  const colorMap = useLoader(TextureLoader, image.colorMap);

  // colorMap.needsUpdate = true;

  const [sphereX, setSphereX] = useState(0);
  const [radius, setRadius] = useState(0);

  const [hoveredd, hover] = useState(false);

  useEffect(() => {
    console.log("xxx");
    var timer = setTimeout(function () {
      if (hover) {
        hover(false);
      }
    }, 500);
  }, []);

  const [sphereRef, sphereApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    position: [0, 0, 0],
  }));

  const [cardRef, cardApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    position: [0, 0, 0],
  }));

  useFrame(() => {
    if (image.radius > radius) {
      setRadius(radius + 0.05);
    }

    setSphereX((sphereX) => sphereX + 0.05);
    sphereApi.position.set(
      radius * Math.cos((sphereX * 2 * Math.PI) / image.periode),
      0,
      radius * Math.sin((sphereX * 2 * Math.PI) / image.periode)
    );

    sphereApi.rotation.set(0, sphereX, 0);
    cardApi.position.set(
      radius * Math.cos((sphereX * 2 * Math.PI) / image.periode),
      0,
      radius * Math.sin((sphereX * 2 * Math.PI) / image.periode)
    );
  }, 2);

  const debouncedHandleMouseLeave = debounce(() => hover(false), 500)

  return (
    <>
      <animated.mesh ref={cardRef}>
        <CardPlanet
          {...args}
          hoveredd={hoveredd}
          text={image.text}
          image={image}
        />
      </animated.mesh>
      <animated.mesh
        ref={sphereRef}
        {...args}
        onPointerOver={() => {
          debouncedHandleMouseLeave.cancel()
          hover(true);

          console.log("ttt");

        }}
        onPointerOut={(x) => {
          debouncedHandleMouseLeave();
        }}
      >
        <sphereGeometry args={[image.internalRadius, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}

          // toneMapped={false}
        />
      </animated.mesh>
    </>
  );
}
