const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="ebooksImgBlkFront"]');
  const src = await el.getProperty('src');
  const srcTxt = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="productTitle"]');
  const txt = await el2.getProperty('textContent');
  const rawTxt = await txt.jsonValue();

  const [el3] = await page.$x(
    '//*[@id="buybox"]/div/table/tbody/tr[2]/td[2]/span'
  );
  const txt2 = await el3.getProperty('textContent');
  const price = await txt2.jsonValue();

  // console.log({ srcTxt, rawTxt, price });

  browser.close();
}

scrapeProduct(url);
