import { shaderMaterial } from "@react-three/drei";
// import { extend } from "@react-three/fiber";
// import glsl from "babel-plugin-glsl/macro";
import * as THREE from "three";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";

import { useRef } from "react";

import { Shaders, Node, GLSL } from "gl-react";

import React from "react"
const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}`,
  },
});

export class HelloBlue extends React.Component {
    render() {
      const { blue } = this.props;
      return <Node shader={shaders.helloBlue} uniforms={{ blue }} />;
    }
  }



export default function Tt() {
  return "ee";
}

export const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  GLSL`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  GLSL`
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
        gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `
);

export const WaveShaderMaterial2 = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  GLSL`
      precision mediump float;
   
      varying vec2 vUv;
      varying float vWave;
  
      uniform float uTime;
  
      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);
  
      void main() {
        vUv = uv;
  
        vec3 pos = position;
        float noiseFreq = 2.0;
        float noiseAmp = 0.4;
        vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
        pos.z += snoise3(noisePos) * noiseAmp;
        vWave = pos.z;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
      }
    `,
  // Fragment Shader
  GLSL`
      precision mediump float;
  
      uniform vec3 uColor;
      uniform float uTime;
      uniform sampler2D uTexture;
  
      varying vec2 vUv;
      varying float vWave;
  
      void main() {
        float wave = vWave * 0.2;
        vec3 texture = texture2D(uTexture, vUv + wave).rgb;
        gl_FragColor = vec4(texture, 1.0); 
      }
    `
);

extend({ WaveShaderMaterial2 });

export const Wave = () => {
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTime = clock.getElapsedTime()));

  const [image] = useLoader(THREE.TextureLoader, [
    "https://images.unsplash.com/photo-1604011092346-0b4346ed714e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",
  ]);

  return (
    <mesh>
      <planeGeometry args={[1, 1, 16, 16]} />
      <WaveShaderMaterial2 uColor={"hotpink"} ref={ref} uTexture={image} />
    </mesh>
  );
};

