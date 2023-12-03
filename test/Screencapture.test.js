import { toMatchImageSnapshot } from "jest-image-snapshot";
const puppeteer = require("puppeteer");
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

it("CreateReactApp home", async () => {
  const browser = await puppeteer.launch({
    
    product: "chrome",

    args: ["--no-sandbox","--disable-setuid-sandbox"],

    defaultViewport: { width: 1700, height: 800 },
  });
  const page = await browser.newPage();
  await page.goto("https://amaurypichat.fr/dev/planet/");

  // await page.waitForTimeout(6000);
  // sleep(20000).then(async () => {
  //   console.log("World!");
  //   const image = await page.screenshot({
  //     clip: { x: 220, y: 0, width: 630, height: 360 },
  //   });

  //   expect(image).toMatchImageSnapshot();

  //   // await browser.close();
  // });

  sleep(20000).then(async () => {
    // const element = await page.waitForSelector("#div_canvas1");

    // await element.click();

    // console.log("World!");
    const image = await page.screenshot({
      clip: { x: 220, y: 0, width: 1700, height: 800 },
    });

    expect(image).toMatchImageSnapshot({
      failureThreshold: 65,
      threshold: 65,
      failureThresholdType: "percent",
    });

    await browser.close();
  });

  // await browser.close();
}, 100000);

// it('CreateReactApp home', async () => {
//   expect("2").toEqual("1");
// })
