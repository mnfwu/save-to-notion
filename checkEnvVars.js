const readlineSync = require("readline-sync");
const fs = require("fs");
const os = require("os");
const path = require("path");

const envFilePath = path.resolve(__dirname, ".env");

const readEnvVars = () => fs.readFileSync(envFilePath, "utf-8").split(os.EOL);

const setEnvValue = (key, value) => {
  const envVars = readEnvVars();
  const targetLine = envVars.find((line) => line.split("=")[0] === key);
  if (targetLine !== undefined) {
    const targetLineIndex = envVars.indexOf(targetLine);
    envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
  } else {
    envVars.push(`${key}="${value}"`);
  }
  fs.writeFileSync(envFilePath, envVars.join(os.EOL));
};

const checkEnvVars = () => {
  if (!process.env.INTEGRATION_TOKEN) {
    const token = readlineSync.question(
      "No integration token found. Please enter your Notion integration token:\n"
    );
    setEnvValue("INTEGRATION_TOKEN", token.trim());
    console.log(
      "Your integration token was set as a .env variable. Please re-run nsnip."
    );
    return;
  }
  if (!process.env.PAGE_ID) {
    const pageId = readlineSync.question(
      "No page ID found. Please enter the ID of the Notion page you wish to snip to:\n"
    );
    setEnvValue("PAGE_ID", pageId.trim());
    console.log(
      "Your page ID was set as a .env variable. Please re-run nsnip."
    );
    return;
  }

  if (
    process.env.INTEGRATION_TOKEN != undefined &&
    process.env.PAGE_ID != undefined
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
