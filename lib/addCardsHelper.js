import axios from "axios";
import Card from './models/Card'

const googleTTS = require('google-tts-api')

export const processCards = async (req, puppeteer, browser) => {
    const {words, language, deck = language} = req.body;
    const addedWords = {successful: [], errors: []}

    for (let word of words) {
        try {
            const data = await fetchData({language, word}, puppeteer)
            const formattedData = await formatData(data);
            const audioFiles = getAudioFiles(formattedData);
            await addCard({...formattedData, audioFiles, deck})
            addedWords.successful.push(word.word);
        } catch (error) {
            addedWords.errors.push(word)
        }
    }
    await puppeteer.close();
    await browser.close();
    return addedWords;
}

const fetchData = async (requestBody, puppeteer) => {
    const {dataUrl, language, word, phrase, meaning} = getWordLocation(requestBody);
    await puppeteer.goto(dataUrl)
    return await puppeteer.evaluate((language, word, phrase, meaning) => {
        let phonetic;
        let tooltip;
        
        if (language === 'english') {

            language = 'en'
            try {
                phonetic = document.querySelectorAll('.pronRH')[1].innerText;
            } catch (e) {
            }
            try {
                if (!phonetic) {
                    phonetic = document.querySelectorAll('.pronRH')[0].innerText
                }
            } catch (e) {

            }
            try {
                phonetic = document.querySelectorAll('.pronWR.tooltip.pronWidget')[0].innerText
            } catch (e) {

            }
            try {
                tooltip = document.querySelectorAll('.ToWrd .POS2')[0].innerText;
            }catch (e) {
                
            }
        } else {
            phonetic = document.querySelectorAll('.pronWR')[0].innerText;
            language = 'fr'
        }
        return {
            word,
            phrase: phrase || document.querySelectorAll('.FrEx')[0].innerText,
            translation: meaning || document.querySelectorAll('.ToWrd')[1].innerText,
            phonetic: phonetic,
            tooltip: tooltip || '',
            language
        }
    }, language, word, phrase, meaning);
}

const getWordLocation = (body) => {
    const {language} = body;
    const {word, phrase, meaning} = body.word;
    let dataUrl = 'https://www.wordreference.com';
    if (language === 'english') {
        dataUrl = dataUrl.concat('/enpt')
    } else {
        dataUrl = dataUrl.concat('/fren')
    }

    dataUrl = dataUrl.concat('/' + word)


    return {dataUrl, language, word, phrase, meaning};
}

const formatData = async (data) => {
    let {word, phonetic, language, translation, phrase,tooltip} = data;
    translation = translation.replace(tooltip, '').replaceAll(",", "").toUpperCase();
    word = word.split(' ')[0].replace("'", "").toUpperCase();
    phonetic = phonetic.replaceAll("/", "").replaceAll("ˈ", "")
    phonetic = `(${phonetic})`
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