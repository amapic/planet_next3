import { getMiddlewareRouteMatcher } from "next/dist/shared/lib/router/utils/middleware-route-matcher";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function PanelGauche() {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(
    "Cet ecran permet de voir quelques systemes planetaires"
  );
  //vous pouvez en savoir plus en survolant les planètes
  const [index, setIndex] = useState(0);
  const [folded, setFolded] = useState(false);

  const [glitch, setGlitch] = useState(true);
  const ref = useRef();

  //bouton click
  const onClick = ({ currentTarget }) => {
    if (!folded) {
      gsap.to(ref.current, {
        height: "0px",
        backgroundColor: "teal",
        duration: 1,
        // backgroundColor: "blue",
      });
    } else {
      gsap.to(ref.current, {
        backgroundColor: "teal",
        duration: 1,
        height: "30%",
        // backgroundColor: "blue",
      });
    }

    setFolded(!folded);
  };

  //afficahge des lettres
  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 100);
    }
  }, [index]);

  //effect glitch aléatoire
  useEffect(() => {
    setTimeout(() => {
      setGlitch(!glitch);
    }, 1000 * Math.random());
  }, [glitch]);

  return (
    // l'image dez fond a un ratio de 5/7
    <div
      style={{
        top: "5vh",
        left: "5%",
        width: "80%",
        height: "30%",
        // aspectRatio: "5/7",
        zIndex: "5",
        // clipPath: "polygon(50% 0%, 50% 0%,100% 50%, 50% 100%, 50% 100%,0% 50%)",
        clipPath:
          "polygon(5% 0%, 95% 0%,100% 5%, 100% 95%, 95% 100%,0% 100%,0% 5%)",
        borderColor: "red",
      }}
      className="fixed"
      ref={ref}
    >
      <div
        style={{
          top: "1vh",
          right: "5%",
          zIndex: "1001",
          position: "absolute",
          size: "15px",
          // backgroundColor: "teal",
          color: "white",
        }}
        onClick={onClick}
      >
        ↑ {folded ? "haha" : "rr"}
      </div>
      <div
        style={{
          top: "1px" /* equal to border thickness */,
          left: "1px",
          right: "1px",
          bottom: "1px",
          // backgroundImage: "url('fondSF.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto auto",
          backgroundColor: "black",
          fontFamily: "scifi",
          lineHeight: "2.5",
          padding: "25px",
          position: "absolute",
          width: "95%",
          height: "95%",
          zIndex: 1000,
          backgroundClip: "border-box",
          clipPath:
            "polygon(5% 0%, 95% 0%,100% 5%, 100% 95%, 95% 100%,0% 100%,0% 5%)",
        }}
      >
        <div id="glitchbody2">
          <div className="glitch">
            <div className={glitch ? "line" : ""}>{text}</div>
            {glitch ? (
              <>
                <div className="line">{text}</div>
                <div className="line">{text}</div>
                <div className="line">{text}</div>
                <div className="line">{text}</div>
                <div className="line">{text}</div>
                <div className="line">{text}</div>
                <div className="line">{text}</div>
                <div className="line">{text}</div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
