
const WebSocket = require( `ws` );
const mongoose = require( `mongoose` );
const { object } = require("webidl-conversions");
const { json } = require("stream/consumers");

const wss = new WebSocket.Server( { clientTracking: true, port: 1000 } );

let htmlClients = [];
let turtleClients = [];

wss.on( "connection", ws => {

    console.log( "Client Connected" )
    console.log( `Clients: ${wss.clients.size}` )

    ws.on( "message", data => {
        
        const dataString = `${data}`
        const OBJ = isJson( dataString )
        
        if( OBJ[`client`] == "HTML" ) {

            if ( !htmlClients.includes( ws ) ) { htmlClients.push(ws) }

            console.log( htmlClients.length )

            console.table( OBJ )

            let JS = [ OBJ[ `function` ], OBJ[ `id` ] ]
            let JSONJs = JSON.stringify( JS )
            
            console.log( JSONJs )

            wss.broadcastToTurtle( JSONJs )

        }
        
        if( OBJ[`client`] != "HTML" ) {

            if ( !turtleClients.includes( ws ) ) { turtleClients.push(ws) }

            //ws.send( [ "-1", `os.setComputuerLabel("${array[ random ]}`] )
            
            console.log( `Response: ${data}` )

            console.log( OBJ )
            wss.broadcastToHTML( JSON.stringify( OBJ[1] ) )

            const jsonData = require('./names.json'); 
            const array = isJson( "[ 'A', 'B' ]" )
            const random = Math.floor( Math.random() * array.length )

            console.log( array )

        }

    })

    ws.on( "close", () => {

        console.log( "Client Disconnected" )
        console.log( `Clients: ${wss.clients.size}` )

    })

})

wss.broadcastToTurtle = function broadcastToTurtle( msg ) {

    wss.clients.forEach( function each ( client ) {

        if ( htmlClients.includes( client ) ) return

        client.send( msg )

    })

}

wss.broadcastToHTML = function broadcastToHTML( msg ) {

    wss.clients.forEach( function each ( client ) {

        if ( turtleClients.includes( client ) ) return

        client.send( msg )

    })

}


function isJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
}