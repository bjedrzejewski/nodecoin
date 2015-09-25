/**
 * Created by bjedrzejewski on 23/09/2015.
 */

var reverseAndFlip = require('../bitcoin_lib/reverseAndFlip.js');

describe("ReverseAndFlip tests", function() {
    it("Tests reverseAndFlip examples", function() {
        var s1 = '123456';
        var revS1 = reverseAndFlip(s1);
        expect(revS1).toBe('563412');

        var s2 = 'abcdefghij';
        var revS2 = reverseAndFlip(s2);
        expect(revS2).toBe('ijghefcdab');

        var s3 = '1234abcd';
        var revS3 = reverseAndFlip(s3);
        expect(revS3).toBe('cdab3412');

        var s4 = '00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81';
        var revS4 = reverseAndFlip(s4);
        expect(revS4).toBe('81cd02ab7e569e8bcd9317e2fe99f2de44d49ab2b8851ba4a308000000000000');
    });
});