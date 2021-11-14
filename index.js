const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

let pathToRepo = process.argv[2];
let previousVer = process.argv[3];
let newVer = process.argv[4];

console.log(process.argv);

let spawn = require('child_process').spawn;

git = spawn('git', ['log', '--ancestry-path', '--pretty=format:%s', previousVer + '..' + newVer], {cwd: pathToRepo}),

buf = Buffer.alloc(0);

git.stdout.on('data', (data) => {
    buf = Buffer.concat([buf, data])
});

git.stderr.on('data', (data) => {
    console.log(data.toString());
});

git.on('close', (code) => {
    fs.writeFile("Changelog.md", buf, function(err){
      if(err) return console.log(err);
    });
});

