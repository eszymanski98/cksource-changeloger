const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const questions = [
  {
    type: "input",
    name: "pathToChangelog",
    message: "Provide path to the clonned repository of CKEditor 5: ",
  },
  {
    type: "input",
    name: "previousVer",
    message: "Provide previous version name: ",
  },
  {
    type: "input",
    name: "newVer",
    message: "Provide new version name: ",
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(JSON.stringify(answers, null, "  "));

  const pathToFile = path.join(answers.pathToChangelog, "CHANGELOG.md");
  const currPath = path.join(__dirname, "CHANGELOG.md");

  // using spawn in the child process module
let spawn = require('child_process').spawn;
// start get log process
git = spawn('git', ['log', '--ancestry-path', '--pretty=format:%s', answers.previousVer + '..' + answers.newVer], {cwd: answers.pathToChangelog}),
// buffer for data
buf = Buffer.alloc(0);
// concat
git.stdout.on('data', (data) => {
    buf = Buffer.concat([buf, data])
});
// if process error
git.stderr.on('data', (data) => {
    console.log(data.toString());
});
// when process is done
git.on('close', (code) => {
    fs.writeFile("Changelog.md", buf, function(err){
      if(err) return console.log(err);
    });
});
})
