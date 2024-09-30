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
router.get("/api/home", (req, res)=>{
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
router.get("/api/search", (req, res)=>{
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
router.get("/api/search/:city?/:organizer?/:category?", (req, res) => {
    const city = req.params.city && req.params.city.trim() !== '' ? req.params.city : null;
    const organizer = req.params.organizer && req.params.organizer.trim() !== '' ? req.params.organizer : null;
    const category = req.params.category && req.params.category.trim() !== '' ? req.params.category : null;

    let query = `
        SELECT * FROM FUNDRAISER 
        JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID 
        WHERE ACTIVE = 1
    `;

    const queryParams = [];

    if (city) {
        query += ` AND FUNDRAISER.CITY = ?`;
        queryParams.push(city);
    }
    if (organizer) {
        query += ` AND FUNDRAISER.ORGANIZER = ?`;
        queryParams.push(organizer);
    }
    if (category) {
        query += ` AND CATEGORY.NAME = ?`;
        queryParams.push(category);
    }

    console.log("Executing query:", query, queryParams);
    connection.query(query, queryParams, (err, records, fields) => {
        if (err) {
            console.error("Error while retrieving the data (Conditional Fundraiser)", err);
            return res.status(500).send("Server error");
        }
        if (records.length === 0) {
            console.log("No records match!");
            return res.json([]);
        }
        return res.send(records);
    });
});


/**
 * Response for GET method to retrieve fundraiser details by ID from db
 */
router.get("/api/fundraiser/:id", (req, res)=>{
    connection.query("select * from FUNDRAISER " +
        "JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID  " +
        "where FUNDRAISER_ID="+ req.params.id, (err, records,fields)=> {
        if (err){
            console.error("Error while retrieve the data (Specific Fundraiser)");
        }else{
            res.send(records);
        }
    })
})

// Export API routes
module.exports = router;














