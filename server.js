/**
 * Created by bjedrzejewski on 22/09/2015.
 */
var http = require('http');
var dns = require('dns');
var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var bitcoinHash = require('./bitcoin_lib/bitcoinHash.js');

//print the arguments
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

//bitcoinHash.merkleFunction('00000000000000000b9f55f5d0857f5655698e15996deb29bf56548268d45550', console.log);
var data = {input: '000000000000000005b9a1de171f9c71416514b00342d496dd60451da46e9e12'};
bitcoinHash.merkleFunction(data, console.log);


/*
var password = new Buffer(process.env.PASS || 'password');
var encryptStream = crypto.createCipher('aes-256-cbc', password);
*/

/*
var gzip = zlib.createGzip();
var readStream = fs.createReadStream('test.txt'); // current file
var writeStream = fs.createWriteStream('testOutput' + '/out.gz');

readStream   // reads current file
    .pipe(encryptStream) // encrypts
    .pipe(gzip)  // compresses
    .pipe(writeStream)  // writes to out file
    .on('finish', function () {  // all done
        console.log('done');
    });
*/







var server = http.createServer(function onRequest(request, response) {
    dns.resolve4('www.google.com', function (err, addresses) {
        if (err) throw err;

        console.log('addresses: ' + JSON.stringify(addresses));
    });

    response.writeHead(200, {'Content-Type': 'text/ plain'});
    response.write('Welcome to a simple HTTP Server');
    response.end();
}).listen(3000);