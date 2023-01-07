import React, { useEffect, useState } from "react";

export default function PanelGauche() {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(
    "Your source of leading edge water and air treatment technology since 1994."
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
        console.log("prout");
      }, 50);
    }
  }, [index]);

  return (
    <div className="">
      <div
        style={{
          top: "10%",
          left: "5%",
          zIndex: "10000",
          fontSize: "10px",
          height: "80%",
          width: "35%",
          backgroundImage: "url('aa2.svg')",
          backgroundColor: "rgba(100,100,100,0.5)",
          fontFamily: "scifi",
          padding: "3%",
          lineHeight: "2.5",
        }}
        className="fixed"
      >
        {text}
      </div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  );
}
