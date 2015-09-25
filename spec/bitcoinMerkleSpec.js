/**
 * Created by bjedrzejewski on 23/09/2015.
 */

var bitcoinHash = require('../bitcoin_lib/bitcoinHash.js');

describe("Test bitcoin merkle", function () {

    var test1 =  {input: '000000000000000005b9a1de171f9c71416514b00342d496dd60451da46e9e12'};
    var merkle = 'ffcee900cdd3757f1e29f7f0d6791ae95e9fa19c095d476ac6235b866aea7652';
    beforeEach(function (done) {
        bitcoinHash.merkleFunction(test1, done);

    });
    it("Tests specific merkle", function () {
        expect(test1.calcMerkle).toBe(merkle);
    });
});