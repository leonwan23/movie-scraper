import puppeteer from "puppeteer";

function capitalizeWord(word) {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return "";
}

async function getCathayElement(page, element) {
  const fieldChosen = capitalizeWord(element);

  const divElement = await page.$eval(
    ".movieDetails > .item > #ContentPlaceHolder1_lbl" + fieldChosen,
    element => element.innerText.trim()
  );
  return divElement;
}

async function getCathayDetails(page, element) {
  const fieldChosen = capitalizeWord(element);

  const divElement = await page.$eval(
    ".pinkDetails > ul > li > #ContentPlaceHolder1_lbl" + fieldChosen,
    element => element.innerText.trim()
  );
  return divElement;
}

function removeRatingFromTitle(title) {
  if (title) {
    return title.slice(0, title.lastIndexOf(" "));
  }
  return "No title available";
}

function getPlatinumCinemas(arr) {
  if (arr && arr.length > 0) {
    let cinemas = [...new Set(arr)].filter(
      element => !element.includes("with")
    );
    return cinemas.length > 0 ? cinemas : null;
  }
  return null;
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

      const poster = await page.$eval(".poster > img", img => img.src);

      const cast = await getCathayElement(page, "cast");
      const director = await getCathayElement(page, "director");
      const description = await getCathayElement(page, "description");

      const language = await getCathayDetails(page, "language");
      const rating = await getCathayDetails(page, "rating");
      const runtime = await getCathayDetails(page, "runtime");

      //TODO: COLLECT ALL TABLES THEN ITERATE FROM THERE
      //   const showtimeTables = await page.$$eval(".tabs", (
      //       tabs => tabs.map(tab => {
      //           const a = tab.querySelectorAll(".tabbers")
      //           const test = Array.from(a, b => b.querySelector(".movie-timings"))
      //           return test
      //       })
      //   ));
      const data = await page.evaluate(() => {
        let elements = Array.from(document.querySelectorAll(".tabs"));
        let test = elements.map(element => {
          return element;
        });
        return test;
      });
      data.map(a => console.log(a))
      //   const b = Array.from(tds).map(td => td.querySelectorAll(".tabbers"));

      //   showtimeTables.map(async table => {
      //     //   const cinema = await table.$eval(".M_movietitle", el => el.innerText)
      //     //   console.log(cinema)
      //       const cinemaContainer = await table.$$(".tabbers > .movie-container")
      //     //   console.log(cinemaContainer)
      //       cinemaContainer.map(async container => {
      //           const cinemaDesc = await container.$eval(".movie-desc > strong", el => el.innerText)
      //           console.log(cinemaDesc)
      //       })
      //   })

      results.push({
        title: removeRatingFromTitle(title)
        // poster,
        // cast,
        // director,
        // description,
        // language,
        // rating,
        // runtime
        // cinemas
        // PMS: getPlatinumCinemas(PMS)
      });
    }
    browser.close();
    return results;
  } catch (e) {
    console.log(e);
  }
}
