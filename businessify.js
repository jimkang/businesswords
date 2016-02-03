var callNextTick = require('call-next-tick');
var probable = require('probable');
var toTitleCase = require('titlecase');

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
  'Opportunity'
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

var prefixSuffixPairs = [
  ['The', 'Space']
];

var alternateDecoratorTable = probable.createRangeTable([
  [[0, 4], function prefix(base) {
    return probable.pickFromArray(alternatePrefixes) + ' ' + base;
  }],
  [[5, 8], function suffix(base) {
    return base + ' ' + probable.pickFromArray(suffixes);
  }],
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
      return probable.pickFromArray(alternatePrefixes) + ' ' + base
        + ' ' + probable.pickFromArray(suffixes);
    }
  ]
]);

function businessify(base, done) {
  var word;

  if (probable.roll(4) === 0) {
    word = alternateDecoratorTable.roll()(base);
  }
  else {
    word = 'Business ' + base;
  }

  callNextTick(done, null, toTitleCase(word));
}

module.exports = businessify;
