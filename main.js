#!/usr/bin/env node
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/oranize");


let inputArr = process.argv.slice(2);
//console.log(inputArr);

// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help


let command = inputArr[0];
switch(command)
{

    case "tree" :
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize" :
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help" :
        helpObj.helpKey();
        break;
    default:
        console.log("please 🙏 input right command");
        break;
}




