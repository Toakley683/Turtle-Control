const express = require( `express` );
const mysql = require( `mysql` );

// SQL Connection

const db = mysql.createConnection({

    host : "localhost",
    user : "root",
    password : "MEI9vyivulrBnItUSdOdDKb6T9zy7B6V4SNoDcyuKEy!1jAGLaAm0ps0rS4C4S&Ve&lU*uTOR0GQX&wGQKm&Z$8xhWZFhz!Fgb3"

});

db.connect( ( err ) => {
    if( err ) throw err;

    console.log( `MySQL has been CONNECTED`)

});

const app = express()

app.listen( `2000` , () => {

    console.log( `Server started on port 2000` );

});