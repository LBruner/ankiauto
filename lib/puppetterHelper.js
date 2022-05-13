import puppeteer from 'puppeteer';

export const launchPuppeteer = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    return {page, browser};
}

export const quitPuppeteer = async (puppeteer)=>{
    await puppeteer.close();
}

