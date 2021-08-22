const puppeteer = require("puppeteer");
const path = require("path");

/** @type {puppeteer.Browser} browser */
let browser;
/** @type {puppeteer.Page} page */
let page;
const fileUrl =
  // "file://" + path.join(process.cwd().replace(/src/, ""), "dist", "index.html");
  "file://" + path.join(process.cwd(), "dist", "index.html");

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = (await browser.pages())[0];
});

beforeEach(async () => {
  await page.goto(fileUrl);
});

afterAll(async () => {
  await browser.close();
});

// test("base", async () => {
//   console.log("Test1 start");
//   expect(10).toBe(10);
//   console.log("Test1 finnished");
// });
// test("UI-header", async () => {
//   const response = await page.evaluate(() => {
//     return document.documentElement.outerHTML;
//   });
//   //console.log(response);
//   expect(typeof response).toBe("string");
// });
//   expect(response).toBe("HEADER__");
// });
// test("UI-Console-2", async () => {
//   const response = await page.evaluate(() => {
//     let title = document.querySelector("#head1");
//     return title.innerHTML;
//   });
//   expect(response).toBe("HEADER__");
// });
// test("UI-Console-3", async () => {
//   const response = await page.evaluate(() => {
//     let title = document.querySelector("#head1");
//     return title.innerHTML;
//   });
//   expect(response).toBe("HEADER__");
// });
