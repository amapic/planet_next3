import React, { useState, useRef, useEffect } from "react";
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

  // const [texte, setTexte] = useState("rr");

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
  // const texte = useRef("rrrrrrrrrrrrrrrr");

  // useEffect(() => {
  //   let ctx = gsap.context((self) => {
      
  //     // use any arbitrary string as a name; it'll be added to the Context object, so in this case you can call ctx.onClick() later...
  //     self.add("hover", (e) => {
  //       console.log("mouse enter")
  //       // setTexte("mouse leave")
  //       // texte.current="f"
  //       let tl = gsap.timeline();
  //       tl.to(titre.current, {
  //         clipPath:"polygon(25% 0, 75% 0%, 100% 50%,75% 100%, 25% 100%,  0 50%)"
  //       })
  //       // tl.kill()
  //     });

  //     self.add("hoverout", (e) => {
  //       console.log("mouse leave");
  //       let tl2 = gsap.timeline();
  //       // texte.current="qsg"
  //       // setTexte("mouse enter")
  //       tl2.to(titre.current, {
  //         clipPath:"polygon(50% 0, 50% 0,100% 50%, 50% 100%, 50% 100%,0 50%);"
  //         // clipPath:"polygon(0 0, 0 0,0 0%, 0% 0%, 0% 0%,0 0%);"
  //       })// <-- gets added to the Context!
  //       // tl2.kill()
  //     });

  //   }, root);

    

    

  //   titre.current.addEventListener("mouseenter", (e) => ctx.hover(e));
  //   titre.current.addEventListener("mouseleave", (e) => ctx.hoverout(e));

  //   // return () => ctx.revert();
  // }, []);

  const onLeave = ({ currentTarget }) => {
    // gsap.to(currentTarget, { backgroundColor: "#28a92b", scale: 1 });
    gsap.to(currentTarget, {
      // clipPath:"polygon(50% 0, 50% 0,100% 50%, 50% 100%, 50% 100%,0 50%);"
      clipPath:"polygon(0 0, 0 0,0 0%, 0% 0%, 0% 0%,0 0%);"
    })// <-- gets added to the Context!
  };

  const onEnter = ({ currentTarget }) => {
    // gsap.to(currentTarget, { backgroundColor: "#e77614", scale: 1.2 });
    gsap.to(currentTarget, {
      clipPath:"polygon(25% 0, 75% 0%, 100% 50%,75% 100%, 25% 100%,  0 50%)"
    })
  };

  // const onClick = useCallback(event => {
  //   console.log('Clicked Item : ', event.currentTarget);
  // }, [item]);


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
      // onMouseLeave={() => {
      //   x.set(1);
      // }}
      // onMouseEnter={() => {
      //   x.set(0);
      // }}

   
      ref={root}
    >
      <div
        style={{
          left: "0%",
          width: "100%",
          fontFamily: "scifi",
          color: "red",
          zIndex: "9",
          backgroundColor: "black",
          fontSize: "2vw",
          letterSpacing: "5rem",
          // clipPath: "polygon(0 0, 0 0,0 0, 0 0, 0 0,0 0);"
          clipPath:"polygon(50% 0, 50% 0,100% 50%, 50% 100%, 50% 100%,0 50%);"
          
        }}
        className="align-middle h-full text-center align-middle py-2"
        ref={titre}
        onMouseEnter={onEnter}
      
        onMouseLeave={onLeave}
      >
        Title
      </div>

 
    </header>
  );
}
