const path = require('path');

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;

// Dev server host and port
const SERVER_HOST = 'localhost';
const SERVER_PORT = 9000;

// Whether to enable bundle package analysis
const shouldOpenAnalyzer = false;
const ANALYZER_HOST = 'localhost';
const ANALYZER_PORT = '8888';

// Resource size limit
const imageInlineSizeLimit = 4 * 1024;

module.exports = {
  PROJECT_PATH, // 表示项目的跟目录
  PROJECT_NAME, // 表示项目名称
  SERVER_HOST,
  SERVER_PORT,
  shouldOpenAnalyzer,
  ANALYZER_HOST,
  ANALYZER_PORT,
  imageInlineSizeLimit,
};
