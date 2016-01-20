var request = require('./requester').request;

function extractUrls(sitemap) {
    return sitemap.sitemapindex.sitemap;
};



exports.crawl = function(url) {
    request(url)
    .then(extractUrls)
    .then()
};
