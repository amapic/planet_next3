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

// const customMaterial = new THREE.MeshPhongMaterial({
//   shininess: 100,
//   side: THREE.DoubleSide,
//   wireframe: false,

//   onBeforeCompile: (shader) => {
//     // one would define the uniforms prior as an object
//     shader.uniforms.legend = uniforms.legend;
//     shader.uniforms.minMaxVal = uniforms.minMaxVal;
//     shader.uniforms.ddh_coord = uniforms.ddh_coord;
//     shader.uniforms.colors_arr = uniforms.colors_arr;
//     shader.uniforms.ddh_rmr = uniforms.ddh_rmr;

//     shader.vertexShader = `
//         varying vec3 vposition;

//         ${shader.vertexShader}
//         `.replace(
//       `#include <begin_vertex>`,
//       `
//             vposition = position;
//             vec3 transformed = vec3( position );`
//     );

//     shader.fragmentShader = `
//         varying vec3 vposition;
//         uniform sampler2D legend;
//         uniform vec2 minMaxVal;
//         uniform vec3 ddh_coord[6];
//         uniform vec3 colors_arr[6];
//         uniform float ddh_rmr[6];

//         bool condition1(vec3 a, vec3 b, vec3 pt, float radius, float epsilon) {

//            // some code here

//             if ( abs(d-radius) <= epsilon ) {
//                     return true;
//                 }
//             else {
//                     return false;
//                 }
//         }

//         bool condition2( vec3 a, vec3 b, vec3 pt, float radius, float epsilon) {

//             // some code here

//             if ( // some code ) {
//                     return true;
//                 }
//             else {
//                     return false;
//                 }

//         }

//         ${shader.fragmentShader}
//         `.replace(
//       `#include <map_fragment>`,
//       `

//             vec3 start_point;
//             vec3 end_point;
//             vec3 col;

//             for(int i = 0; i <= 4; i++) {

//                 start_point = vec3 (ddh_coord[i].x, ddh_coord[i].y ,ddh_coord[i].z) ;
//                 end_point = vec3 (ddh_coord[i+1].x, ddh_coord[i+1].y ,ddh_coord[i+1].z);

//                 if( condition1() &&
//                     condition2() ) {

//                         col = texture(legend, vec2(0.5, (ddh_rmr[i] - minMaxVal.x) / (minMaxVal.y - minMaxVal.x))).rgb;

//                 }

//             }

//             diffuseColor.rgb *= col;`
//     );
//   },
// });

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
  // Uniform
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
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
      {/* <meshBasicMaterial color={"red"} /> */}
    </mesh>
  );
};
// gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
// export default ColorShiftMaterial;
// extend({ ColorShiftMaterial });

// in your component

// export default function TTrouttt() {
//   return (
//     <mesh>
//       <sphereGeometry args={[1, 1, 1]} />
//       <colorShiftMaterial color="hotpink" time={1} />
//     </mesh>
//   );
// }
