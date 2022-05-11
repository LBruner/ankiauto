import {launchPuppeteer} from "../../lib/puppetterHelper";
import {processCards} from "../../lib/addCardsHelper";

export default async function handler(req, res) {
    const puppeteer = await launchPuppeteer();

    if (req.method === 'GET') {
        res.json({message: 'OI'})
    }

    if (req.method === 'POST') {

        const cardsLog = await processCards(req, puppeteer);

        res.json({message: 'success!'})
    }
}