/**
 * Created by bjedrzejewski on 23/09/2015.
 */

var bitcoinJSON = require('../bitcoin_lib/bitcoinJSON.js');

describe("Test JSON retrieval", function () {

    var test1= {};
    test1.coinId= '00000000000000001e8d6829a8a21adc5d38d0a473b144b6765798e61f98bd1d';

    beforeEach(function (done) {
        // Make an async call, passing the special done callback
        bitcoinJSON(test1).then(done);
    });

    it("Tests some bitcoin id retrieval", function () {
        var jsontext = '{"hash":"00000000000000001e8d6829a8a21adc5d38d0a473b144b6765798e61f98bd1d","confirmations":250203,"size":1496,"height":125552,"version":1,"merkleroot":"2b12fcf1b09288fcaff797d71e950e71ae42b91e8bdb2304758dfcffc2b620e3","tx":["51d37bdd871c9e1f4d5541be67a6ab625e32028744d7d4609d0c37747b40cd2d","60c25dda8d41f8d3d7d5c6249e2ea1b05a25bf7ae2ad6d904b512b31f997e1a1","01f314cdd8566d3e5dbdd97de2d9fbfbfd6873e916a00d48758282cbb81a45b9","b519286a1040da6ad83c783eb2872659eaf57b1bec088e614776ffe7dc8f6d01"],"time":1305998791,"nonce":2504433986,"bits":"1a44b9f2","difficulty":244112.48777434,"chainwork":"0000000000000000000000000000000000000000000000006aa84fd45b2350c9","previousblockhash":"00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81","nextblockhash":"0000000000001c0533ea776756cb6fdedbd952d3ab8bc71de3cd3f8a44cbaf85","reward":50,"isMainChain":true}';
        var testJson = JSON.parse(jsontext);
        expect(test1.json.merkleroot).toBe(testJson.merkleroot);
    });
});