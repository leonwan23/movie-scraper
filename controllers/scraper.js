import puppeteer from "puppeteer";

async function getCathayElement(page, element) {
  const fieldChosen = element.charAt(0).toUpperCase() + element.slice(1);

  const divElement = await page.$$eval(
    ".movieDetails > .item > #ContentPlaceHolder1_lbl" + fieldChosen,
    element => element.innerText.trim()
  );
  return divElement;
}

export async function cathayScraper() {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  try {
    await page.goto("https://www.cathaycineplexes.com.sg/movies/");

    // Gather assets page urls for all the blockchains
    const assetUrls = await page.$$eval(
      ".boxes > .showing > .captionfull a:first-child",
      assetLinks => assetLinks.map(link => link.href)
    );
    const results = [];

    // Visit each assets page one by one
    for (let assetsUrl of assetUrls) {
      await page.goto(assetsUrl);

      const title = await page.$eval(
        ".movieDetails > #ContentPlaceHolder1_lblTitle",
        element => element.innerText.trim()
      );

      const cast = await page.$eval(
        ".movieDetails > .item > #ContentPlaceHolder1_lblCast",
        element => element.innerText.trim()
      );

      const director = await page.$eval(
        ".movieDetails > .item > #ContentPlaceHolder1_lblDirector",
        element => element.innerText.trim()
      );

      const description = await page.$eval(
        ".movieDetails > .item > #ContentPlaceHolder1_lblDescription",
        element => element.innerText.trim()
      );

      results.push({
        title,
        cast,
        director,
        description
      });
    }
    browser.close();
    return results;

    // const assetUrls = await page.$$eval('.table-assets > tbody > tr .col-actions a:first-child', assetLinks => assetLinks.map(link => link.href));

    // const results = [];

    // // Visit each assets page one by one
    // for (let assetsUrl of assetUrls) {
    //     await page.goto(assetsUrl);

    //     // Now collect all the ICO urls.
    //     const icoUrls = await page.$$eval('#page-wrapper > main > div.container > div > table > tbody > tr > td:nth-child(2) a', links => links.map(link => link.href));

    //     // Visit each ICO one by one and collect the data.
    //     for (let icoUrl of icoUrls) {
    //         await page.goto(icoUrl);

    //         const icoImgUrl = await page.$eval('#asset-logo-wrapper img', img => img.src);
    //         const icoName = await page.$eval('h1', h1 => h1.innerText.trim());
    //         // TODO: Gather all the needed info like description etc here.

    //         results.push([{
    //             icoName,
    //             icoUrl,
    //             icoImgUrl
    //         }]);
    //     }
    // }
  } catch (e) {
    console.log(e);
  }
}
