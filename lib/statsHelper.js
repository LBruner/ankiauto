import {readFile, writeFile} from 'fs/promises'
import * as path from "path";

const statsPath = path.resolve(process.cwd(), 'user', 'stats.json')

export const recordStats = async (cardsLog) =>{
    const rawData = await readStatsFile();
    const data =  await JSON.parse(rawData);
    data.stats.addedWords += cardsLog.cardsAmount;
    
    const jsonData = JSON.stringify(data);
    await writeFile(statsPath, jsonData)
}

const readStatsFile = async() =>{
    return await readFile(statsPath, 'utf-8');
}