var YSNG =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

	__webpack_require__(7);
	__webpack_require__(8);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Random = __webpack_require__(2);
	const GRAMMAR = __webpack_require__(6);
	const PROD_RE = new RegExp("<([^>]+)>", "g");
	const PROD_MODS_RE = new RegExp("^([#_]{1,2})(.*)");
	const LETTER_SUBSTS = {
	    "o": "0",
	    "e": "3",
	    "i": "1",
	    "a": "4",
	    "t": "7"
	}


	var rng = null;

	var hashName = function(name) {
	    var hash = 0;
	    if (name.length == 0)
	        return hash;
	    for (var idx = 0; idx < name.length; idx++) {
	        var char = name.charCodeAt(idx);
	        hash = ((hash << 5) - hash) + char;
	        hash &= hash;
	    }
	    return hash;
	}


	var randomChoice = function(choices) {
	    return choices[Math.floor(rng.uniform() * choices.length)];
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
	    if (rng.uniform() < prob) {
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


	var generateName = function(name) {
	    if (!name || name.trim() == "") {
	        if (rng === null) {
	            rng = new Random.MT();
	        }
	    } else {
	        rng = new Random.MT(hashName(name));
	    }
	    return generateFromGrammar(GRAMMAR, "name");
	}


	module.exports.generateName = generateName;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	function Random() {
	  this._normal = null
	}

	Random.prototype = {
	  
	  constructor: Random,
	  
	  get seed() {
	    return this._seed
	  },
	  
	  /**
	   * Sets the seed, resets the state
	   * @param  {Number} value
	   * @return {Number} value
	   */
	  set seed( value ) {
	    this.constructor.call( this, value )
	  },
	  
	  /**
	   * Get next random byte [0,255]
	   * @return {Number}
	   */
	  next: function() {
	    return 0 | ( this.uniform() * 255 )
	  },
	  
	  /**
	   * Same as #uniform(), just to be
	   * compatible with the Math.random() style API
	   * @return {Number}
	   */
	  random: function() {
	    return this.uniform()
	  },
	  
	  /**
	   * Get uniform random number between 0 and 1
	   * @return {Number}
	   */
	  uniform: function() {
	    return Math.random()
	  },
	  
	  /**
	   * Get normally distributed number,
	   * with a mean 0, variance 1
	   * @return {Number}
	   */
	  normal: function() {
	    
	    var x, y
	    
	    if( this._normal != null ) {
	      var num = this._normal
	      this._normal = null
	      return num
	    }
	    
	    x = this.uniform() || Math.pow( 2, -53 )
	    x = Math.sqrt( -2 * Math.log(x) )
	    y = 2 * Math.PI * this.uniform()
	    
	    this._normal = x * Math.sin( y )
	    return x * Math.cos( y )
	    
	  },
	  
	  /**
	   * Get random integer in range [min,max]
	   * @param  {Number} min
	   * @param  {Number} max
	   * @return {Number} 
	   */
	  range: function( min, max ) {
	    
	    if( min == null ) {
	      return this.uniform()
	    } else if( max == null ) {
	      max = min
	      min = 0
	    }
	    
	    return min + Math.floor( this.uniform() * ( max - min ))
	    
	  },
	  
	  /**
	   * Get exponentionally distributed
	   * number with lambda 1
	   * @return {Number}
	   */
	  exp: function() {
	    return -Math.log(
	      this.uniform() || Math.pow( 2, -53 )
	    )
	  },
	  
	  /**
	   * Get poisson distributed number,
	   * the mean defaulting to 1
	   * @param  {Number} mean
	   * @return {Number} 
	   */
	  poisson: function( mean ) {
	    
	    var L = Math.exp( -( mean || 1 ) )
	    var k = 0, p = 1
	    
	    while( p > L ) {
	      p = p * this.uniform()
	      k++
	    }
	    
	    return k - 1
	    
	  },
	  
	  /**
	   * Get gamma distributed number,
	   * using uniform, normal and exp
	   * with the Marsaglia-Tsang method
	   * @param  {Number} a gamma
	   * @return {Number} 
	   */
	  gamma: function( a ) {
	    
	    var d, c, x, u, v
	    
	    d = ( a < 1 ? 1 + a : a ) - 1/3
	    c = 1 / Math.sqrt( 9 * d )
	    
	    while( true ) {
	      while( true ) {
	        x = this.normal()
	        v = Math.pow( 1 + c * x, 3 )
	        if( v > 0 ) break
	      }
	      u = this.uniform()
	      if( u >= 1 - 0.331 * Math.pow( x, 4 ) ) {
	        if( Math.log(u) >= 0.5 * Math.pow( x, 2 ) + d * ( 1 - v + Math.log(v) ) ) {
	          break
	        }
	      }
	    }
	    
	    return a > 1 ? d * v :
	      d * v * Math.exp( this.exp() / -a )
	    
	  }
	  
	}

	if( true ) {
	  
	  module.exports = Random
	  
	  if( true ) {
	    Random.MT = __webpack_require__( 3 )
	    Random.PM = __webpack_require__( 4 )
	    Random.XOR = __webpack_require__( 5 )
	  }
	  
	}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	(function() {
	  
	  var Random
	  
	  if( true ) {
	    module.exports = MersenneTwister
	    if( true ) {
	      var Random = __webpack_require__( 2 )
	    }
	  } else {
	    Random = this.Random
	    Random.MT = MersenneTwister
	  }
	  
	  /**
	   * Mersenne Twister PRNG constructor
	   * @param {Number} seed
	   */
	  function MersenneTwister( seed ) {
	    
	    Random.call( this )
	    
	    this._index = 0
	    this._state = new Array( 624 )
	    this._state[0] = seed != null ?
	      seed : ( Math.random() * 0xFFFFFFFF ) | 0
	    this._seed = this._state[0]
	    
	    var i, MT = this._state
	    for( i = 1; i < 624; i++ ) {
	      MT[i] = MT[i-1] ^ ( MT[i-1] >>> 30 )
	      MT[i] = 0x6C078965 * MT[i] + i // 1812433253
	      MT[i] = MT[i] & ( ( MT[i] << 32 ) - 1 )
	    }
	    
	  }
	  
	  // Inherit from Random
	  var $ = MersenneTwister.prototype =
	    Object.create( Random.prototype )
	  
	  /**
	   * Prototype's constructor
	   * @type {Function}
	   */
	  $.constructor = MersenneTwister
	  
	  /**
	   * Generate an array of 624 untempered numbers
	   * @return {Undefined}
	   */
	  $._generateNumbers = function() {
	    var i, y, MT = this._state
	    for( i = 0; i < 624; i++ ) {
	      // Bit 31 (32nd bit) of MT[i]
	      y = ( MT[i] & 0x80000000 )
	      // Bits 0-30 (first 31 bits) of MT[...]
	      y = y + ( MT[(i+1) % 624] & 0x7FFFFFFF )
	      // The new randomness
	      MT[i] = MT[(i+397) % 624] ^ ( y >>> 1 )
	      // In case y is odd
	      if( ( y % 2 ) !== 0 ) {
	        MT[i] = MT[i] ^ 0x9908B0DF // 2567483615
	      }
	    }
	  }
	  
	  /**
	   * Extract a tempered pseudorandom number [0,1]
	   * based on the index-th value, calling
	   * #_generateNumbers() every 624 numbers
	   * @return {Number}
	   */
	  $.uniform = function() {
	    
	    if( this._index === 0 )
	      this._generateNumbers()
	    
	    var y = this._state[ this._index ]
	    
	    y = y ^ ( y >>> 11 )
	    y = y ^ (( y << 7 ) & 0x9D2C5680 ) // 2636928640
	    y = y ^ (( y << 15 ) & 0xEFC60000 ) // 4022730752
	    y = y ^ ( y >>> 18 )

	    this._index = ( this._index + 1 ) % 624
	    
	    return ( y >>> 0 ) * ( 1.0 / 4294967296.0 )
	    
	  }
	  
	})()

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	(function() {
	  
	  var Random
	  
	  if( true ) {
	    module.exports = ParkMiller
	    if( true ) {
	      var Random = __webpack_require__( 2 )
	    }
	  } else {
	    Random = this.Random
	    Random.PM = ParkMiller
	  }
	  
	  /**
	   * Park Miller (1988) "minimal standard" linear 
	   * congruential PRNG constructor
	   * @param {Number} seed
	   */
	  function ParkMiller( seed ) {
	    Random.call( this )
	    this._seed = seed != null ? seed : 1
	  }
	  
	  // Inherit from Random
	  var $ = ParkMiller.prototype =
	    Object.create( Random.prototype )
	  
	  /**
	   * Prototype's constructor
	   * @type {Function}
	   */
	  $.constructor = ParkMiller
	  
	  /**
	   * Get a random number in range [0,1]
	   * @return {Number}
	   */
	  $.uniform = function() {
	    
	    var hi = 16807 * ( this._seed >> 16 )
	    var lo = 16807 * ( this._seed & 0xFFFF ) +
	      ( ( hi & 0x7FFF ) << 16 ) + ( hi >> 15 )
	    
	    this._seed = ( lo > 0x7FFFFFFF ? lo - 0x7FFFFFFF : lo )
	    
	    return this._seed / 2147483647
	    
	  }
	  
	})()

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	(function() {
	  
	  var Random
	  
	  if( true ) {
	    module.exports = XOR
	    if( true ) {
	      var Random = __webpack_require__( 2 )
	    }
	  } else {
	    Random = this.Random
	    Random.XOR = XOR
	  }
	  
	  function XOR( x, y, z, w ) {
	    
	    Random.call( this )
	    
	    this.x = x != null ? x : this.x
	    this.y = y != null ? y : this.y
	    this.z = z != null ? z : this.z
	    this.w = w != null ? w : this.w
	    
	  }
	  
	  // Inherit from Random
	  var $ = XOR.prototype =
	    Object.create( Random.prototype )
	  
	  /**
	   * Prototype's constructor
	   * @type {Function}
	   */
	  $.constructor = XOR
	  
	  // Default seed parameters.
	  // Provide a period of length 2^128 - 1
	  $.x = 123456789
	  $.y = 362436069
	  $.z = 521288629
	  $.w = 88675123
	  
	  /**
	   * Get a random number in range [0,1]
	   * @return {Number}
	   */
	  $.uniform = function() {
	    
	    var t = this.x ^ ( this.x << 11 )
	    
	    this.x = this.y
	    this.y = this.z
	    this.z = this.w
	    
	    this.w = this.w ^ (this.w >> 19) ^ (t ^ (t >> 8))
	    
	    return this.w / 0x7FFFFFFF
	    
	  }
	  
	})()

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	const GRAMMAR = {
	    "name": [
	        "<silly>",
	        "#<fanboy>",
	        "<generic>",
	        "<historical>"
	    ],
	    "silly": [
	        "<silly-base>",
	        "<silly-base>™"
	    ],
	    "silly-base": [
	        "#<silly-name> the <occupation>",
	        "<silly-name> the <occupation> <number>",
	        "#<honorific> <noun>",
	        "#<honorific> <noun> <number>",
	        "#<honorific> <occupation>",
	        "#<honorific> <occupation> <number>",
	        "<the> <silly-name>",
	        "<the> <silly-name> <number>",
	        "#_<force-of-nature><body-part>",
	        "#_<article-of-clothing>0n<body-part>",
	        "<color> <bird> <speech-verb>"
	    ],
	    "silly-name": [
	        "#<vowel-base><consonant-suffix>"
	    ],
	    "fanboy": [
	        "<famous-atheist> <fan>",
	        "<famous-atheist> <fan> <number>",
	        "<famous-atheist>phile",
	        "<famous-atheist>phile <number>",
	        "<fan-of> of <famous-atheist>",
	        "<fan-of> of <famous-atheist> <number>",
	        "<the> Daily <famous-atheist>",
	        "Church of <famous-atheist>",
	        "On Knees for <famous-atheist>"
	    ],
	    "generic": [
	        "<the> <adjective-prefix> <occupation>",
	        "<the> <occupation> <occupation>",
	        "<the> <occupation> of <noun>"
	    ],
	    "historical": [
	        "<historical-figure> of <historical-place>",
	        "<historical-figure> the <adjective-suffix>",
	        "<historical-figure> the <occupation>",
	        "_<number><historical-people><number>"
	    ],
	    "famous-atheist": [
	        "Dawkins",
	        "Harris",
	        "Hitchens",
	        "Maher"
	    ],
	    "fan": [
	        "<fan-of>",
	        "Fan",
	        "Lover"
	    ],
	    "fan-of": [
	        "Apostle",
	        "Cult",
	        "Disciple"
	    ],
	    "historical-figure": [
	        "Aga",
	        "Agrippa",
	        "Alcmaeon",
	        "Anaximenes",
	        "Andronicus",
	        "Antiochus",
	        "Brutus",
	        "Dudu",
	        "Dumuzid",
	        "Euclid",
	        "Hammurabi",
	        "Heraclitus",
	        "Jesus",
	        "Melissus",
	        "Naram-Sin",
	        "Naram-Suen",
	        "Pelagius",
	        "Rimush",
	        "Samsu-iluna",
	        "Sargon",
	        "Shu-Suen",
	        "Theseus",
	        "Timon",
	        "Zeno"
	    ],
	    "historical-place": [
	        "Akkad",
	        "Akshak",
	        "Alexandria",
	        "Ascalon",
	        "Assyria",
	        "Asturias",
	        "Babylon",
	        "Byzantium",
	        "Croton",
	        "Elea",
	        "Ephesus",
	        "Eshunna",
	        "Kish",
	        "Miletus",
	        "Phlius",
	        "Rhodes",
	        "Samos",
	        "Thebes",
	        "Troy"
	    ],
	    "historical-people": [
	        "Aramean",
	        "Assyrian",
	        "Babylonian",
	        "Byzantine",
	        "Hittite",
	        "Phoenician",
	        "Roman"
	    ],
	    "honorific": [
	        "Doc",
	        "Doctor",
	        "Dr",
	        "King",
	        "Master",
	        "Mister",
	        "Mr",
	        "Pope",
	        "Prof",
	        "Professor"
	    ],
	    "adjective": [  // Honorifics that can come as suffixes or prefixes
	        "Amazing",
	        "Ancient",
	        "Angry",
	        "Awesome",
	        "Elder",
	        "Godless",
	        "Great",
	        "Hairy",
	        "Harmful",
	        "Horny",
	        "Infinite",
	        "Invincible",
	        "Logical",
	        "Magical",
	        "Powerful",
	        "Rational",
	        "Reasonable",
	        "Talented"
	    ],
	    "prefix-only-adjective": [
	        "<armored>",
	        "Cynical",
	        "Doubting",
	        "Fighting",
	        "Freethinking",
	        "Garbage",
	        "Iron",
	        "Reasoning",
	        "Thinking"
	    ],
	    "adjective-prefix": [
	        "<adjective>",
	        "<prefix-only-adjective>"
	    ],
	    "adjective-suffix": [
	        "<adjective>"
	    ],
	    "noun": [
	        "<consonant-base>ism",
	        "Apostasy",
	        "Atheism",
	        "Cynicism",
	        "Doubt",
	        "Freethought",
	        "Logic",
	        "Opinions",
	        "Reason",
	        "Science"
	    ],
	    "occupation": [
	        "<consonant-base><vowel-suffix>",
	        "<skeptic>",
	        "Atheist",
	        "Conqueror",
	        "Cynic",
	        "Freethinker",
	        "Heretic",
	        "Logician",
	        "Magician",
	        "Philosopher",
	        "Scientist",
	        "Shepherd",
	        "Thinker"
	    ],
	    "consonant-base": [
	        "<skeptic>",
	        "Apostic",
	        "Cynic",
	        "Heretic",
	        "Logic",
	        "Rational",
	        "Reason",
	        "Satiric",
	    ],
	    "vowel-suffix": [
	        "ian",
	        "ist"
	    ],
	    "vowel-base": [
	        "Cyni",
	        "Hereti",
	        "Logi",
	        "Reasoni",
	        "Satiri",
	        "Scepti",
	        "Skepti"
	    ],
	    "consonant-suffix": [
	        "cked",
	        "cian",
	        "con",
	        "nator",
	        "thulu",
	        "tician"
	    ],
	    "force-of-nature": [
	        "Lava",
	        "Lightning",
	        "Magma",
	        "Thunder",
	        "Tornado",
	        "Volcano"
	    ],
	    "body-part": [
	        "Arm",
	        "Face",
	        "Finger",
	        "Foot",
	        "Hand",
	        "Head",
	        "Leg",
	        "Toe"
	    ],
	    "article-of-clothing": [
	        "Hat",
	        "Pants",
	        "Shirt",
	        "Shoe"
	    ],
	    "color": ["Black", "Blue", "Grey", "Orange", "Red", "White"],
	    "bird": [
	        "Crow",
	        "Dove",
	        "Eagle",
	        "Hawk",
	        "Parrot",
	        "Pigeon",
	        "Raven",
	        "Sparrow"
	    ],
	    "speech-verb": [
	        "Expounds",
	        "Gossips",
	        "Harangues",
	        "Orates",
	        "Pontificates",
	        "Rambles",
	        "Rants",
	        "Sermonizes",
	        "Speaks"
	    ],
	    "armored": [  // Alternate spellings
	        "Armored",
	        "Armoured"
	    ],
	    "skeptic": [  // Just variations on the spellings of "skeptic"
	        "Skeptic",
	        "Sceptic",
	        "Skeptik"  // Silly but fun
	    ],
	    "the": [  // Random coin flip for "the"
	        "",
	        "The"
	    ],
	    "number": [
	        "<digit>",
	        "<digit><number>",
	        "<special-number>"
	    ],
	    "special-number": [
	        "007",
	        "42",
	        "666",
	        "69",
	        "88"
	    ],
	    "digit": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
	};


	module.exports = GRAMMAR;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./background.jpg": 9,
		"./style.css": 10
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 8;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/background.jpg";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/style.css";

/***/ })
/******/ ]);