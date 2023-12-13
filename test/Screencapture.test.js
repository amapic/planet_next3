/*
 * @jest-environment node
 */

import { toMatchImageSnapshot } from "jest-image-snapshot";
import puppeteer from "puppeteer";
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

it("CreateReactApp home", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // product: "chrome",

    // args: ["--no-sandbox","--disable-setuid-sandbox"],
    args: ["--no-sandbox"],
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    defaultViewport: { width: 1700, height: 800 },
    slowMo: 50
  });
  const page = await browser.newPage();
  await page.goto("https://amaurypichat.fr/dev/planet", {
    waitUntil: "networkidle2",
    
  });

  //   // await page.waitForTimeout(6000);
  //   // sleep(20000).then(async () => {
  //   //   console.log("World!");
  const image = await page.screenshot({
    // path:"image/kaka.png"
    // clip: { x: 220, y: 0, width: 630, height: 360 },
  });

  expect(image).toMatchImageSnapshot({
    // comparisonMethod: 'ssim',
    failureThreshold: 5,
    failureThresholdType: 'percent'
  });

  await browser.close();
}, 100000);

// sleep(30000).then(async () => {
// const element = await page.waitForSelector("#div_canvas1");

// await element.click();

// console.log("World!");
// const image = await page.screenshot();

// expect(image).toMatchImageSnapshot({
//   failureThreshold: 0,
//   failureThresholdType: "percent"
// });

// await browser.close();
// });

// await browser.close();
// }, 100000);

// it('CreateReactApp home', async () => {
//   expect("2").toEqual("1");
// })
