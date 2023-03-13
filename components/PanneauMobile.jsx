import { getMiddlewareRouteMatcher } from "next/dist/shared/lib/router/utils/middleware-route-matcher";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

import { useDeplacementStore, usePlanetStore } from "../pages/index";
import { create } from "zustand";

import { Draggable } from "gsap/dist/Draggable";

import Parser from "html-react-parser";

// import PanelHeader from "./components/PanelHeader";
// import Resizer from "./components/Resizer";

// import { Direction } from "./components/Resizer/constants";

import Panel from "./resizer/Panel";

export default function PanelGauche() {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(
    "Cet ecran permet de voir quelques systemes planetaires <br />" +
      "Cliquez sur une planete pour avoir des informations sur celle-ci"
    // name
  );
  //vous pouvez en savoir plus en survolant les planètes
  const [index, setIndex] = useState(0);
  const [folded, setFolded] = useState(false);

  const [glitch, setGlitch] = useState(true);
  const ref = useRef();
  const ref2 = useRef();

  //bouton click
  const onClick = ({ currentTarget }) => {
    if (!folded) {
      gsap.to(ref.current, {
        height: "8vh",
        backgroundColor: "teal",
        duration: 1,
        clipPath:
          "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% 100%,0% 100%,0% 13px)",
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
    if (typeof window !== "undefined") {
      gsap.registerPlugin(Draggable);
      Draggable.create("#panneau", {
        type: "x,y",
        edgeResistance: 0.65,
        // bounds: "#container",
        inertia: true,
        onPress: function () {
          // console.log("clicked");
        },
      });
    }
  }, []);

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
          // "polygon(5% 0%, 95% 0%,100% 5%, 100% 95%, 95% 100%,0% 100%,0% 5%)",
          // "polygon(5% 0%, 95% 0%,100% 5%, 100% 95%, 95% 100%,0% 100%,0% 5%)",
          "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% calc(100% - 1px),0% calc(100% - 1px),0% 13px)",
        borderColor: "red",
        backgroundColor: "teal",
      }}
      className="fixed"
      id="panneau"
      ref={ref}
    >
      <div
        id="imgg"
        style={{
          top: "1vh",
          right: "8%",
          zIndex: "1001",
          position: "absolute",
          // size: "15px",
          size: "50px",
          // backgroundColor: "teal",
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
        {!folded ? <img src="cross.svg" /> : <img src="fleche_bas.svg" />}
      </div>
      <div
        ref={ref2}
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
            // "polygon(5% 0%, 95% 0%,100% 5%, 100% 95%, 95% 100%,0% 100%,0% 5%)",
            "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% 100%,0% 100%,0% 13px)",
        }}
      >
        <div id="glitchbody2">
          <div className="glitch">
            <div className={glitch ? "line" : ""}>{Parser(text)}</div>
            {glitch ? (
              <>
                <div className="line">{Parser(text)}</div>
                <div className="line">{Parser(text)}</div>
                <div className="line">{Parser(text)}</div>
                <div className="line">{Parser(text)}</div>
                <div className="line">{Parser(text)}</div>
                <div className="line">{Parser(text)}</div>
                <div className="line">{Parser(text)}</div>
                <div className="line">{Parser(text)}</div>
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

  const [text, setText] = useState("RR");
  // const [fullText, setFullText] = useState(
  //   // "Cet ecran permet de voir quelques systemes planetaires"
  //   name
  // );
  //vous pouvez en savoir plus en survolant les planètes
  const [index, setIndex] = useState(0);
  const [folded, setFolded] = useState(false);

  const [glitch, setGlitch] = useState(true);
  const ref = useRef();
  const ref2 = useRef();

  //bouton click
  const onClick = ({ currentTarget }) => {
    if (!folded) {
      gsap.to(ref.current, {
        height: "8vh",
        backgroundColor: "teal",
        duration: 1,
        clipPath:
          "polygon(5% 0%, 95% 0%,100% 13px, 100% calc(100% - 14px), 95% 100%,0% 100%,0% 13px)",
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
    if (typeof window !== "undefined") {
      gsap.registerPlugin(Draggable);

      Draggable.create("#panneauPlanet", {
        type: "x,y",
        edgeResistance: 0.65,
        // bounds: "#container",
        inertia: true,
        onPress: function () {
          // console.log("clicked");
        },
      });
    }
  }, []);

  var ttexte = "";

  if (planet) {
    console.log(planet);
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

    //   semi_major: "",
    // mass: "",
    // radius: "",
    // discovered: "",
  }

  return (
    // l'image dez fond a un ratio de 5/7
    <>
      {planet == null ? null : (
        // <Panel>
          <div
            style={{
              bottom: "5vh",
              left: "20%",
              width: "50%",
              height: "30%",
              // aspectRatio: "5/7",
              zIndex: "5",
              // clipPath: "polygon(50% 0%, 50% 0%,100% 50%, 50% 100%, 50% 100%,0% 50%)",
              clipPath:
                // "polygon(5% 0%, 95% 0%,100% 5%, 100% 95%, 95% 100%,0% 100%,0% 5%)",
                // "polygon(5% 0%, 95% 0%,100% 5%, 100% 95%, 95% 100%,0% 100%,0% 5%)",
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
                // size: "15px",
                size: "50px",
                // backgroundColor: "teal",
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
                <img src="fleche_haut.svg" />
              ) : (
                <img src="fleche_bas.svg" />
              )}
            </div>
            <div
              ref={ref2}
              style={{
                top: "1px" /* equal to border thickness */,
                left: "1px",
                right: "1px",
                bottom: "1px",
                // backgroundImage: "url('fondSF.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto auto",
                backgroundColor: "black",
                // fontFamily: "scifi",
                lineHeight: "1",
                padding: "25px",
                position: "absolute",
                width: "95%",
                height: "95%",
                zIndex: 1000,
                backgroundClip: "border-box",
                clipPath:
                  // "polygon(5% 0%, 95% 0%,100% 5%, 100% 95%, 95% 100%,0% 100%,0% 5%)",
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
        
      )}
    </>
  );
}

// export const usePlanetStore = create((set) => ({
//   planet: null,
//   semi_major: "",
//   mass: "",
//   radius: "",
//   discovered: "",
//   updateData: (planet) =>
//     set((state) => ({
//       planet: planet,
//     })),
// }));
