const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
let spawn = require("child_process").spawn;
const { strictEqual } = require("assert");

var features = [];
var fixes = [];
var other = [];
let pathToRepo = process.argv[2];
let previousVer = process.argv[3];
let newVer = process.argv[4];
let changelog = "Changelog\n=========\n\n";
let ver =
  "## [" +
  newVer.substring(1) +
  "]" +
  "(https://github.com/ckeditor/ckeditor5/compare/" +
  previousVer +
  "..." +
  newVer +
  ")";

git = spawn(
  "git",
  ["log", "--ancestry-path", "--pretty=format:%B", previousVer + ".." + newVer],
  { cwd: pathToRepo }
);

buf = Buffer.alloc(0);

git.stdout.on("data", (data) => {
  buf = Buffer.concat([buf, data]);
});

git.stderr.on("data", (data) => {
  console.log(data.toString());
});

git.on("close", (code) => {
  releaseDate = spawn("git", ["log", newVer +"^.."+ newVer, "--pretty=format:%as"], {
    cwd: pathToRepo,
  });
  buf2 = Buffer.alloc(0);
  releaseDate.stdout.on("data", (data) => {
    buf2 = Buffer.concat([buf2, data]);
  });
  releaseDate.stderr.on("data", (data) => {
    console.log(data.toString());
  });
  releaseDate.on("close", (code) => {
    let splitted = buf.toString().split("\n");
    let m;
    for (let line of splitted) {
      if ((m = line.match(/^Feature(?: \(([^\)]+)\))?:/))) {
        if (m[1]) {
          features.push("* **" + m[1] + "**: " + line.substring(m[0].length));
        } else {
          features.push("* " + line.substring(m[0].length));
        }
      } else if ((m = line.match(/^Fix(?:ed)?(?: \(([^\)]+)\))?:/))) {
        if (m[1]) {
          fixes.push("* **" + m[1] + "**: " + line.substring(m[0].length));
        } else {
          fixes.push("* " + line.substring(m[0].length));
        }
      } else if ((m = line.match(/^Other(?: \(([^\)]+)\))?:/))) {
        if (m[1]) {
          other.push("* **" + m[1] + "**: " + line.substring(m[0].length));
        } else {
          other.push("* " + line.substring(m[0].length));
        }
      }
    }
    features.sort().reverse();
    fixes.sort().reverse();
    other.sort().reverse();
    fs.writeFile(
      "Changelog.md",
      changelog +
        ver +
        " (" +
        buf2.toString() +
        ")\n" +
        "\n### Features\n\n" +
        features.join("\n") +
        "\n\n" +
        "### Bug fixes\n\n" +
        fixes.join("\n") +
        "\n\n" +
        "### Other changes\n\n" +
        other.join("\n") +
        "\n\n",
      function (err) {
        if (err) return console.log(err);
      }
    );
  });
  });
 
