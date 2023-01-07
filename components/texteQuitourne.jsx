import { Canvas, useThree, extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Center, Decal, Text3D, Text, OrbitControls } from '@react-three/drei'
import React, { useState, useRef } from 'react'
import { SSAOPass, GlitchPass, UnrealBloomPass } from 'three-stdlib'
import { Effects, Stars, Html } from '@react-three/drei'
import { useControls } from 'leva'
// import styled from 'styled-components'
import * as THREE from 'three'

function Adfa(){

    return(

        <div
        style={{
          top: "0",
          left: "5%",
          zIndex: "10000",
          fontSize: "10px",
          height: "90%",
          width: "100",
          backgroundColor: "rgba(100,100,100,0.5)",
          fontFamily: "scifi",
          padding: "3%",
          lineHeight:"2.5"
        }}
        >
        <Canvas
          concurrent={false}
          camera={{
            near: 0.1,
            far: 1000,
            zoom: 1,
            position: [4, 4, 4],
          }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor("#252934");
            //
            camera.lookAt(0, 0, 0);
            camera.position.set(4, 4, 4);
            // console.log(window.devicePixelRatio);
          }}
        >
          <TextteQuiTourne />
        </Canvas>
        </div>
        );
}



export default function TextteQuiTourne({ margin = 0.5 }) {
  const { width, height } = useThree((state) => state.viewport)
  const [hover, setHover] = useState(false)
  // const
  const ref = useRef()
  useFrame((state, delta, xrFrame) => {
    if (hover) {
      ref.current.rotation.y = 0
      ref.current.rotation.x += 0.02
      ref.current.rotation.z = 0
    } else if (ref.current.rotation.x > 0) {
      ref.current.rotation.y = 0
      ref.current.rotation.x -= 0.02
      ref.current.rotation.z = 0
    } else{
       ref.current.rotation.x=0
    }
    // This function runs at the native refresh rate inside of a shared render-loop
  })
  return (
    <>
      <gridHelper position={[0, 0.01, 0]} colorGrid={new THREE.Color(255, 0, 0)} />
      <gridHelper position={[0.5, 0, 0]} colorGrid={new THREE.Color(0, 255, 0)} />
      <Text
        ref={ref}
        color="white"
        anchorX="center"
        anchorY="middle"
        onPointerEnter={(e) => {
          e.stopPropagation()
          setHover(true)
          // You may optionally capture the target
          // e.target.object.rotation
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHover(false)
          // You may optionally capture the target
          // e.target.object.rotation
        }}>
        hello world!
      </Text>
      
    </>
  )
}


