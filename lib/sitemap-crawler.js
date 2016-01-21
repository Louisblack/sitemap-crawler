'use strict';
const requester = require('./requester'),
    async = require('async');

function crawlSitemap(url) {
    return requester.request(url)
    .then(determineCrawler)
    .then(performCrawl);
}

function crawlUrl(url) {
    return new Promise((resolve, reject) => {
        requester.getResponseStatus(url).then(res => {
            resolve({
                url: url,
                statusCode: res.statusCode
            });
        });
    });
}

function determineCrawler(sitemap) {
    let crawler,
        urls;

    if (sitemap.urlset) {
        crawler = crawlUrl;
        urls = sitemap.urlset.url;
    }
    else {
        crawler = crawlSitemap;
        urls = sitemap.sitemapindex.sitemap;
    }
    return urls.map(url => {
        return crawler(url.loc[0]);
    });
};

function performCrawl(crawlers) {
    return new Promise((resolve, reject) => {
        Promise.all(crawlers).then((results) => {
            results.forEach(result => {
                if (result.statusCode == '404') {
                    console.log(result);
                }
            });
            resolve(results);
        })
    });
};

exports.crawl = crawlSitemap;
