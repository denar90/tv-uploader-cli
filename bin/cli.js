#!/usr/bin/env node

const path = require('path');
const utils = require('../utils');
const FirebaseStorage = require('../storage');

const argv = process.argv.slice(2);
const pathToTrace = argv[0];
const flags = {};

argv
  .filter(f => f.startsWith('-'))
  .forEach(f => {
    const keyValue = f.split('=');
    const flagKey = keyValue[0].replace(/-*/, '');
    flags[flagKey] = keyValue[1] || true;
  });

if (!pathToTrace || flags.help) {
  console.error('Usage:');
  console.error('    tv-uploader ./timeline-trace.json --storageBucket=my-awesome-firebase-project.appspot.com');
  return;
}

const resolvedPath = path.resolve(pathToTrace);

(async () => {
  try {
    const storage = new FirebaseStorage({...flags});
    await storage.initStoreage();
    await storage.uploadData(resolvedPath);
  } catch (e) {
    utils.logError('ERROR:', e);
  }
})();


