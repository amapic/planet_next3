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
// import PanelGauche from "../components_planet/PanneauMobile";
// import React from "react";


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    headless: true,
    // product: "chrome",

    // args: ["--no-sandbox","--disable-setuid-sandbox"],
    args: ["--no-sandbox"],
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    defaultViewport: { width: 1700, height: 800 },
    slowMo: 50,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://amaurypichat.fr/dev/planet", {
    waitUntil: "networkidle0",
  });

  deleteFile("image/test_photo1.png");

  // sleep(30000).then(async () => {
  // const element = await page.waitForSelector("#div_canvas1");

  // await element.click();
  // const [response] = await Promise.all([
  //   page.waitForSelector("#div_canvas1"),
  //   element.click(),
  //   sleep(10000) 
  // ]);
  // });

  const image = await page.screenshot({
    path: "image/test_photo1.png",
  });
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    projectId: "turing-position-236722",
    // credentials:
    keyFilename:'turing-position-236722-f66db215fe06.json'
  });
//   console.log("reeeeeeeee")

  const fileName =
    "test/__image_snapshots__/screencapture-test-js-create-react-app-home-1-snap.png";

//   // Performs text detection on the local file
  const [result] = await client.textDetection("image/test_photo1.png");
  const detections = result.textAnnotations;
//   console.log("Text:");
//   detections.forEach((text) => console.log(text[0]));
//   detections.forEach((text) => console.log(text[0]));
  console.log(detections[0].description);
  var distance = levenshtein(
    detections[0].description,
    "CLIQUEZ SUR LES FLECHES POUR FAIRE DEFILER LES SYSTEHES SOLAIRES ET CLIQUEZ SUR UNE PLANETE POUR AVOIR DES INFORMATIONS LA CONCERNANT"
  );

  expect(distance).toBeLessThanOrEqual(5);

  await browser.close();

},50000);
