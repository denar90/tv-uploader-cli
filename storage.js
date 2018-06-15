const admin = require('firebase-admin');
const exec = require('await-exec');
const utils = require('./utils');

class FirebaseStorage {
  /**
   * @param {Object} options
   * @param {String} options.storageBucket
   */
  constructor(options) {
    Object.assign(this, { ...options });
    if (!this.storageBucket) {
      throw new Error('Please specify "storageBucket", maybe you have to create firebase project - https://console.firebase.google.com/');
    }
  }

  async initStoreage() {
    if (!admin.credential.applicationDefault().credential_.refreshToken_) {
      utils.log('Getting access for Google Auth Library...');
      await exec('gcloud auth application-default login');
    }
    const config = {
      credential: admin.credential.applicationDefault(),
      storageBucket: this.storageBucket
    };
    admin.initializeApp(config);
  }

  async uploadData(path) {
    try {
      const bucket = admin.app().storage().bucket();
      const fileName = utils.funnyfyName(4, '_');
      const uuid = utils.generateUUID();

      utils.log(`Uploading ${path} to ${this.storageBucket}`);

      const data = await bucket.upload(path, {
        destination: fileName,
        metadata: {
          metadata: {
            firebaseStorageDownloadTokens: uuid
          }
        }
      });

      utils.logSuccess(`Done: ${fileName} uploaded to bucket.`);
      utils.logTip(utils.getTVUrl(this.getPublicUrl(bucket.name, data[0].name, uuid)));
    } catch (e) {
      throw e;
    }
  }

  getPublicUrl(bucketName, fileName, uuid) {
   return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(fileName)}?alt=media&token=${uuid}`;
  }
};

module.exports = FirebaseStorage;
