const readlineSync = require("readline-sync");
const setEnvValue = require("./setEnvVars");
const langs = require("./langs");

const handleArgs = () => {
  let args = process.argv;
  switch (args[2]) {
    // help log
    case "-h":
      console.log(
        "save-to-notion is a CLI for saving code snippets to a Notion page\nFind the readme at https://github.com/mnfwu/save-to-notion\n\nOptions:\n    -h : Help\n    -l : Set programming language"
      );
      return false;

    // change language option
    case "-l":
      const langIndex = readlineSync.keyInSelect(
        langs,
        "Choose a supported langauge from the list:"
      );
      if (langs[langIndex] === undefined) {
        return;
      } else {
        setEnvValue("CODE_LANG", langs[langIndex].toLowerCase());
        console.log(
          `${langs[langIndex]} was selected. Please run the program once more.`
        );
        return false;
      }

    default:
      return true;
  }
};

module.exports = handleArgs;
