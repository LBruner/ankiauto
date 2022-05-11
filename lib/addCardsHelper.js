import axios from "axios";
const googleTTS = require('google-tts-api')
import Card from './models/Card'

export const processCards = async (req, puppeteer) => {
    const {words, language,deck = language} = req.body;
    const addedWords = {successful: [], error: {'words': [], log: []}};
    
    for (let word of words) {
        try {
            const data = await fetchData({language, word}, puppeteer)
            const formattedData = await formatData(data);
            const audioFiles = getAudioFiles(formattedData);
            await addCard({...formattedData, audioFiles,deck})
            addedWords.successful.push(word);
        } catch (error) {
            addedWords.error.words.push(word);
            console.log(error)
        }
    }
    console.log(addedWords)
    return addedWords;
}

const fetchData = async (requestBody, puppeteer) => {
    const {dataUrl, language, word,phrase} = getWordLocation(requestBody);
    await puppeteer.goto(dataUrl)
    return await puppeteer.evaluate((language, word,phrase) => {
        let phonetic;
        if (language === 'english') {
            phonetic = document.querySelectorAll('.pronRH')[1].innerText;
            language = 'en'
        } else {
            phonetic = document.querySelectorAll('.pronWR')[0].innerText;
            language = 'fr'
        }

        return {
            word,
            phrase: phrase || document.querySelectorAll('.FrEx')[0].innerText,
            translation: document.querySelectorAll('.ToWrd')[1].innerText,
            phonetic,
            language
        }
    }, language, word,phrase);
}

const getWordLocation = (body) => {
    const {language} = body;
    const {word,phrase} = body.word;
    let dataUrl = 'https://www.wordreference.com';
    if (language === 'english') {
        dataUrl = dataUrl.concat('/enpt')
    } else {
        dataUrl = dataUrl.concat('/fren')
    }

    dataUrl = dataUrl.concat('/' + word)


    return {dataUrl, language, word,phrase};
}

const formatData = async (data) => {
    let {word, phonetic, language, translation, phrase} = data;
    translation = translation.split(' ')[0].toUpperCase();
    word = word.split(' ')[0].replace("'", "").toUpperCase();
    phonetic = phonetic.split(',')[0].replace("'", "")

    return {word, phonetic, language, translation, phrase}
}

const getAudioFiles = (data) => {
    const {word, language, phrase} = data;
    const getUrl = (searchTerm) => googleTTS.getAudioUrl(searchTerm, {
        lang: language, slow: false, host: 'https://translate.google.com',
    });
    const wordAudio = getUrl(word, language);
    const phraseAudio = getUrl(phrase, language);

    return {wordAudio, phraseAudio};
}

const addCard = async (data) => {
    const cardData = new Card({...data});
    await axios.post('http://localhost:8765', cardData)
}