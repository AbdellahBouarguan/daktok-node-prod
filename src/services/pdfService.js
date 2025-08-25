const puppeteer = require('puppeteer');
const ejs = require('ejs');
const path = require('path');

const PDFService = {};

PDFService.generateInvoice = async (order) => {
  const filePath = path.join(__dirname, '../../views/invoice-template.ejs');
  const html = await ejs.renderFile(filePath, { order });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdfBuffer;
};

module.exports = PDFService;