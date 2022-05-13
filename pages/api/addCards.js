import {launchPuppeteer} from "../../lib/puppetterHelper";
import {processCards} from "../../lib/addCardsHelper";

export default async function handler(req, res) {
    const {page,browser} = await launchPuppeteer();

    if (req.method === 'GET') {
        res.json({message: 'OI'})
    }

    if (req.method === 'POST') {
        const cardsLog = await processCards(req, page,browser);

        res.json({'Cards log': cardsLog})
    }
}