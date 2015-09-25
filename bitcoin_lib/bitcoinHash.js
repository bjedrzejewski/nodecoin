/**
 * Created by bjedrzejewski on 22/09/2015.
 */


var reverseAndFlip = require('./reverseAndFlip.js');
var bitcoinJSON = require('../bitcoin_lib/bitcoinJSON.js');
var crypto = require('crypto');
var rp = require('request-promise');
var q = require('q');

function hashTwice(headerHex) {
    var pass1 = crypto.createHash('sha256').update(new Buffer(headerHex, 'hex')).digest('hex');
    //Hash it for the seconded time
    var pass2 = crypto.createHash('sha256').update(new Buffer(pass1, 'hex')).digest('hex')
    return pass2;
}

function getBitcoinJson(bitcoinId) {
    return rp('https://blockexplorer.com/api/block/' + bitcoinId).then(JSON.parse);
}


function flipArray(arr) {
    var v = 0;
    for (v = 0; v < arr.length; ++v) {
        arr[v] = reverseAndFlip(arr[v]);
    }
}

var hashFunction = function (data, fnc) {

    var retrievalData = {};
    retrievalData.coinId = data.input;


    var hashFromJson = function (json) {
        console.log('This is json recieved: ' + JSON.stringify(json));

        //data from json
        var version = json.version;
        var previousblockhash = json.previousblockhash;
        var merkleroot = json.merkleroot;
        var time = json.time;
        var bits = json.bits;
        var nonce = json.nonce;

        //prepare bits
        var eVersion = littleEndian(version);
        var revPreviousBlockHash = reverseAndFlip(previousblockhash);
        var revMerkleroot = reverseAndFlip(merkleroot);
        var eTime = littleEndian(time);
        var eBits = littleEndian(bits);
        var eNonce = littleEndian(nonce);

        //concat all
        var headerHex = eVersion + revPreviousBlockHash + revMerkleroot + eTime + eBits + eNonce;

        //hash it
        var pass2 = hashTwice(headerHex);
        //fix the order
        var finalHash = reverseAndFlip(pass2);
        //return final hash as callback
        console.log('calculated hash: ' + finalHash);
        data.finalHash = finalHash;
        if (fnc)
            fnc();
    };

    getBitcoinJson(retrievalData.coinId).then(function (json) {
        hashFromJson(json);

    });

    /*bitcoinJSON(retrievalData).then(
     function () {
     hashFromJson(retrievalData.json);
     }
     );*/

};

var merkleFunction = function (data, fnc) {

    var retrievalData = {};
    retrievalData.coinId = data.input;


    var merkleFromJson = function (json) {
        console.log('This is json recieved: ' + JSON.stringify(json));

        //data from json
        var merkleroot = json.merkleroot;
        var tx = json.tx;
        var calcMerkle = 'this is a test';
        var len = tx.length;
        var i = 0;
        //Iterate until merkle is calculated
        while (true) {
            if (len === 1) {
                calcMerkle = (tx[0]);
                break;
            }
            var newHash;
            //If odd number, extend the array
            if (i + 1 === len) {
                tx[i + 1] = tx[i];
                len++;
            }
            //Calculate new hash value
            newHash = reverseAndFlip(hashTwice(reverseAndFlip(tx[i]) + reverseAndFlip(tx[i + 1])));
            tx[i / 2] = newHash;
            //If this is the end of the 'level' then prepare the array for the next pass
            if (i + 2 === len) {
                len = len / 2;
                i = -2;
                tx = tx.slice(0, len);
            }
            //move the pointer
            i = i + 2;
        }

        console.log('Org merkle: ' + merkleroot);
        console.log('Calculated merkle: ' + calcMerkle);
        data.calcMerkle = calcMerkle;
        if (fnc)
            fnc();
    };

    getBitcoinJson(retrievalData.coinId).then(function (json) {
        merkleFromJson(json);

    });


    /*bitcoinJSON(retrievalData).then(
     function () {
     merkleFromJson(retrievalData.json);
     }
     );*/

};

function littleEndian(value) {
    //base 10 to base 16
    var hexString = value.toString(16);
    //make the length 8
    while (hexString.length < 8) {
        hexString = '0' + hexString;
    }
    //reverse and swap
    var result = reverseAndFlip(hexString);
    return result;
}


function hex2Bin(n) {
    var bin = parseInt(n, 16).toString(2);
    while (bin.length < 32) {
        bin = '0' + bin;
    }
    return bin;
}

module.exports = hashFunction;
module.exports.merkleFunction = merkleFunction;