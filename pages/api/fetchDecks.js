import {fetchUserDecks} from "../../lib/ankiConnectHelper";
import path from "path";
import {readFile, writeFile} from "fs/promises";

const decksPath = path.resolve(process.cwd(), 'user', 'decks.json')

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const decks = await readFile(decksPath, 'utf-8');

        
        const data = JSON.parse(decks);
        if (data.allDecks.length === 0)
            await fetchDecks();
        
        res.json(decks);
    }
}

const fetchDecks = async () => {
    const decks = await fetchUserDecks();
    const jsonData = JSON.stringify(decks, null, 2)
    await writeFile(decksPath, jsonData)
}

