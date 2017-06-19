const GRAMMAR = require("./grammar");
const PROD_RE = new RegExp("<([^>]+)>", "g");


var randomChoice = function(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}


var _generateFromGrammarInternal = function(grammar, symbol, usedLiterals) {
    var productions = grammar[symbol];

    if (Array.isArray(productions)) {
        var prod = randomChoice(productions);
        if (typeof(grammar[prod]) === "undefined") {
            // That is, if it's a literal and not a production rule don't reuse
            // it; don't allow an infinite loop though if no alternatives can
            // be found
            var count = 1;
            while (usedLiterals.has(prod) && count < prod.length) {
                prod = randomChoice(productions);
                count++;
            }
            usedLiterals.add(prod);
        }
    } else {
        var prod = productions;
    }

    return prod.replace(PROD_RE, function(m, symbol) {
        return _generateFromGrammarInternal(grammar, symbol,
                                            usedLiterals).trim();
    });
}


var generateFromGrammar = function(grammar, symbol) {
    return _generateFromGrammarInternal(grammar, symbol, new Set());
}


var generateName = function() {
    return generateFromGrammar(GRAMMAR, "name");
}


module.exports.generateName = generateName;
