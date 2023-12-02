

import { toMatchImageSnapshot } from 'jest-image-snapshot';
const puppeteer = require('puppeteer');
expect.extend({ toMatchImageSnapshot });


// it('CreateReactApp home', async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('http://localhost:4000/screenshot?url=https://example.com/');
//     const image = await page.screenshot();

//     expect(image).toMatchImageSnapshot();
// },50000)

it('CreateReactApp home', async () => {
  expect("2").toEqual("1");
})
