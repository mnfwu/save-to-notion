const readlineSync = require("readline-sync");
const setEnvValue = require("./setEnvVars");
const langs = require("./langs");
const setCommentStrings = require("./setCommentStrings");

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
        const commentStr = setCommentStrings(langs[langIndex].toLowerCase());
        console.log(
          `\n${langs[langIndex]} was selected.\n
          Run stn [filepath] and save-to-notion will save any code between the following lines.\n
            ${commentStr.openComment}
              This code will be sent to Notion!
            ${commentStr.closeComment}`
        );
        return false;
      }

    default:
      return true;
  }
};

module.exports = handleArgs;
