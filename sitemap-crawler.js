var xml = require('xml2js'),
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
};
