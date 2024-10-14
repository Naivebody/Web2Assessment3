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
    connection.query("select * from fundraiser  JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID where ACTIVE=1", (err, records,fields)=> {
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
    connection.query("select * from category", (err, records,fields)=> {
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
router.get("/api/search/:city?/:organizer?/:category?/:active", (req, res) => {
    const city = req.params.city && req.params.city.trim() !== '' ? req.params.city : null;
    const organizer = req.params.organizer && req.params.organizer.trim() !== '' ? req.params.organizer : null;
    const category = req.params.category && req.params.category.trim() !== '' ? req.params.category : null;
    const active = req.params.active.toString();

    let query = `
        SELECT * FROM fundraiser
        JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID 
    `;

    const queryParams = [];

    if (city) {
        query += ` AND fundraiser.CITY = ?`;
        queryParams.push(city);
    }
    if (organizer) {
        query += ` AND fundraiser.ORGANIZER = ?`;
        queryParams.push(organizer);
    }
    if (category) {
        query += ` AND category.NAME = ?`;
        queryParams.push(category);
    }
        query += ` AND fundraiser.ACTIVE = ?`;
        queryParams.push(active);


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
    const sql = "select * from fundraiser " +
        "JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID " +
        "where FUNDRAISER_ID=" + req.params.id
    connection.query(sql, (err, records)=> {
        if (err){
            console.error("Error while retrieve the data (Specific Fundraiser)");
        }else{
            console.log("Executing SQL:",sql);
                res.send(records);
        }
    })
})

/**
 * Response for GET method to retrieve donation details by FundraiserID from db
 */
router.get("/api/fundraiser/donation/:id", (req, res)=>{
    const sql = "select * from donation where FUNDRAISER_ID= " + req.params.id ;
    connection.query(sql, (err, records)=> {
        if (err){
            console.error("Error while retrieve the data (DONATION)");
            res.send(err);
        }else{
            res.send(records);
        }
    })
})

/**
 * Response for GET method to retrieve all fundraisers and their category
 */
router.get("/api/fundraisers", (req, res)=>{
    connection.query("select * from fundraiser  JOIN category ON fundraiser.CATEGORY_ID = category.CATEGORY_ID ORDER BY FUNDRAISER_ID ", (err, records,fields)=> {
        if (err){
            console.error("Error while retrieve the data (All active fundraisers)");
        }else{
            res.send(records);
        }
    })
})

/**
 * Post method API to insert a donation record into db
 */
router.post('/api/donate', (req, res) => {
    const { DATE, AMOUNT, GIVER, FUNDRAISER_ID } = req.body;
    const query = 'INSERT INTO donation (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES (?, ?, ?, ?)';
    connection.query(query, [DATE, AMOUNT, GIVER, FUNDRAISER_ID], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Thank you for your donation to ', id: result.insertId });
    });
});

/**
 * POST method API to insert a fundraiser record into db
 */
router.post('/api/fundraiser', (req, res) => {
    const { ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID } = req.body;
    const query = 'INSERT INTO fundraiser (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.json({ message: 'Fundraiser added', id: result.insertId });
    });
});

/**
 * PUT method API to update a fundraiser record into db
 */
router.put('/api/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;
    const { ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID } = req.body;
    const query = 'UPDATE fundraiser SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ? WHERE FUNDRAISER_ID = ?';
    connection.query(query, [ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID, fundraiserId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Fundraiser updated'});
    });
});

/**
 * DELETE method API to update a fundraiser record into db
 */
router.delete('/api/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;
        const deleteQuery = 'DELETE FROM fundraiser WHERE FUNDRAISER_ID = ?';
        connection.query(deleteQuery, [fundraiserId], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Fundraiser deleted' });
        });
    });


module.exports = router;














