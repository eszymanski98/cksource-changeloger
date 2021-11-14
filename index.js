const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'path',
    message: "Provide path to the clonned repository of CKEditor 5: "
  }, {
    type: 'input',
    name: 'previousVer',
    message: "Provide previous version name: ",
  }, {
    type: 'input',
    name: 'newVer',
    message: "Provide new version name: ", 
    }
];

inquirer.prompt(questions).then(answers => {
  console.log(JSON.stringify(answers, null, '  '));
});