
const axios = require('axios');
const papa = require("papaparse");

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

function convertCsvToOutput (csv) {
    const parsed = papa.parse(csv).data;
    console.log('parsed', parsed);
    for (let i = 0; i < parsed.length; ++i) {
        const entry = parsed[i];
        const text = entry.replaceAll()
        console.log(entry[5]);
        if (i > 3) break;
    }
}





const test = async () => {
    const rows = await mysql.query('SHOW DATABASES');
    console.log(rows);
    return;

    const csv = await getCsv(dataUrl);
    convertCsvToOutput(csv);
}
test();