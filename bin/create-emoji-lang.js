'use strict';

const fs = require('fs');

const EN     = require('../translations/en.json');
const EMOJIS = require('./emojis.json');
const emojiLength = EMOJIS.length;

const randEmoji = () => {
  let index = Math.floor(Math.random() * Math.floor(emojiLength));
  return EMOJIS[index];
};

const convertObject = (object) => {
  return Object.keys(object).reduce((translated, key) => {
    if (typeof object[key] === 'string') {
      translated[key] = emojiTranslate(object[key]);
    } else if (Array.isArray(object[key])) {
      translated[key] = convertArray(object[key]);
    } else {
      translated[key] = convertObject(object[key]);
    }
    return translated;
  }, {})
};

const convertArray = (array) => {
  return array.map((value) => {
    if (typeof value === 'string') {
      return emojiTranslate(value);
    } else {
      return convertObject(value);
    }
  });
};

const emojiTranslate = (string) => {
  let translation = string;
  try {
    translation = string.replace(/[a-z0-9]/gi, randEmoji);
  } catch(e) { console.log('not a string', string); }
  return translation;
};

const writeTranslation = () => {
  const emojiJSON = convertObject(EN);
  fs.writeFileSync(
    __dirname + '/../translations/emoji.json',
    JSON.stringify(emojiJSON, null, 2)
  );
};

writeTranslation();

