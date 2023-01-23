import React, { useState, useRef, useLayoutEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";

import gsap from "gsap";

export default function Entete() {
  const [hover, setHover] = useState();

  const { scrollYProgress } = useScroll();

  function kk(value) {
    return value;
  }

  const x = useSpring(1, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(x, kk);

  const root = useRef(null);
  const titre = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context((self) => {
      
      // use any arbitrary string as a name; it'll be added to the Context object, so in this case you can call ctx.onClick() later...
      self.add("hover", (e) => {
        let tl = gsap.timeline();
        tl.to(titre.current, {
          clipPath:"polygon(25% 0, 75% 0%, 100% 50%,75% 100%, 25% 100%,  0 50%)"
        })

      });
      self.add("hoverout", (e) => {
        console.log("mouse enter");
        let tl = gsap.timeline();
        tl.to(titre.current, {
          clipPath:"polygon(50% 0, 50% 0,100% 50%, 50% 100%, 50% 100%,0 50%);"
        })// <-- gets added to the Context!
      });

    }, root);

    titre.current.addEventListener("mouseenter", (e) => ctx.hover(e));
    titre.current.addEventListener("mouseleave", (e) => ctx.hoverout(e));
  }, []);


  return (
    <header
      className="w-full relative top-0 left-0 flex justify-items-center items-center opacity-1
      py-2
      "
      style={{
        height: "10vh",
        backgroundColor: "black",
        minHeight: "60px",
      }}
      onMouseLeave={() => {
        x.set(1);
      }}
      onMouseEnter={() => {
        x.set(0);
      }}
      ref={root}
    >
      <div
        style={{
          left: "0%",
          width: "100%",
          // marginTop: "1vh",
          fontFamily: "scifi",
          color: "red",
          zIndex: "9",
          backgroundColor: "black",
          fontSize: "2vw",
          letterSpacing: "5rem",
          clipPath: "polygon(50% 0, 50% 0,100% 50%, 50% 100%, 50% 100%,0 50%);"
          
        }}
        className="align-middle h-full text-center align-middle py-2"
        ref={titre}
      >
        TITLE
      </div>

      {/* <motion.div
        className="absolute"
        style={{
          height: "33%",
          top: "33%",
          left: "0%",
          width: "100%",
          zIndex: "10",
          scaleY: y,
          backgroundColor: "#000",
        }}
      ></motion.div>
      <motion.div
        className="absolute"
        style={{
          height: "33%",
          top: "0%",
          left: "0%",
          zIndex: "10",
          width: "100%",
          scaleY: y,
          backgroundColor: "#000",
        }}
      ></motion.div>
      <motion.div
        className="absolute"
        style={{
          height: "33%",
          top: "66%",
          left: "0%",
          zIndex: "10",
          width: "100%",
          scaleY: y,
          backgroundColor: "#000",
        }}
      ></motion.div> */}
      {/* <motion.div
        className="semi-circle bg-black"
        style={divStyle}
      ></motion.div> */}
      {/* <div
        className="semi-circle bg-white"
        style={{
          position: "fixed",

          bottom: "50%",
          // transform: "translateY(50%)",
          backgroundColor: "white",
          zIndex: 2,
        }}
      ></div> */}
    </header>
  );
}
