#!/usr/bin/env node

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
