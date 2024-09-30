/*  This file contains the data for database connection*/

const dbDetails = require("./db-details");
const mysql = require('mysql2');

/**
 * Export the Connection method
 * @type {{getconnection: (function(): Connection)}}
 */
module.exports = {
    getconnection: ()=>{
        return mysql.createConnection({
            host:dbDetails.host,
            user:dbDetails.user,
            password:dbDetails.password,
            database:dbDetails.database
        });
    }
}