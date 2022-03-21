const puppeteer = require("puppeteer");

module.exports.launchPuppetteer = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    return page;
}