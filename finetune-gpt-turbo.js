
const axios = require('axios');
const papa = require("papaparse");

const ai = require('./utils/ai')
const mysql = require('./utils/mysql');

const dataUrl = `https://www.michaelcalvinwood.net/datasets/text-data/NewsArticles.csv`;

async function getCsv (url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error(err);
        return '';
    }
}

async function convertCsvToOutput (csv) {
    const parsed = papa.parse(csv).data;
    for (let i = 0; i < parsed.length; ++i) {
        const entry = parsed[i];
        const text = entry[5];
        const standardized = await ai.rewriteAsNewsArticle(text);
        console.log('standardized', standardized)
        if (i > 0) break;
    }
}





const test = async () => {

    const csv = await getCsv(dataUrl);
    const output = await convertCsvToOutput(csv);
}
test();