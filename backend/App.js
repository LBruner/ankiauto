const express = require('express');
const path = require("path");
const app = express();
const puppeteer = require('puppeteer');
const googleTTS = require('google-tts-api');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({extended: true}))

app.get('/ankimate', (req, res) => {
    res.render('index')
})


app.post('/ankimate', async (req, res) => {
    const data = await fetchData(req.body)
    const formatedData = await formatData(data);
    const audioFile = getAudioFiles(formatedData.word, formatedData.language);
    
    console.log(formatedData, audioFile)
})


const fetchData = async (requestBody) => {
    const {dataUrl, language, word} = getWordLocation(requestBody);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(dataUrl)
    return await page.evaluate((language,word) => {
        let phonetic;
        if (language === 'english')
            phonetic = document.querySelectorAll('.pronRH')[1].innerText;
        else
            phonetic = document.querySelectorAll('.pronWR')[0].innerText;

        return {
            word,
            translation: document.querySelectorAll('.ToWrd')[1].innerText,
            phonetic,
            language
        }
    }, language,word);
}

const getWordLocation = (body) => {
    const {language, word} = body.input;
    let dataUrl = 'https://www.wordreference.com';
    if (language === 'english') {
        dataUrl = dataUrl.concat('/enpt')
    } else {
        dataUrl = dataUrl.concat('/fren')
    }

    dataUrl = dataUrl.concat('/' + word)


    return {dataUrl, language,word};
}

const formatData = async (data) => {
    let {word, phonetic,language, translation} = data;

    translation = translation.split(' ')[0].toUpperCase();
    word = word.split(' ')[0].replace("'", "").toUpperCase();
    phonetic = phonetic.split(',')[0].replace("'", "")

    return {word, phonetic, language,translation}
}

const getAudioFiles =  (word,lang) =>{
    console.log(word, lang)
    const audioUrl = googleTTS.getAudioUrl(word, {
        lang: lang === 'english' ? 'en' : 'fr',
        slow: false,
        host: 'https://translate.google.com',
    });

    return audioUrl;
}

const port = 5000;

app.listen(port, () => {
    console.log(`Connect on port ${port}`)
})