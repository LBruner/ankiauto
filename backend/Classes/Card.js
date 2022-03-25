const stringSimilarity = require("string-similarity");

function Card(data){
    const {word, phrase, phonetic, translation, audioFiles,deck} = data;
    const {wordAudio, phraseAudio} = audioFiles;

    const splitedPhrase = phrase.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').split(' ')

    const {bestMatch} = stringSimilarity.findBestMatch(word.toLowerCase(), splitedPhrase);
    const matchWord = bestMatch.target;

    console.log(deck)
    
    return {"action": "addNote", "version": 6, "params": {
    "note": {
        "deckName": deck, "modelName": "Basic", "fields": {
            "Front": `${phrase.replace(matchWord,`<font color="#4a38d1">${matchWord}</font>`)}`,
                "Back": `<font color="#4a38d1">${word}</font> ${phonetic} <br><b>${translation}</b>`
        }, "options": {
            "allowDuplicate": false, "duplicateScope": "deck", "duplicateScopeOptions": {
                "deckName": "Test", "checkChildren": true, "checkAllModels": false
            }
        }, "audio": [{
            "url": wordAudio,
            "filename": `${Math.random()}.mp3`,
            "skipHash": "7e2c2f954ef6051373ba916f000168dc",
            "fields": ["Back"]
        }, {
            "url": phraseAudio,
            "filename": `${Math.random()}.mp3`,
            "skipHash": "7e2c2f954ef6051373ba916f000168dc",
            "fields": ["Front"]
        }], // "video": [{
        //     "url": "https://cdn.videvo.net/videvo_files/video/free/2015-06/small_watermarked/Contador_Glam_preview.mp4",
        //     "filename": "countdown.mp4",
        //     "skipHash": "4117e8aab0d37534d9c8eac362388bbe",
        //     "fields": [
        //         "Back"
        //     ]
        // }],
        // "picture": [{
        //     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_black_cat_named_Tilly.jpg/220px-A_black_cat_named_Tilly.jpg",
        //     "filename": "black_cat.jpg",
        //     "skipHash": "8d6e4646dfae812bf39651b59d7429ce",
        //     "fields": [
        //         "Back"
        //     ]
        // }]
    }
}
}}

module.exports = Card;