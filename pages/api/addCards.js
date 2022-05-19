import {launchPuppeteer} from "../../lib/puppetterHelper";
import {processCards} from "../../lib/addCardsHelper";

export default async function handler(req, res) {
    const {page,browser} = await launchPuppeteer();

    if (req.method === 'POST') {
        const cardsInfo = await processCards(req, page,browser);

        res.json({cardsLog: cardsInfo})
    }
}