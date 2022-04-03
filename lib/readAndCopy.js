const path = require("path");
const events = require("events");
const fs = require("fs");
const readline = require("readline");
const setCommentStrings = require("./setCommentStrings");

const filepath = path.resolve(process.argv[2]);

const readAndCopy = async () => {
  try {
    const readLineInterface = readline.createInterface({
      input: fs.createReadStream(filepath),
    });

    let isWriting = false;
    let copiedLines = [];
    let StnStr = setCommentStrings();

    console.log(StnStr);

    readLineInterface.on("line", (line) => {
      if (line.replace(/\s/g, "") == StnStr.openComment) {
        isWriting = true;
      }

      if (isWriting) {
        copiedLines.push(line);
      }

      if (line.replace(/\s/g, "") == StnStr.closeComment) {
        isWriting = false;
      }
    });

    await events.once(readLineInterface, "close");

    copiedLines.pop();
    copiedLines.shift();

    console.log(
      `Read file ${filepath} and copied ${copiedLines.length} lines.`
    );
    return copiedLines;
  } catch (err) {
    console.error("readAndCopy error:", err);
  }
};

module.exports = readAndCopy;
