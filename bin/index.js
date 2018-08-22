const fs     = require("fs");
const glob = require("glob");
const path = require("path");

global.__base = "./";
glob(`${__base}/!(node_modules|bin)**/*.md`, (er, files) => {
  // console.log(files);
  let links = [];
  for (let item in files) {
    let file = files[item];
    let file_name = path.basename(file).replace('.md', '.html');
    let name = path.basename(file).replace('.md', '').replace('-', ' ');
    let dir_name = path.dirname(file).replace('./', '');
    let file_data = fs.readFileSync(file, {encoding: "utf-8"});
    links.push(`* [${name}](http://abugail.github.io/recipes/${dir_name}/${file_name})`);
  }
  let link_txt = links.join('\n');
  let text = `# Recipes \n> All the Things I like to cook \n\n${link_txt}`;
  fs.writeFileSync(`${__base}/index.md`, text);
});