const config = {
    app: {
        schema: 'http',
        host: 'localhost',
        port: 3000
    },
    server: {
        port: 3001
    },
    youtube: {
        api_key: process.env.YOUTUBE_DATA_API_KEY
    }
};

module.exports = config;