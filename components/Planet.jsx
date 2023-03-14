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

import { debounce } from "lodash";
import { usePlanetStore } from "../pages/index";

export default function Planet({ compteur, image, ...args }) {
  const cube = useRef();

  const colorMap = [
    useLoader(TextureLoader, "/earth.jpg"),
    useLoader(TextureLoader, "/mars.jpg"),
    useLoader(TextureLoader, "/mercure.jpg"),
    // useLoader(TextureLoader, "/earth.jpg"),
  ];

  const { planet, updateData } = usePlanetStore((state) => state);

  // if (image.star_name == "K2-138 b") {
  //   console.log(image.semi_major_axis);
  // }

  const [sphereX, setSphereX] = useState(0);
  const [semi_major_axis, setSemi_major_axis] = useState(image.semi_major_axis);

  // console.log(semi_major_axis);

  const [hoveredd, hover] = useState(false);

  const clickedd = useRef(false);

  if (planet) {
    if (planet.name == image.name) {
      clickedd.current = true;
    } else {
      clickedd.current = false;
    }

    // console.log("e", planet.name);
    // console.log("sdfg", image.name);
  }

  useEffect(() => {
    // setSemi_major_axis(image.semi_major_axis);
    var timer = setTimeout(function () {
      if (hover) {
        hover(false);
      }
    }, 500);
  }, []);

  const [sphereRef, sphereApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    position: [1, 0, 0],
  }));

  const [cardRef, cardApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 0,
    position: [1, 0, 0],
  }));

  useFrame(() => {
    if (image.semi_major_axis > semi_major_axis) {
      setSemi_major_axis(semi_major_axis + 0.05);
    }

    setSphereX((sphereX) => sphereX + 0.05);
    sphereApi.position.set(
      semi_major_axis * Math.cos((sphereX * 2 * Math.PI) / image.period),
      0,
      semi_major_axis * Math.sin((sphereX * 2 * Math.PI) / image.period)
    );

    sphereApi.rotation.set(0, sphereX, 0);
    cardApi.position.set(
      semi_major_axis * Math.cos((sphereX * 2 * Math.PI) / image.period),
      0,
      semi_major_axis * Math.sin((sphereX * 2 * Math.PI) / image.period)
    );
  });

  const debouncedHandleMouseLeave = debounce(() => hover(false), 500);

  return (
    <>
      <animated.mesh ref={cardRef}>
        <CardPlanet
          {...args}
          hoveredd={hoveredd}
          clickedd={clickedd.current}
          text={image.text}
          image={image}
        />
      </animated.mesh>
      <animated.mesh
        ref={sphereRef}
        {...args}
        onClick={() => {
          console.log("qd");
          clickedd.current = true;
          updateData(image);
        }}
        onPointerOver={() => {
          debouncedHandleMouseLeave.cancel();
          hover(true);
        }}
        onPointerOut={(x) => {
          debouncedHandleMouseLeave();
        }}
      >
        <sphereGeometry args={[image.radius, 32, 32]} />
        <meshBasicMaterial
          map={colorMap[0]}
          // map={image.Mmap}
          // toneMapped={false}
          // color={[255, 128, 0]}
          // emissiveIntensity={0.1}
        />
      </animated.mesh>
    </>
  );
}
