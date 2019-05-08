
const withCSS = require('@zeit/next-css');
module.exports = withCSS();
module.exports.publicRuntimeConfig = {
    api_url: process.env.API_URL
};
