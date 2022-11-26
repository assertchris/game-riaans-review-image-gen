import puppeteer from 'puppeteer';
import { promises } from 'fs';

(async () => {
  const browser = await puppeteer.launch({

  });

  const page = await browser.newPage();

  const files = await promises.readdir('./sources');

  for (let file of files) {
    await page.goto('http://127.0.0.1:3000');

    await page.waitForSelector('.background');

    const source = await promises.readFile('./sources/' + file);

    await page.evaluate(source => {
        document.querySelector('.code').innerHTML = source;
    }, source.toString('utf-8'));

    await page.screenshot({
      path: './images/' + file + '.png',
      clip: {
          x: 0,
          y: 0,
          width: 160,
          height: 144,
      }
    });
  }

  await browser.close();
})();