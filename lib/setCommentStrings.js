const setCommentStrings = (langstring = "readenv") => {
  let langComment;
  let switchStatement;

  if (langstring === "readenv") {
    switchStatement = process.env.CODE_LANG;
  } else {
    switchStatement = langstring;
  }

  switch (switchStatement) {
    case "javascript":
      langComment = "//";
      break;
    case "rust":
      langComment = "//";
      break;
    case "c++":
      langComment = "//";
      break;
    case "java":
      langComment = "//";
      break;
    case "go":
      langComment = "//";
      break;
    case "ruby":
      langComment = "#";
      break;
    case "python":
      langComment = "#";
      break;
    case "html":
      langComment = ["<!--", "-->"];
      break;
    case "css":
      langComment = ["/*", "*/"];
      break;
    default:
      console.error(
        "Language not found. Please check CODE-LANG .env variable or run stn -l"
      );
      return;
  }

  let openComment;
  let closeComment;

  if (typeof langComment === "string") {
    openComment = `${langComment}stn`;
    closeComment = `${langComment}stnend`;
  } else {
    openComment = `${langComment[0]}stn${langComment[1]}`;
    closeComment = `${langComment[0]}stnend${langComment[1]}`;
  }

  return {
    openComment,
    closeComment,
  };
};

module.exports = setCommentStrings;
