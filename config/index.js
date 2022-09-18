const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname + '/../.env'),
});
const SMTP_AUTH_USER = process.env.SMTP_AUTH_USER;
const SMPT_AUTH_PASS = process.env.SMPT_AUTH_PASS;
const SMPT_AUTH_HOST = process.env.SMPT_AUTH_HOST;
const SMPT_AUTH_PORT = process.env.SMPT_AUTH_PORT;
const PORT = process.env.PORT || 4000;

module.exports = Object.freeze({
  PORT,
  SMTP_AUTH_USER,
  SMPT_AUTH_PASS,
  SMPT_AUTH_HOST,
  SMPT_AUTH_PORT,
});
