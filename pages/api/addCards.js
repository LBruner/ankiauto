import {launchPuppeteer} from "../../lib/puppetterHelper";
import {processCards} from "../../lib/addCardsHelper";
import {recordStats} from "../../lib/statsHelper";

export default async function handler(req, res) {
    const {page, browser} = await launchPuppeteer();

    if (req.method === 'POST') {
        const cardsLog = await processCards(req, page, browser);
    
        await recordStats({cardsAmount: cardsLog.successful.length});
        res.json({cardsLog})
    }
}
