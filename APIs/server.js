/*  This is the main start file for the API server*/
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path=require("path");
const fs = require('fs');

//Include our RESTFul APIs
const appAPI = require("./controllerAPI/api-controller");

/**
 *  server init
 * @type {app}
 */
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

/**
 * Redirect the URL to homepage
 */
// server.get("/",(req,res)=>{
//     res.redirect('/home')
// });

/**
 *  Call the static resources of the homepage
 */
server.use(express.static(path.join(__dirname,'..','Clientside')));

/**
 *  Map the urls with the API
 *
 */
server.use(appAPI);

/**
 * server run
 */
server.listen(3060);
console.log("Server is up now and running on port 3060");
console.log("URL: http://localhost:3060/index.html");


