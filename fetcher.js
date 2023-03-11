const request = require("request");
const fs = require("fs");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const rl = readline.createInterface({ input, output });
// taking input from the user .i.e website address
// print process.argv
let userURLArg = "";
let userLocalArg = "";
const q = "Do you want to overwrite the existing file? Press Y to continue..";
//getting the value from the user/command prompt
process.argv.forEach(function (val, index, array) {
  userURLArg = array[2];
  userLocalArg = array[3];
});

//declare a function for the request
const reqFile = function () {
  request(userURLArg, (error, response, body) => {
    //checking if URL is valid
    if (error) {
      console.log("The URL is Invalid");
      process.exit();
    } else {
      fs.writeFile(userLocalArg, body, (err) => {
        if (err) {
          console.log("The URL is Invalid");
        } else {
          console.log(
            "Downloaded and saved " + body.length + " bytes to " + userLocalArg
          );
        }
        process.exit();
      });
    }
    //using the write file to find the size of the file
  });
};

fs.readFile(userLocalArg, "utf8", (err, data) => {
  if (err) {
    console.log("File Path is Invalid.\n" + err.message);
    process.exit();
  }
  rl.question(q, (answer) => {
    if (answer !== "Y") {
      console.log("Nothing to save!!");
      rl.close();
    } else {
      reqFile();
    }
  });
});
