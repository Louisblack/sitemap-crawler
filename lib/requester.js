'use strict';
const parseString = require('xml2js').parseString,
    request = require('request');

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}

function parseXml(xml) {
    return new Promise((resolve, reject) => {
        parseString(xml, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

exports.request = function(url) {
    return makeRequest(url).then(parseXml);
};

exports.getResponseStatus = function(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};
