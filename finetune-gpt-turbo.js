
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

function cleanText(inputString) {
    // This regular expression matches a question mark followed by a non-whitespace character
    const regex = /\"\?(\S)/g;
  
    // The replace function uses the regex to find matches and replaces them.
    // The $1 in the replacement string refers to the first captured group in the regex (the non-whitespace character)
    return inputString.replace(regex, "' $1");
  }

async function convertCsvToOutput (csv) {
    const parsed = papa.parse(csv).data;
    for (let i = 0; i < parsed.length; ++i) {
        const entry = parsed[i];
        //console.log(entry);
        const text = entry[5];
        if (text.length < 128) continue;
        const standardized = await ai.rewriteAsNewsArticle(text);
        //console.log('standardized', standardized);
        const q = `INSERT INTO gpt_3_turbo (raw_input) VALUES (${mysql.escape(standardized)})`;
        const r = await mysql.query(q);
        console.log(i);
        if (i > 2500) break;
    }
}





const test = async () => {

    const csv = await getCsv(dataUrl);
    const output = await convertCsvToOutput(csv);
}
test();