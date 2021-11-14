const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

var features = [];
var fixes = [];
var other = [];
let pathToRepo = process.argv[2];
let previousVer = process.argv[3];
let newVer = process.argv[4];
let changelog = "Changelog\n=========\n\n";
let ver = "## [" + newVer.substring(1) + "]" +"(https://github.com/ckeditor/ckeditor5/compare/"+previousVer+"..."+newVer+")\n";
let spawn = require('child_process').spawn;
const { strictEqual } = require("assert");


git = spawn('git', ['log', '--ancestry-path', '--pretty=format:%B', previousVer + '..' + newVer], {cwd: pathToRepo}),
//releaseDate = spawn('git', ['log', '--ancestry-path', '--pretty=format:%s', previousVer + '..' + newVer], {cwd: pathToRepo}),

buf = Buffer.alloc(0);

git.stdout.on('data', (data) => {
    buf = Buffer.concat([buf, data])
});

git.stderr.on('data', (data) => {
    console.log(data.toString());
});

git.on('close', (code) => {
  let splitted = buf.toString().split("\n")

  for(let line of splitted){
    if(/^Feature(?: \([^\)]+\))?:/.test(line)){
      features.push(line);
    }else if(/^Fix(?:ed)?(?: \([^\)]+\))?:/.test(line)){
      fixes.push(line);
    }else if(/^Other(?: \([^\)]+\))?:/.test(line)){
      other.push(line);
    }
  }
    fs.writeFile("Changelog.md", changelog + ver + features.join("\n") + "\n\n" + fixes.join("\n") + "\n\n" + other.join("\n") + "\n\n" , function(err){
      if(err) return console.log(err);
    });
});

