import { getMiddlewareRouteMatcher } from "next/dist/shared/lib/router/utils/middleware-route-matcher";
import React, { useEffect, useState } from "react";

export default function PanelGauche() {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState("AAA AAAA fxgdfg");
  const [index, setIndex] = useState(0);

  const [glitch, setGlitch] = useState(true);

  //afficahge des lettres
  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 200);
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
        top: "15vh",
        left: "5%",
        // height: "70%",
        width: "20%",
        aspectRatio:"5/7",
        zIndex:"10000"
      }}
      className="fixed"
    >
      <div
        style={{
          backgroundImage: "url('aa2.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundColor:"black",
          // backgroundSize: "auto auto",
          // backgroundSize: "100% 100%",
          // resize: "both",
          fontFamily: "scifi",
          
          lineHeight: "2.5",
          padding: "25px",
          // zIndex: "10000",
          position:"absolute",
          width:"100%",
          height:"100%"
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
