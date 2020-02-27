//requirements
const axios = require("axios");
require("dotenv").config();

//api setup
const api = {
    //api.getUser function
    getUser(username) {
        //return axios that retrieves data from Github's API servers
        return axios.get(
            `https://api.github.com/users/${username}?client_id=${
            process.env.CLIENT_ID
        }&client_secret=${process.env.CLIENT_SECRET}`
    )
    //error catch + log message if user does not exist
    .catch(err => {
        console.log(`User not found`);
        process.exit(1);
    });
  }
};
module.exports = api;