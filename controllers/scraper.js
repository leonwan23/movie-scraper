import puppeteer from 'puppeteer';

async function getCathayElement(element) {
    const fieldChosen = element.charAt(0).toUpperCase() + element.slice(1);

    const divElement = await page.$('.movieDetails > .item > #ContentPlaceHolder1_lbl' + fieldChosen)
    return await page.evaluate(element => element.innerText.trim(), divElement)
}

export async function cathayScraper() {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto('https://www.cathaycineplexes.com.sg/movies/');

    // Gather assets page urls for all the blockchains
    const assetUrls = await page.$$eval('.boxes > .showing > .captionfull a:first-child', assetLinks => assetLinks.map(link => link.href));

    const results = [];


    // Visit each assets page one by one
    for (let assetsUrl of assetUrls) {
        await page.goto(assetsUrl);

        const titleElement = await page.$('.movieDetails > #ContentPlaceHolder1_lblTitle')

        const title = await page.evaluate(element => element.innerText.trim(), titleElement)
        const cast = getCathayElement('cast')
        const director = getCathayElement('director')
        const synopsis = getCathayElement('synopsis')

        results.push({
            title,
            cast,
            director,
            synopsis
        })
    }

    // Results are ready
    console.log(results);

    browser.close();

}