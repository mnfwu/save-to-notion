const readlineSync = require("readline-sync");
const setEnvValue = require("./setEnvVars");
const langs = require("./langs");

const checkEnvVars = () => {
  // check if user has set Notion integration token
  if (!process.env.INTEGRATION_TOKEN) {
    const token = readlineSync.question(
      "No integration token found. Please enter your Notion integration token:\n"
    );
    setEnvValue("INTEGRATION_TOKEN", token.trim());
    console.log(
      "Your integration token was set as a .env variable. Please re-run stn."
    );
    return;
  }

  // check if user has set page ID
  if (!process.env.PAGE_ID) {
    const pageId = readlineSync.question(
      "No page ID found. Please enter the ID of the Notion page you wish to snip to:\n"
    );
    setEnvValue("PAGE_ID", pageId.trim());
    console.log("Your page ID was set as a .env variable. Please re-run stn.");
    return;
  }

  // check is user has set programming language option
  if (!process.env.CODE_LANG) {
    const langIndex = readlineSync.keyInSelect(
      langs,
      "No programming language selected. Choose a supported langauge from the list:"
    );
    if (langs[langIndex] === undefined) {
      return;
    } else {
      setEnvValue("CODE_LANG", langs[langIndex].toLowerCase());
      console.log(
        `${langs[langIndex]} was selected. Please run the program once more.`
      );
      return;
    }
  }

  if (
    process.env.INTEGRATION_TOKEN != undefined &&
    process.env.PAGE_ID != undefined &&
    process.env.CODE_LANG != undefined
  ) {
    return true;
  } else {
    console.error(
      "There was a problem setting or reading .env variables. Please check to make sure your .env file contains your Notion integration token with the key INTEGRATION_TOKEN and your Notion page ID with the key PAGE_ID."
    );
    return false;
  }
};

module.exports = checkEnvVars;
