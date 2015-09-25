/**
 * Created by bjedrzejewski on 23/09/2015.
 */

/**
 * This reverses the string and then flips every other character.
 * This assumes even number of characters in the string.
 * @param s
 */
var reverseAndFlip = function(s){
    var i = 0;
    var newS = '';
    while(i < s.length-1){
        newS =  s[i] + s[i+1] + newS;
        i += 2;
    }
    return newS;
};

module.exports = reverseAndFlip;