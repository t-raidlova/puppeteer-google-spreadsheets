require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function spreadsheet() {
  // spreadsheet key
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_URL);
  // use service account creds
  await doc.useServiceAccountAuth(require('./creds-from-google.json'));

  await doc.loadInfo(); // loads document properties and worksheets

  await doc.updateProperties({ title: 'renamed doc' });

  const sheet = await doc.addSheet({ headerValues: ['name', 'email'] });

  const larryRow = await sheet.addRow({
    name: 'Larry Page',
    email: 'larry@google.com',
  });
  const moreRows = await sheet.addRows([
    { name: 'Sergey Brin', email: 'sergey@google.com' },
    { name: 'Eric Schmidt', email: 'eric@google.com' },
  ]);
}

spreadsheet();
