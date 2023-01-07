import React, { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";

export default function Entete() {
  const [hover, setHover] = useState();

  const { scrollYProgress } = useScroll();

  function kk(value) {
    console.log(value);
    return value;
  }

  const y = useTransform(scrollYProgress, kk);

  const x = useSpring(1, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const divStyle ={
    scaleY: y,
    position: "fixed",

    bottom: "50%",
    transform: "translateY(50%)",
    backgroundColor: "black",
    zIndex: 10,
    minHeight: "calc(50% - 100*" + y + "px)",
    color:"red"
    
  }
  return (
    <div className="w-full relative top-0 left-0 flex justify-items-center items-center">
      <span
        style={{
          left: "33%",
          height: "100px",
          fontFamily: "scifi",
        }}
        className="align-middle h-full ;6q"
        onMouseEnter={() => x.set(0)}
        onMouseLeave={() => x.set(1)}
      >
        SITE COOL
      </span>
      <motion.div
        className="semi-circle bg-black"
        style={divStyle}
      ></motion.div>
      <div
        className="semi-circle bg-white"
        style={{
          position: "fixed",

          bottom: "50%",
          // transform: "translateY(50%)",
          backgroundColor: "white",
          zIndex: 2,
        }}
      ></div>
      <motion.div
        className="absolute bg-white"
        style={{
          height: "33%",
          top: "33%",
          left: "33%",
          zIndex: "10",
          scaleY: x,
        }}
      >
        GGGG
      </motion.div>
      <motion.div
        className="absolute bg-white"
        style={{
          height: "33%",
          top: "0%",
          left: "33%",
          zIndex: "10",
          scaleY: x,
        }}
      >
        GGGG
      </motion.div>
      <motion.div
        className="absolute bg-white"
        style={{
          height: "33%",
          top: "66%",
          left: "33%",
          zIndex: "10",
          scaleY: x,
        }}
      >
        GGGG
      </motion.div>
    </div>
  );
}
