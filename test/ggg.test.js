/*
 * @jest-environment node
 */

const vision = require("@google-cloud/vision");
// const {Storage} = require('@google-cloud/storage');
const projectId = "turing-position-236722";
const levenshtein = require("js-levenshtein");

import { render, screen, act } from "@testing-library/react";
// import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom";
// import Home from "../pages/index";
import PanelGauche from "../components_planet/PanneauMobile";
import React from "react";

// const setup = () => {
// return render(Home);
// };
// jest.mock('@react-three/cannon');

// test("Texte centrale", async () => {
//   var hh = "";
//   const result = render(<PanelGauche />);

//   await screen.findByRole("contact");
//   expect(screen.getByRole("contact")).toHaveTextContent(Array(7).join("Cliquez sur les fleches pour faire defiler les systemes solaires et cliquez sur une planete pour avoir des informations la concernant"));
// });

test("Texte centrale", async () => {
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    projectId: "turing-position-236722",
    // credentials:
    keyFilename:'turing-position-236722-f66db215fe06.json'
  });
  console.log("reeeeeeeee")

  const fileName =
    "test/__image_snapshots__/screencapture-test-js-create-react-app-home-1-snap.png";

  // Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  console.log("Text:");
  // detections.forEach((text) => console.log(text[0]));
  // detections.forEach((text) => console.log(text[0]));
  console.log(detections[0].description);
  var distance = levenshtein(
    detections[0].description,
    "CLIQUEZ SUR LES FLECHES POUR FAIRE DEFILER LES SYSTEHES SOLAIRES ET CLIQUEZ SUR UNE PLANETE POUR AVOIR DES INFORMATIONS LA CONCERNANT"
  );

  expect(distance).toBeLessThanOrEqual(5);

  // );
}, 10000);
// ee();

// const {Storage} = require('@google-cloud/storage');
// });
