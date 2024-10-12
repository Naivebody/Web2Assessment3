/*  This file is for accessing the database*/
const dbcon = require("../dbconnect/crowdfunding_db");
const express = require('express');
const {query} = require("express");
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
    const sql = "select * from FUNDRAISER " +
        "JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID " +
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

router.get('/api/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;
    const query = `
        SELECT f.*, d.DONATION_ID, d.DATE, d.AMOUNT, d.GIVER
        FROM FUNDRAISER f
        LEFT JOIN DONATION d ON f.FUNDRAISE_ID = d.FUNDRAISER_ID
        WHERE f.FUNDRAISE_ID = ?
    `;
    connection.query(query, [fundraiserId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});//Get

router.post('/api/donation', (req, res) => {
    const { DATE, AMOUNT, GIVER, FUNDRAISER_ID } = req.body;
    const query = 'INSERT INTO DONATION (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES (?, ?, ?, ?)';
    connection.query(query, [DATE, AMOUNT, GIVER, FUNDRAISER_ID], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Donation added', id: result.insertId });
    });
});//POST：Insert a new donation

router.post('/api/fundraiser', (req, res) => {
    const { ORGANIZER, CAPTION, TARGET_Founding, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID } = req.body;
    const query = 'INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_Founding, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [ORGANIZER, CAPTION, TARGET_Founding, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Fundraiser added', id: result.insertId });
    });
});//POST：Insert a new fundraiser

router.put('/api/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;
    const { ORGANIZER, CAPTION, TARGET_Founding, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID } = req.body;
    const query = 'UPDATE FUNDRAISER SET ORGANIZER = ?, CAPTION = ?, TARGET_Founding = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ? WHERE FUNDRAISE_ID = ?';
    connection.query(query, [ORGANIZER, CAPTION, TARGET_Founding, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID, fundraiserId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Fundraiser updated' });
    });
});//PUT

router.delete('/api/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;
    const checkQuery = 'SELECT * FROM DONATION WHERE FUNDRAISER_ID = ?';
    connection.query(checkQuery, [fundraiserId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'Cannot delete fundraiser with donations' });
        }
        const deleteQuery = 'DELETE FROM FUNDRAISER WHERE FUNDRAISE_ID = ?';
        db.query(deleteQuery, [fundraiserId], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Fundraiser deleted' });
        });
    });
});//delete
// Export API routes
module.exports = router;














