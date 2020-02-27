const fs = require("fs");
const util = require("util");
const api = require("./api");
const inquirer = require("inquirer");

//set a variable to write a new readme.md file
const writeFileAsync = util.promisify(fs.writeFile);

//main function that will create the skeleton of the readme
function createReadme(info, token){
    //All this will be written into the readme
    return `
# ${info.title}
[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://github.com/${token.data.login})
    
## Table of Contents
1. [Description](#Description)
2. [Installation](#Installation)
3. [Usage](#Usage)
4. [License](#License)
5. [Contributing](#Contributing)
6. [Tests](#Tests)
7. [Questions](#Questions)
8. [Github Info](#Info)

## Description:<a name = "Description"></a>
${info.description}

## Installation Requirements:<a name = "Installation"></a>
${info.installation}

## Usage:<a name = "Usage"></a>
${info.usage}

## License:<a name = "License"></a>
${info.license}

## Contributing:<a name = "Contributing"></a>
${info.contributing}

## Tests:<a name = "Tests"></a>
${info.tests}

## Questions:<a name = "Questions"></a>
${info.questions}

## Github info:<a name = "Info"></a>

![alt text](${token.data.avatar_url})

### Email me at:
${token.data.email}
`
}

//aync function so I can use await
async function writeReadme(response, token){
    const markdown = createReadme(response, token);
    await writeFileAsync("README.md", markdown);

    console.log("readme generated.")
}

//prompt user function to get user info
function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            name: "gitHub",
            message: "Enter github ID"
        },
        {
            type: "input",
            name: "title",
            message: "Title of Project"
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description of the project"
        },
        {
            type: "input",
            name: "installation",
            message: "Enter installation instructions"
        },
        {
            type: "input",
            name: "usage",
            message: "Enter usage instructions"
        },
        {
            type: "input",
            name: "license",
            message: "Enter applicable licenses",
            default: "Not applicable to this project."
        },
        {
            type: "input",
            name: "contributing",
            message: "Enter contribution instructions",
            default: "Not applicable to this project."
        },
        {
            type: "input",
            name: "tests",
            message: "Enter tests here",
            default: "not applicable to this project."
        },
        {
            type: "input",
            name: "questions",
            message: "applicable questions",
            default: "Not applicable to this project."
        }
    ]);
}

//function that kicks off the program
async function init(){
    //welcome message
    console.log("Welcome to the readme generator, a series of questions will help automatically generate a readme for you.");4

    //set some variables based on user response
    const response = await promptUser();
    const userToken = api.getUser(response.gitHub);
    
    //call the readme writing function after receiving data
    userToken.then(function(result){
        writeReadme(response, result);
    });
}

init();

// let userToken = api.getUser("JosiahKJohnson");

// userToken.then(function(result){
//     console.log(result);
// });
