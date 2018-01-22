'use strict';

const fs = require('fs');
const path = require('path');

const RAW_DIR = __dirname + '/raw-data';
const FINAL_DIR = __dirname + '/translations';

const collectJSON = (dirName) => {
  return (collection, fileName) => {
    let json = require(path.resolve(RAW_DIR, dirName, fileName));
    Object.keys(json).forEach(addToCollection(collection, json));
    return collection;
  };
};

const addToCollection = (collection, json) => {
  return (key) => {
    collection[key] = json[key];
  };
};

const aggregateDir = (dirName) => {
  dirName = dirName || 'en';
  let files = fs.readdirSync(path.resolve(RAW_DIR, dirName));
  let collectedJSON = files.reduce(collectJSON(dirName), {});
  fs.writeFileSync(
    path.resolve(FINAL_DIR, `${dirName}.json`),
    JSON.stringify(collectedJSON, null, 2)
  );
};

const aggregateAll = () => {
  fs.readdirSync(RAW_DIR).forEach((dirName) => {
    aggregateDir(dirName);
  });
};

aggregateAll();
