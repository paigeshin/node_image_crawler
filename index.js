const Scraper = require('images-scraper');
const fs = require('fs');
const axios = require('axios');

const google = new Scraper({
    puppeteer: {
        headless: false,
    }
});

(async () => {
    const results = await google.scrape('japan scenery', 3000);

    results.map( async (result, index) => {
        try {
            await download_image(result.url, `./downloads4/image${index + 1}.png`)
        } catch (e) {
            console.log("Some Error happend, but keep going")
        }
    });
})();

const download_image = (url, image_path) =>
    axios({
        url,
        responseType: 'stream',
    }).then(
        response =>
            new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(image_path))
                    .on('finish', () => resolve())
                    .on('error', e => reject(e));
            }),
    );
