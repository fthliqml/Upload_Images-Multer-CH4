const Imagekit = require("imagekit");
require("dotenv").config();

const imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLICKEY,
    privateKey: process.env.IMAGEKIT_PRIVATEKEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

module.exports = imagekit;
