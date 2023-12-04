/* eslint-disable */
// @ts-ignore
import React, { useRef, useEffect, useState, useMemo } from "react";
import {  useFrame } from "@react-three/fiber";

import { useSphere } from "@react-three/cannon";

import { animated } from "@react-spring/three";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import TextPlanet from "./TextPlanet";

import { debounce } from "lodash";
import { usePlanetStore } from "./store/store";



export default function Planet({ compteur, image,imageData, ...args }) {

  const colorMap = [
    useLoader(TextureLoader, "/planet/image/earth.jpg"),
    useLoader(TextureLoader, "/planet/image/mars.jpg"),
    useLoader(TextureLoader, "/planet/image/mercure.jpg"),
    useLoader(TextureLoader, "/planet/image/neptune.jpg"),
    useLoader(TextureLoader, "/planet/image/moon.jpg"),
    useLoader(TextureLoader, "/planet/image/jupiter.jpg"),
    useLoader(TextureLoader, "/planet/image/venus.jpg"),
    useLoader(TextureLoader, "/planet/image/uranus.jpg"),
  ];



  

  const nbMapPlanet = useRef(colorMap[Math.ceil(7 * Math.random())]);


  const { planet, updateData } = usePlanetStore((state) => state);



  const [sphereX, setSphereX] = useState(0);
  const [semi_major_axis, setSemi_major_axis] = useState(image.semi_major_axis);


  const [hoveredd, hover] = useState(false);

  const clickedd = useRef(false);

  if (planet) {
    if (planet.name == image.name) {
      clickedd.current = true;
    } else {
      clickedd.current = false;
    }

  }

  useEffect(() => {
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

    setSphereX((sphereX) => sphereX + 0.02);
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
        <TextPlanet
          {...args}
          hoveredd={hoveredd}
          clickedd={clickedd.current}
          text={imageData.text}
          mass={imageData.mass}
          rayon={imageData.rayon}
          semi_major_axis_orig={image.semi_major_axis}
          period_orig={imageData.period_orig}
          image={imageData}
          star={false}
        />
      </animated.mesh>
      <animated.mesh
        ref={sphereRef}
        {...args}
        onClick={() => {
          clickedd.current = true;
          updateData(image);
        }}
        onPointerOver={() => {
          debouncedHandleMouseLeave.cancel();
          hover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(x) => {
          document.body.style.cursor = "auto";
          debouncedHandleMouseLeave();
        }}
      >
        <sphereGeometry args={[image.radius, 32, 32]} />
        <meshStandardMaterial
          map={nbMapPlanet.current}
          // map={image.Mmap}
          // toneMapped={false}
          // transparent={true}
          // opacity={1}
          // color={[128, 128, 128]}
          // emissiveIntensity={0.1}
        />
      </animated.mesh>
      {/* <animated.mesh
        ref={sphereRef}
        {...args}
        onClick={() => {
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
        <sphereGeometry args={[image.radius* 2, 32, 32]} />
        <meshNormalMaterial
        transparent={true}
        opacity={0}
        // transparent
          // map={colorMap[0]}
          // map={image.Mmap}
          // toneMapped={false}
          color={[255, 128, 0]}
          // emissiveIntensity={0.1}
        />
      </animated.mesh> */}
    </>
  );
}
