#!/usr/bin/env node

// TODO add optional arg for comment (lookup how to process args and setup help)
// TODO add interface for changing pageId and setting env variables (integration token)
// - - probably need to create/write a .env file for this?
// TODO add support for languages besides js
const readAndCopy = require("./readAndCopy");
const writeToNotion = require("./writeToNotion");
const checkEnvVars = require("./checkEnvVars");

const main = async () => {
  try {
    const isEnvReady = checkEnvVars();
    if (isEnvReady) {
      const copiedLines = await readAndCopy();
      await writeToNotion(copiedLines);
    }
  } catch (err) {
    console.error(err);
  }
};

main();

// test code
// stn
const test = "code";
const testFn = () => {
  return "code" + " is cool";
};
// stnend
