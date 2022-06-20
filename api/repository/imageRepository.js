const ImageStorage = require("../models/image");

class ImageRepository {
    async get() {
        return await ImageStorage.find();
    }

    async create(data) {
        return ImageStorage.create(data);
    }

    async createMany(data) {
        return ImageStorage.insertMany(data);
    }

    async deleteMany() {
        return ImageStorage.deleteMany();
    }
}

module.exports = new ImageRepository();
