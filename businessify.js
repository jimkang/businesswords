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
  'At the end of the day:',
  'Game Changer',
  'Rock Star',
  'Ninja',
  '30,000 ft. level',
  'Out-of-the-Box',
  'Futureproof',
  'Facetime',
  'Low-hanging fruit',
  'Pivot',
  'Digital',
  'Social'
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
  'Double Down'
];

function businessify(base, done) {
  var word;

  if (probable.roll(3) === 0) {
    word = base + ' ' + probable.pickFromArray(suffixes);
  }
  else if (probable.roll(2) === 0) {
    word = probable.pickFromArray(alternatePrefixes) + ' ' + base;
  }
  else {
    word = 'Business ' + base;
  }

  callNextTick(done, null, toTitleCase(word));
}

module.exports = businessify;
