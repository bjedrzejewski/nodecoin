/**
 * Created by bjedrzejewski on 23/09/2015.
 */

var bitcoinHash = require('../bitcoin_lib/bitcoinHash.js');

describe("Test bitcoin hash", function () {

    var test1 =  {input: '00000000000000001e8d6829a8a21adc5d38d0a473b144b6765798e61f98bd1d'};
    var result = ''
    beforeEach(function (done) {
        // Make an async call, passing the special done callback
        bitcoinHash(test1, done);

    });
    result = test1.finalHash;
    it("Tests some bitcoin hashing ids", function () {
        expect(test1.coinId).toBe(result);
    });
});