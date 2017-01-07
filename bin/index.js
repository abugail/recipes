const fs     = require("fs");
const jekyll = require("jekyll-meta-from-markdown");
const glob = require("glob");
const path = require("path");
const del = require("del");

global.__base = "";
del(`${__base}/jekyll/_posts/*.md`)
.then(paths => {
  glob(`${__base}/!(node_modules|jekyll)**/*.md`, (er, files) => {
    // console.log(files);
    for (let item in files) {
      let file = files[item];
      let file_name = path.basename(file);
      let file_data = fs.readFileSync(file, {encoding: "utf-8"});
      let stats = fs.statSync(file);
      let file_date = new Date(stats.mtime);
      let jekyll_file_data = jekyll(file_data, {
        date: file_date,
        author: "Abigail Morris"
      });
      fs.writeFileSync(`${__base}/jekyll/_posts/${file_date.getFullYear()}-${file_date.getMonth() + 1}-${file_date.getDate()}-${file_name}`, jekyll_file_data);
    }
  });
});
