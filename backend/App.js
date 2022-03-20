const express = require('express');
const path = require("path");
const app = express();
const puppeteer = require('puppeteer');
const googleTTS = require('google-tts-api');
const axios = require('axios');
const Card = require('./controllers/cardFunctions')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/ankimate', (req, res) => {
    res.render('index')
})

app.post('/ankimate', async (req) => {
    const {words, language} = req.body
    console.log(words)
    for (let word of words) {
        const data = await fetchData({language, word})
        // console.log(data)
        const formatedData = await formatData(data);
        const audioFiles = getAudioFiles(formatedData);
        await addCard({...formatedData, audioFiles})
    }
})

const fetchData = async (requestBody) => {
    const {dataUrl, language, word} = getWordLocation(requestBody);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(dataUrl)
    return await page.evaluate((language, word) => {
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
            phrase: document.querySelectorAll('.FrEx')[0].innerText,
            translation: document.querySelectorAll('.ToWrd')[1].innerText,
            phonetic,
            language
        }
    }, language, word);
}

const getWordLocation = (body) => {
    const {language, word} = body;
    let dataUrl = 'https://www.wordreference.com';
    if (language === 'english') {
        dataUrl = dataUrl.concat('/enpt')
    } else {
        dataUrl = dataUrl.concat('/fren')
    }

    dataUrl = dataUrl.concat('/' + word)


    return {dataUrl, language, word};
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

const port = 5000;

app.listen(port, () => {
    console.log(`Connect on port ${port}`)
})