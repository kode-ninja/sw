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

    // https://developers.google.com/youtube/v3/docs/videos/list?apix_params=%7B%22part%22%3A%5B%22snippet%22%5D%2C%22id%22%3A%5B%22F2zhYgwNElQ%22%5D%7D
    // https://developers.google.com/youtube/v3/docs/videos/list?apix=true&apix_params=%7B%22part%22%3A%5B%22contentDetails%22%2C%22snippet%22%2C%22player%22%5D%2C%22id%22%3A%5B%22F2zhYgwNElQ%22%5D%7D
    fetchVideoDataFromYoutubeAPI: (videoId) => {
        return axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&id=${videoId}&key=${config.youtube.api_key}`);
    }
}