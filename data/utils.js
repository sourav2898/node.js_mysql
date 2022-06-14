"use strict";

const fs = require("fs-extra");
const { join } = require("path");

const localSqlQueries = async (folderName) => {
  const filepath = join(process.cwd(), "data", folderName);
  const files = await fs.readdir(filepath);
  const sqlFiles = await files.filter((f) => f.endsWith(".sql"));
  const queries = {};

  for (const sqlFile of sqlFiles) {
    const query = await fs.readFileSync(join(filepath, sqlFile), {
      encoding: "UTF-8",
    });
    quesries[(sqlFile.replace(".sql"), "")] = query;
  }

  return queries;
};

module.exports = {
  localSqlQueries,
};
