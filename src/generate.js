const GRAMMAR = require("./grammar");
const PROD_RE = new RegExp("<([^>]+)>", "g");
const PROD_MODS_RE = new RegExp("^([#_]{1,2})(.*)");
const LETTER_SUBSTS = {
    "o": "0",
    "e": "3",
    "i": "1",
    "a": "4",
    "t": "7"
}


var randomChoice = function(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}


/* This would be easier with modern ES2016 but I'll set that up later;
 * this will work on most modern browsers */
var substituteLetters = function(name, prob) {
    var letters = [];
    var nameLower = name.toLowerCase();
    Object.keys(LETTER_SUBSTS).forEach(function(letter) {
        var idx = nameLower.indexOf(letter);
        if (idx > 0 && idx < (nameLower.length - 1)) {
            letters.push(letter);
        }
    });

    if (letters.length == 0) {
        return name;
    }

    /* If there are any replaceable letters, replace them with, say, 20%
     * chance */
    if (Math.random() < prob) {
        /* Choose a random letter of the ones we can replace */
        var letter = randomChoice(letters);
        var indices = [], idx = 0;
        while ((idx = nameLower.indexOf(letter, idx + 1)) > 0 &&
                idx < nameLower.length - 1) {
            indices.push(idx);
        }

        /* Now choose a random index at which to replace the chosen letter */
        idx = randomChoice(indices);
        /* Call substituteLetters recursively for a chance to replace more
         * letters*/
        return substituteLetters(name.substr(0, idx) + LETTER_SUBSTS[letter] +
                                 name.substr(idx + 1));
    }

    return name;
}


var _generateFromGrammarInternal = function(grammar, symbol, usedLiterals, mods) {
    var productions = grammar[symbol];

    if (Array.isArray(productions)) {
        var prod = randomChoice(productions);
        if (grammar[prod] === undefined && prod.match(PROD_RE) === null) {
            // That is, if it's a literal and not a production rule don't reuse
            // it; don't allow an infinite loop though if no alternatives can
            // be found
            var count = 1;
            while (usedLiterals.has(prod) && count < prod.length) {
                prod = randomChoice(productions);
                count++;
            }
            usedLiterals.add(prod);

            /* Replace letters with numbers with low chance unless the # */
            /* mod is active */
            var prob = ((mods.indexOf("#") < 0) ? 0.0 : 0.5);
            prod = substituteLetters(prod, prob);
            if (mods.indexOf("_") >= 0) {
                /* This mod means make the name all lowercase */
                prod = prod.toLowerCase();
            }
        }
    } else {
        var prod = productions;
    }

    var m = null;
    if ((m = prod.match(PROD_MODS_RE)) !== null) {
        prod = m[2];
        mods += m[1];
    }

    return prod.replace(PROD_RE, function(m, symbol) {
        return _generateFromGrammarInternal(grammar, symbol,
                                            usedLiterals, mods).trim();
    });
}


var generateFromGrammar = function(grammar, symbol) {
    return _generateFromGrammarInternal(grammar, symbol, new Set(), "");
}


var generateName = function() {
    return generateFromGrammar(GRAMMAR, "name");
}


module.exports.generateName = generateName;
