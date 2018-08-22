const fs     = require("fs");
const glob = require("glob");
const path = require("path");

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

global.__base = "./";
glob(`${__base}/!(node_modules|bin)**/*.md`, (er, files) => {
  let links = {};
  for (let item in files) {
    let file = files[item];
    let file_name = path.basename(file).replace('.md', '.html');
    let name = path.basename(file).replace('.md', '').replace(/-/g, ' ');
    let dir_name = path.dirname(file).replace('./', '');
    let file_data = fs.readFileSync(file, {encoding: "utf-8"});

    if (!links[dir_name]) {
      links[dir_name] = [];
    }

    links[dir_name].push(`* [${name.capitalize()}](http://abugail.github.io/recipes/${dir_name}/${file_name})`);
  }

  let link_txt = '';
  Object.keys(links).forEach((heading) => {
    link_txt = `${link_txt}\n## ${heading.capitalize()}\n${links[heading].join('\n')}`
  });

  let text = `# Recipes \n> All the Things I like to cook \n\n${link_txt}`;
  fs.writeFileSync(`${__base}/index.md`, text);
});