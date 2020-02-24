const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

//set a variable to write a new readme.md file
const writeFileAsync = util.promisify(fs.writeFile);

//main function that will create the skeleton of the readme
function createReadme(info){
    //All this will be written into the readme
    return `
    # ${info.title}
    [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
    
    ## Table of Contents
    1.[ ### Description](#Description)

    ## Description:<a name = "Description"></a>
    ${info.description}
    `
}

const response ={
    title: "Awesome Project",
    description: "This is a test description for my awesome project that will automatically create these readmes so I don't have to."
}

//aync function so I can use await
async function writeReadme(){
    const markdown = createReadme(response);
    await writeFileAsync("README.md", markdown);
}

writeReadme();
