const cherio = require("cherio");
const request = require("request");

const imageRepository = require("../repository/imageRepository");

class ImageService {
    async get() {
        return await imageRepository.get();
    }

    async create(data) {
        const {url} = data;
        if (!url) throw `Error to load URL ${url}!`;

        const dataImages = [];

        request(url, (err, resp, html) => {
            if (!err && resp.statusCode == 200) {
                const $ = cherio.load(html);

                $("img").each((index, image) => {
                    let img = $(image).attr("src");

                    const data = {
                        baseUrl: url,
                        url: img,
                    };

                    dataImages.push(data);
                });
                if (dataImages) {
                    imageRepository.createMany(dataImages);
                }

            }
        });
    }
}

module.exports = new ImageService();
