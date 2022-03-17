require("dotenv").config();

const token = process.env.INTEGRATION_TOKEN;
const pageId = process.env.PAGE_ID;

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: token });

const writeToNotion = async (linesArr) => {
  try {
    const id = pageId;
    const content = linesArr.join("\n");
    await notion.blocks.children.append({
      block_id: id,
      children: [
        {
          type: "code",
          //TODO add comment option
          code: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: content,
                },
              },
            ],
            language: "javascript",
          },
        },
      ],
    });
    console.log("Successfully saved to Notion");
  } catch (err) {
    console.error("writeToNotion error:", err);
    return;
  }
};

module.exports = writeToNotion;
