const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const api = require("./api");

//set a variable to write a new readme.md file
const writeFileAsync = util.promisify(fs.writeFile);

//main function that will create the skeleton of the readme
function createReadme(info, token){
    //All this will be written into the readme
    return `
# ${info.title}
[![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/)
    
## Table of Contents
1.[### Description](#Description)
2.[### Installation](#Installation)
3.[### Usage](#Usage)
4.[### License](#License)
5.[### Contributing](#Contributing)
6.[### Tests](#Tests)
7.[### Questions](#Questions)
8.[### Github Info](#Info)

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

## Github info:<a name = "Info></a>

![alt text](${token.data.avatar_url}"Profile picture")

### Email me at:
${token.data.email}
`
}

const response ={
    title: "Awesome Project",
    description: "This is a test description for my awesome project that will automatically create these readmes so I don't have to.",
    installation: "installation instructions",
    usage: "Usage instructions here",
    license: "Applicable licenses here",
    contributing: "Contribution instructions here",
    tests: "Info on testing here",
    questions: "Questions here"
};

//aync function so I can use await
async function writeReadme(response, token){
    const markdown = createReadme(response, token);
    await writeFileAsync("README.md", markdown);
}

//writeReadme();
let userToken = api.getUser("JosiahKJohnson");

userToken.then(function(result){
    writeReadme(response, result);
});
