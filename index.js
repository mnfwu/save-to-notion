#!/usr/bin/env node
const handleArgs = require("./lib/handleArgs");
const checkEnvVars = require("./lib/checkEnvVars");
const readAndCopy = require("./lib/readAndCopy");
const writeToNotion = require("./lib/writeToNotion");

const main = async () => {
  try {
    const isArgsReady = handleArgs();
    const isEnvReady = checkEnvVars();
    if (isEnvReady && isArgsReady) {
      const copiedLines = await readAndCopy();
      await writeToNotion(copiedLines);
    }
  } catch (err) {
    console.error(err);
  }
};

main();
