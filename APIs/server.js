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
server.get("/",(req,res)=>{
    res.redirect('/home')
});

/**
 *  Call the static resources of the homepage
 */
server.use(express.static(path.join(__dirname,'..','Clientside')));
server.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,'..','Clientside',"index.html"));
});
server.get("/search",(req,res)=>{
    res.sendFile(path.join(__dirname,'..','Clientside',"search.html"));
});
server.get("/fundraiser",(req,res)=>{
    const id = req.query.info;
    fs.readFile(path.join(__dirname,'..','Clientside',"fundraiser_detail.html"), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('File read error');
        }
        const html = data.replace('{{id}}', id);
        return res.send(html);
    });
});


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
console.log("URL: http://localhost:3060/");


