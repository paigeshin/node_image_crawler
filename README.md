# node_image_crawler

# Dependency

### Images-scraper
### fs 
### axios

```javascript

const Scraper = require('images-scraper');
const fs = require('fs');
const axios = require('axios');

const google = new Scraper({
    puppeteer: {
        headless: false,
    }
});

(async () => {
    const results = await google.scrape('japan', 3000);

    results.map( async (result, index) => {
        try {
            await download_image(result.url, `./downloads/image${index + 1}.png`)
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



```

# 주의점

- 생각보다 잘 못 긁어옴
- 이유는 모르겠지만 400개 500개 이상부터 더이상 못 긁어옴
