import {useEffect} from "react";
import { Html } from "@react-three/drei";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Echelle ({maxSemi_major_axis,name}) {

  console.log("max",maxSemi_major_axis)

  var ddist=100 * 1/maxSemi_major_axis
  var texteEchelle
  if (maxSemi_major_axis<1){
    texteEchelle="1/" +  Math.round(1/maxSemi_major_axis,2) + " de la distance terre-soleil"
  }

  useEffect(()=>{
    let ctx = gsap.context(() => {
      var scrollSunTl = gsap.timeline();

      scrollSunTl.fromTo("#svgEchelle",
      {
        scaleX:0.1
      },
       {
        scaleX:1,
        duration: 1
      });

    })

    return () => ctx.revert();
  })

  // ddist=200
  return (
    <>
      <Html>
        <div
        style={{
          position:"fixed",
          top:"-300px",
          left:"0px",
          zIndex:"10"
        }}
        >
        <svg id="svgEchelle" width={ddist} height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="5" x2="100" y2="5" stroke="white" strokeWidth="1" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke="white" strokeWidth="1" />
          <line x1="100" y1="-10" x2="100" y2="10" stroke="white" strokeWidth="1" />
        </svg>
        {texteEchelle} <br />
        {maxSemi_major_axis} <br />
        {name}
        </div>
      </Html>
    </>
  );
}
