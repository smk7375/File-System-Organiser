let utilityObj = require("./utility");
let fs = require("fs");
let path = require("path");
function organizeFn(dirPath) {

    //console.log("organize command implemented for" , dirPath);
1   //1 input - directory path given
    let destPath;
    if(dirPath==undefined) {
        //console.log("kinly enter the correct path");
        destPath = process.cwd();
        return;
    }
    else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
            // 2 create -> organized_files ki directory
            destPath = path.join(dirPath , "organized_files");
            if(fs.existsSync(destPath)==false)
            {
                fs.mkdirSync(destPath);
            }

        }
        else {
            console.log("kindly enter the correct path");
        }
    }

    organizeHelper(dirPath , destPath);
}

function organizeHelper(src , dest) {
    let childNames = fs.readdirSync(src);
    //console.log(childNames);
    for(let i = 0 ; i<childNames.length ; i++)
    {
        let childAddress = path.join(src , childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile) {
            //console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i] , "belongs to -->", category);
            // copy/cut files to that organized directory inside of any of category folder
            sendFiles(childAddress , dest , category);
        }
    }
}

function sendFiles(srcFilePath , dest , category) {

    let categoryPath = path.join(dest , category);
    if(fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let filename = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath , filename);
    fs.copyFileSync(srcFilePath , destFilePath);
    // fs.unlinkSync(srcFilePath); --> orignal file ko cut kr dega 
    console.log(filename , "copied to" , category);

}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in utilityObj.types)
    {
        let cTypeArray = utilityObj.types[type];
        for(let i = 0 ; i<cTypeArray.length ; i++)
        {
            if(ext==cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}

module.exports= {
    organizeKey: organizeFn
}