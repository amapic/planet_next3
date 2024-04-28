import React, { useState, useRef, useEffect } from "react";

import gsap from "gsap";

export default function Entete() {
  const root = useRef(null);
  const titre = useRef(null);

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%,75% 100%, 25% 100%, 0% 50%)",
    });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      clipPath: "polygon(50% 0%, 50% 0%,100% 50%, 50% 100%, 50% 100%,0% 50%)",
    });
  };

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
      ref={root}
    >
      <div
        style={{
          left: "0%",
          width: "100%",
          fontFamily: "scifi",
          color: "red",
          zIndex: "9",
          backgroundColor: "white",
          fontSize: "2vw",
          letterSpacing: "5rem",
          clipPath:
            "polygon(50% 0%, 50% 0%,100% 50%, 50% 100%, 50% 100%,0% 50%)",
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
