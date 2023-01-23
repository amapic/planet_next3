import React, { useEffect, useState } from "react";

export default function PanelGauche() {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(
    "AAA AAAA fxgdfg"
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 200);
    }
  }, [index]);

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
      <div id="glitchbody">
        <div className="glitch">
          <div className="line">
            {text}
          </div>
          <div className="line">{text}</div>
          <div className="line">{text}</div>
          <div className="line">{text}</div>
          <div className="line">{text}</div>
          <div className="line">{text}</div>
          <div className="line">{text}</div>
          <div className="line">{text}</div>
          <div className="line">{text}</div>
        </div>
      </div>
    </div>
  );
}
