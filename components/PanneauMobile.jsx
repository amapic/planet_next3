import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

import { useDeplacementStore, usePlanetStore } from "./store/store";

import { Draggable } from "gsap/dist/Draggable";

import Parser from "html-react-parser";

import Panel from "./resizer/Panel";

export default function PanelGauche() {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(
    "Cliquez sur les fleches pour faire defiler les systemes solaires <br />" +
      "et cliquez sur une planete pour avoir des informations la concernant"
  );

  const [index, setIndex] = useState(0);
  const [folded, setFolded] = useState(false);

  const [glitch, setGlitch] = useState(true);
  const ref = useRef();
  const ref2 = useRef();

  const onClick = ({ currentTarget }) => {
    if (!folded) {
      gsap.to(ref.current, {
        height: "8vh",
        backgroundColor: "teal",
        duration: 1,
        clipPath:
          "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% 100%,0% 100%,0% 13px)",
      });
    } else {
      gsap.to(ref.current, {
        backgroundColor: "teal",
        duration: 1,
        height: "30%",
      });
    }

    setFolded(!folded);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(Draggable);
      Draggable.create("#panneau", {
        type: "x,y",
        edgeResistance: 0.65,
        inertia: true,
        onPress: function () {},
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setGlitch(!glitch);
    }, 10000 * Math.random());
  }, [glitch]);

  return (
    <div
      style={{
        top: "2vh",
        left: "2%",
        width: "95%",
        height: "30%",

        zIndex: "5",
        clipPath:
          "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% calc(100% - 1px),0% calc(100% - 1px),0% 13px)",
        borderColor: "red",
        backgroundColor: "teal",
        overflow: "hidden",
      }}
      className="fixed"
      id="panneau"
      role="contact"
      ref={ref}
    >
      <div
        id="imgg"
        style={{
          top: "1vh",
          right: "8%",
          zIndex: "1001",
          position: "absolute",
          size: "50px",
          color: "white",
        }}
        onClick={onClick}
        onMouseEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "auto";
        }}
      >
    
      </div>
      <div
        ref={ref2}
        style={{
          top: "1px",
          left: "1px",
          right: "1px",
          bottom: "1px",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
          fontFamily: "scifi",
          lineHeight: "2.5",
          padding: "25px",
          position: "absolute",
          width: "95%",
          height: "95%",
          zIndex: 1000,
          backgroundClip: "border-box",
          overflow: "hidden",
          clipPath:
            "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% 100%,0% 100%,0% 13px)",
        }}
      >
        <div id="glitchbody2">
          <div className="glitch">
            <div className={glitch ? "line" : ""}>{Parser(fullText)}</div>
            {glitch ? (
              <>
                <div className="line">{Parser(fullText)}</div>
                <div className="line">{Parser(fullText)}</div>
                <div className="line">{Parser(fullText)}</div>
                <div className="line">{Parser(fullText)}</div>
                <div className="line">{Parser(fullText)}</div>
                <div className="line">{Parser(fullText)}</div>
                <div className="line">{Parser(fullText)}</div>
                <div className="line">{Parser(fullText)}</div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PanelPlanete() {
  const { planet, updateData } = usePlanetStore((state) => state);

  const { nActive, gachette, droite, gauche } = useDeplacementStore(
    (state) => state
  );

  const [folded, setFolded] = useState(false);

  const [glitch, setGlitch] = useState(true);
  const ref = useRef();
  const ref2 = useRef();

  const onClick = ({ currentTarget }) => {
    if (!folded) {
      gsap.to(ref.current, {
        height: "8vh",
        backgroundColor: "teal",
        duration: 1,
        clipPath:
          "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% 100%,0% 100%,0% 13px)",
      });
    } else {
      gsap.to(ref.current, {
        backgroundColor: "teal",
        duration: 1,
        height: "30%",
      });
    }

    setFolded(!folded);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(Draggable);

      Draggable.create("#panneauPlanet", {
        type: "x,y",
        edgeResistance: 0.65,

        inertia: true,
        onPress: function () {},
      });
    }
  }, []);

  var ttexte = "";

  if (planet) {
    ttexte =
      "Planete : " +
      planet.name +
      " <br>  Rayon : " +
      planet.radius +
      " rayon terrestre <br> Distance au soleil : " +
      planet.semi_major_axis +
      " UA" +
      " <br> Période de révolution : " +
      planet.period +
      " années" +
      " <br> Masse : " +
      planet.mass +
      " masse terrestre" +
      " <br> Année de découverte : " +
      planet.discovered;
  }

  return (
    <>
      {planet == null ? null : (
        <Panel>
          <div
            style={{
              bottom: "5vh",
              left: "20%",
              width: "50%",
              height: "30%",

              zIndex: "5",

              clipPath:
                "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% calc(100% - 1px),0% calc(100% - 1px),0% 13px)",
              borderColor: "red",
              backgroundColor: "teal",
            }}
            className="fixed"
            id="panneauPlanet"
            ref={ref}
          >
            <div
              style={{
                top: "1vh",
                right: "8%",
                zIndex: "1001",
                position: "absolute",

                size: "50px",

                color: "white",
              }}
              onClick={onClick}
              onMouseEnter={() => {
                document.body.style.cursor = "pointer";
              }}
              onMouseLeave={() => {
                document.body.style.cursor = "auto";
              }}
            >
              {!folded ? (
                <div>
                  <svg
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 960 560"
                  >
                    <g transform="translate(40, 280) rotate(0 0 0)">
                      <path
                        fill="teal"
                        d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
                 c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
                 c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"
                      />
                    </g>
                  </svg>
                </div>
              ) : (
                <svg
                  x="0px"
                  y="0px"
                  width="15"
                  height="15"
                  viewBox="0 0 960 560"
                >
                  <g transform="translate(40, 280) rotate(0 0 0)">
                    <path
                      fill="teal"
                      d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
		c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
		c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"
                    />
                  </g>
                </svg>
              )}
            </div>
            <div
              ref={ref2}
              style={{
                top: "1px",
                left: "1px",
                right: "1px",
                bottom: "1px",

                backgroundRepeat: "no-repeat",
                backgroundSize: "auto auto",
                backgroundColor: "black",

                lineHeight: "1",
                padding: "25px",
                position: "absolute",
                width: "95%",
                height: "95%",
                zIndex: 1000,
                backgroundClip: "border-box",
                clipPath:
                  "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% 100%,0% 100%,0% 13px)",
              }}
            >
              <div id="glitchbody2">
                <div className="aa">
                  <div
                    className=""
                    style={{
                      fontFamily: "arial",
                      padding: "5px",
                    }}
                  >
                    {/* {nActive}
                  {droite ? "true" : "false"}
                  {gauche ? "true" : "false"} */}
                    {Parser(ttexte)}
                  </div>
                  {glitch ? (
                    <>
                      {/* <div className="line">{Parser(ttexte)}</div>
                    <div className="line">{Parser(ttexte)}</div>
                    <div className="line">{Parser(ttexte)}</div>
                    <div className="line">{Parser(ttexte)}</div>
                    <div className="line">{Parser(ttexte)}</div>
                    <div className="line">{Parser(ttexte)}</div>
                    <div className="line">{Parser(ttexte)}</div>
                    <div className="line">{Parser(ttexte)}</div> */}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Panel>
      )}
    </>
  );
}
