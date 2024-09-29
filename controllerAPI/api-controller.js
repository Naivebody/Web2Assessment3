/*  This file is for accessing the database*/
const dbcon = require("../dbconnect/crowdfunding_db");
const express = require('express');
const router = express.Router();

/**
 * Create a connection object
 * @type {Connection}
 */
var connection = dbcon.getconnection();
// Open connection
connection.connect();

/**
 * Response for GET method to retrieve all active fundraisers and their category
 */
router.get("/", (req, res)=>{
    connection.query("select * from FUNDRAISER  JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID where ACTIVE=1", (err, records,fields)=> {
        if (err){
            console.error("Error while retrieve the data (All active fundraisers)");
        }else{
            res.send(records);
        }
    })
})

/**
 * Response for GET method to retrieve all categories from db
 */
router.get("/search", (req, res)=>{
    connection.query("select * from CATEGORY", (err, records,fields)=> {
        if (err){
            console.error("Error while retrieve the data (All category)");
        }else{
            res.send(records);
        }
    })
})

/**
 * Response for GET method to retrieve conditional fundraisers from db
 */
router.get("/search/:city", (req, res)=>{
    connection.query("select * from FUNDRAISER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID where ACTIVE=1 && CITY="+'"'+req.params.city+'"', (err, records,fields)=> {
        if (err){
            console.error("Error while retrieve the data (Conditional Fundraiser)",err);
        }else if(records.length==0){
            console.log("No records match!")
        }else{
            res.send(records);
        }
    })
})

/**
 * Response for GET method to retrieve fundraiser details by ID from db
 */
router.get("/fundraiser/:id", (req, res)=>{
    connection.query("select * from FUNDRAISER where FUNDRAISER_ID="+ req.params.id, (err, records,fields)=> {
        if (err){
            console.error("Error while retrieve the data (Specific Fundraiser)");
        }else{
            res.send(records);
        }
    })
})

// Export API routes
module.exports = router;














