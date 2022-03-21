const express = require('express');
const app = express();
const {processCards} = require('./controllers/cardFunctions')
const {launchPuppetteer} = require('./controllers/PupetteerFunctions')

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/ankimate', async (req, res) => {
    res.render('index')
})

app.post('/ankimate', async (req, res) => {
    const start = performance.now();

    console.log(req.body)
    const pupetteer = await launchPuppetteer();
    if (!req.body.words) return

    console.log(processCards)
    const cardsLog = await processCards(req, pupetteer);

    res.json(cardsLog)
    res.send()
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
})

const port = 5000;

app.listen(port, () => {
    console.log(`Connect on port ${port}`)
})