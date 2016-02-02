var config = require('./config');
var callNextTick = require('call-next-tick');
var Twit = require('twit');
var async = require('async');
var createWordnok = require('wordnok').createWordnok;
var businessify = require('./businessify');

var dryRun = false;
if (process.argv.length > 2) {
  dryRun = (process.argv[2].toLowerCase() == '--dry');
}

var wordnok = createWordnok({
  apiKey: config.wordnikAPIKey
});

var twit = new Twit(config.twitter);

async.waterfall(
  [
    getTopics,
    pickFirst,
    businessify,
    postTweet
  ],
  wrapUp
);

function getTopics(done) {
  var opts = {
    customParams: {
      minCorpusCount: 1000,
      limit: 1
    }
  };
  wordnok.getRandomWords(opts, done);  
}

function pickFirst(words, done) {
  if (words.length < 1) {
    callNextTick(done, new Error('No topics found.'));
  }
  else {
    callNextTick(done, null, words[0]);
  }
}

function postTweet(text, done) {
  if (dryRun) {
    console.log('Would have tweeted:', text);
    callNextTick(done);
  }
  else {
    var body = {
      status: text,
    };
    twit.post('statuses/update', body, done);
  }
}

function wrapUp(error) {
  if (error) {
    console.log(error, error.stack);
  }
}
