const GRAMMAR = {
    "name": [
        "<cool>",
        "<fanboy>",
        "<generic>",
        "<historical>"
    ],
    "cool": [
        "<cool-base>",
        "<cool-base> <number>"
    ],
    "cool-base": [
        "<cool-name> the <occupation>",
        "<honorific> <noun>",
        "<honorific> <occupation>",
        "<the> <cool-name>",
    ],
    "cool-name": [
        "<vowel-base><consonant-suffix>"
    ],
    "fanboy": [
        "<famous-atheist> <fan>",
        "<famous-atheist> <fan> <number>",
        "<famous-atheist>phile",
        "<famous-atheist>phile <number>",
        "<fan> of <famous-atheist>",
        "<fan> of <famous-atheist> <number>",
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
        "<historical-figure> the <occupation>"
    ],
    "famous-atheist": [
        "Dawkins",
        "Harris",
        "Hitchens",
        "Maher"
    ],
    "fan": [
        "Apostle",
        "Cult",
        "Fan",
        "Lover"
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
    "honorific": [
        "Doc",
        "Doctor",
        "Dr",
        "Mister",
        "Mr",
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
        "King",
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
        "69"
    ],
    "digit": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
};


module.exports = GRAMMAR;
