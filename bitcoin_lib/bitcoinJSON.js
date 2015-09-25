/**
 * Created by bjedrzejewski on 23/09/2015.
 */

var https = require('https');
var q = require('q');



var bitcoinJSON = function (p) {
    var deferred = q.defer();
    var options = {
        host: 'blockexplorer.com',
        port: 443,
        path: '/api/block/' + p.coinId,
        method: 'GET'
    };
    var body;
    var req = https.get(options, function (res) {
        body = '';
        res.on('data', function (d) {
            body += d;
        });
        res.on('end', function(){
            p.json = JSON.parse(body);
            deferred.resolve();
        });
    });
    req.end();
    req.on('error', function (e) {
        console.log("Got an error: ", e);
    });
    return deferred.promise;
};


module.exports = bitcoinJSON;