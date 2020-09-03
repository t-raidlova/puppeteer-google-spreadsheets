require('dotenv').config();
const puppeteer = require('puppeteer');
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function scrapeProduct(url) {
  // spreadsheet key
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_URL);

  // use service account creds
  await doc.useServiceAccountAuth(require('./creds-from-google.json'));

  // loads document properties and worksheets
  await doc.loadInfo();

  //puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  //title
  const [el2] = await page.$x('//*[@id="productTitle"]');
  const txt = await el2.getProperty('textContent');
  const title = await txt.jsonValue();
  //price
  const [el3] = await page.$x(
    '//*[@id="buybox"]/div/table/tbody/tr[2]/td[2]/span'
  );
  const txt2 = await el3.getProperty('textContent');
  const price = await txt2.jsonValue();

  //adding to spreadsheet
  const sheet = await doc.addSheet({
    headerValues: ['title', 'price'],
  });

  await sheet.addRow({
    title,
    price,
  });

  browser.close();
}

scrapeProduct('/*url*/');
