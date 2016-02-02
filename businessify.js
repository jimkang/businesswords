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
  'Zero-Sum'
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
  'of Opportunity',
  'Unbundling',
  'Equity'
];

var prefixSuffixPairs = [
  ['The', 'Space']
];

var alternateDecoratorTable = probable.createRangeTable([
  [[0, 4], (base) => probable.pickFromArray(alternatePrefixes) + ' ' + base],
  [[5, 8], (base) => base + ' ' + probable.pickFromArray(suffixes)],
  [
    [9, 9],
    (base) => {
      var pair = probable.pickFromArray(prefixSuffixPairs);
      return pair[0] + ' ' + base + ' ' + pair[1];
    }
  ]
]);

function businessify(base, done) {
  var word;

  if (probable.roll(5) === 0) {
    word = alternateDecoratorTable.roll()(base);
  }
  else {
    word = 'Business ' + base;
  }

  callNextTick(done, null, toTitleCase(word));
}

module.exports = businessify;
