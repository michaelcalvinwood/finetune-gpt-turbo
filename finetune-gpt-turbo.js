
const axios = require('axios');

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





const test = async () => {
    const csv = await getCsv(dataUrl);
    console.log(csv.substring(0, 512));
}
test();