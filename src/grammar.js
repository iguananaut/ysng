const GRAMMAR = {
    "name": [
        "<silly>",
        "<silly>™",
        "#<fanboy>",
        "<generic>",
        "<historical>"
    ],
    "silly": [
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
