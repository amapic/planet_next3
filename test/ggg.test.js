/*
 * @jest-environment node
 */

const vision = require("@google-cloud/vision");
// const {Storage} = require('@google-cloud/storage');
const projectId = "turing-position-236722";
const levenshtein = require("js-levenshtein");
const fs = require("fs").promises;

import { toMatchImageSnapshot } from "jest-image-snapshot";
import puppeteer from "puppeteer";
expect.extend({ toMatchImageSnapshot });

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

accentsTidy = function (s) {
  // console.log("carac", s);
  var r = s.toLowerCase();
  r = r.replace(new RegExp(/\s/g), "");
  r = r.replace(new RegExp(/[àáâãäå]/g), "a");
  r = r.replace(new RegExp(/æ/g), "ae");
  r = r.replace(new RegExp(/ç/g), "c");
  r = r.replace(new RegExp(/[èéêë]/g), "e");
  r = r.replace(new RegExp(/[ìíîï]/g), "i");
  r = r.replace(new RegExp(/ñ/g), "n");
  r = r.replace(new RegExp(/[òóôõö]/g), "o");
  r = r.replace(new RegExp(/œ/g), "oe");
  r = r.replace(new RegExp(/[ùúûü]/g), "u");
  r = r.replace(new RegExp(/[ýÿ]/g), "y");
  r = r.replace(new RegExp(/\W/g), "");
  return r;
};

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} has been deleted.`);
  } catch (err) {
    console.error(err);
  }
}

test("Texte centrale", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    product: "chrome",

    // args: ["--no-sandbox","--disable-setuid-sandbox"],
    args: ["--no-sandbox"],
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    defaultViewport: { width: 1700, height: 800 },
    slowMo: 50,
  });
  const page = await browser.newPage();
  await page.goto("https://amaurypichat.fr/dev/planet", {
    waitUntil: "networkidle2",
  });

  deleteFile("image/test_photo1.png");

  const image = await page.screenshot({
    path: "image/kaka.png",
  });
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    projectId: "turing-position-236722",
    // credentials:
    keyFilename: "turing-position-236722-f66db215fe06.json",
  });

  const fileName =
    "test/__image_snapshots__/screencapture-test-js-create-react-app-home-1-snap.png";

  // Performs text detection on the local file
  const [result] = await client.textDetection("image/test_photo1");
  const detections = result.textAnnotations;
  // console.log("Text:");
  // console.log(accentsTidy(detections[0].description));
  var ttexte =
    "CLIQUEZ SUR LES FLECHES POUR FAIRE DEFILER LES SYSTEHES SOLAIRES" +
    "ET CLIQUEZ SUR UNE PLANETE POUR AVOIR DES INFORMATIONS LA CONCERNANT Kepler-107 Age: 4.29 milliard d'année Distance: 530 année lumière Rayon: 1.4 rayon solaire";

  console.log("ttexte", ttexte);
  var distance = levenshtein(
    accentsTidy(detections[0].description),
    accentsTidy(ttexte)
  );

  console.log("distance : " + distance);

  expect(distance).toBeLessThanOrEqual(5);

  // );
}, 60000);
// ee();

// const {Storage} = require('@google-cloud/storage');
// });

// &
//       "ET CLIQUEZ SUR UNE PLANETE POUR AVOIR DES INFORMATIONS LA CONCERNANT" &
//       "Kepler-107" &
//       "Age: 4.29 milliard d'année" &
//       "Distance: 530 année lumière" &
//       "Rayon: 1.4 rayon solaire"


