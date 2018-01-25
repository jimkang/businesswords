var callNextTick = require('call-next-tick');
var probable = require('probable');
var toTitleCase = require('titlecase');
var canonicalizer = require('canonicalizer');

var alternatePrefixes = [
  'Cross-functional',
  'Contractionary',
  'Big Data',
  'Cloud',
  'Seamless',
  'Turnkey',
  'Win-Win',
  'Game Changer',
  'Rock Star',
  'Ninja',
  'Out-of-the-Box',
  'Futureproof',
  'Facetime',
  'Low-hanging fruit',
  'Pivot',
  'Digital',
  'Social',
  'Zero-Sum',
  'Opportunity',
  'Smidgeo'
];

var suffixes = [
  'Guru',
  'Cloud',
  'Bandwidth',
  'Paradigm',
  'Game Changer',
  'Monetization',
  'Content',
  'Deliverable',
  'Value-Add',
  'Enablement',
  'Long Tail',
  'Double Down',
  'Swim Lane',
  'Intelligence',
  'Agreeance',
  'Opportunity',
  'Unbundling',
  'Equity',
  'Operationalization'
];

var prefixSuffixPairs = [['The', 'Space']];

var smidgeoReadyStartLetters = ['c', 'h', 'k', 'm', 'p', 'w', 'y'];

var alternateDecoratorTable = probable.createRangeTable([
  [
    [0, 4],
    function prefix(base) {
      return probable.pickFromArray(alternatePrefixes) + ' ' + base;
    }
  ],
  [[5, 8], suffix],
  [
    [9, 9],
    function bookend(base) {
      var pair = probable.pickFromArray(prefixSuffixPairs);
      return pair[0] + ' ' + base + ' ' + pair[1];
    }
  ],
  [
    [10, 10],
    function prefixAndSuffix(base) {
      return (
        probable.pickFromArray(alternatePrefixes) +
        ' ' +
        base +
        ' ' +
        probable.pickFromArray(suffixes)
      );
    }
  ]
]);

function suffix(base) {
  return base + ' ' + probable.pickFromArray(suffixes);
}

function businessify(theBase, done) {
  var base = canonicalizer.getSingularAndPluralForms(theBase)[0];
  var word;

  if (
    smidgeoReadyStartLetters.indexOf(base.charAt(0).toLowerCase()) !== -1 &&
    probable.roll(2) === 0
  ) {
    word = smidgify(base);
  } else if (probable.roll(4) === 0) {
    word = alternateDecoratorTable.roll()(base);
  } else {
    word = 'Business ' + base;
  }

  callNextTick(done, null, toTitleCase(word));
}

function smidgify(base) {
  var word = 'Smidgeo S' + base.toLowerCase();
  if (probable.roll(3) === 0) {
    word = suffix(word);
  }
  return word;
}

module.exports = businessify;
