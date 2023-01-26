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
    <div
      style={{
        top: "15vh",
        left: "5%",
        zIndex: "10000",
        height: "80%",
        width: "20%",
        backgroundImage: "url('aa2.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        resize: "both",
        fontFamily: "scifi",
        padding: "3%",
        lineHeight: "2.5",
      }}
      className="fixed"
    >
      <div id="">
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
  );
}
