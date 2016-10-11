const fs     = require("fs");
const jekyll = require("jekyll-meta-from-markdown");
const glob = require("glob");
const path = require("path");

global.__base = "../..";

glob(`${__base}/!(node_modules|jekyll)**/*.md`, (er, files) => {
  // console.log(files);
  for (let item in files) {
    let file = files[item];
    let file_name = path.basename(file);
    let file_data = fs.readFileSync(file, {encoding: "utf-8"});
    let stats = fs.statSync(file);
    let jekyll_file_data = jekyll(file_data, {
      date: new Date(stats.mtime),
      author: "Abigail Morris"
    });

    fs.writeFileSync(`${__base}/jekyll/_posts/${file_name}`, jekyll_file_data);
  }
});
