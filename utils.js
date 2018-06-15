const UUID = require('uuid-v4');
const chalk = require('chalk');
const generateCombination = require('gfycat-style-urls').generateCombination;
const terminalLink = require('terminal-link');


const log = (msg) => console.log(msg);
const TV_URL = `https://chromedevtools.github.io/timeline-viewer`;

exports.log = (msg) => log(chalk.blue(msg));
exports.logTip = (msg) => log(chalk.yellow(`Protip: \n ${msg}`));
exports.logError = (msg) => log(chalk.red(msg));
exports.logSuccess = (msg) => log(chalk.magenta(msg));
exports.funnyfyName = () => generateCombination(4, '_');
exports.generateUUID = () => UUID();
exports.getTVUrl = (tracePublicURL) => terminalLink('View uploaded trace in DevTools', `${TV_URL}?loadTimelineFromURL=${tracePublicURL}`);
