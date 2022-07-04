const url = require('url');
const axios = require("axios");
const config = require("./config");

module.exports = {

    validateVideoURLOrFail: (youtubeVideoURL) => {
        // TODO

        return true;
    },

    extractVideoId: (youtubeVideoURL) => {
        const parsedURL = url.parse(youtubeVideoURL, true);
        if (parsedURL.query.v) {
            return parsedURL.query.v;
        } else {
            throw new Error(`Failed extracting videoId from "${youtubeVideoURL}"`)
        }
    },

    fetchVideoDataFromYoutubeAPI: (videoId) => {
        return axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.youtube.api_key}`);
    }
}