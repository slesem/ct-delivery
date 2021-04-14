'use strict';

const http = require('http');
const deliveryController = require('./controllers/delivery');
require('dotenv').config();

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

    if(req.url === '/delivery' && req.method === 'POST') {

        return postDelivery(req, res);

    }

    res.write('Hello World!');
    res.end();

});

function postDelivery(req, res) {

    let body = '';

    req.on('data', (data) => { 
        
        body += data

        if (body.length > 1e6) { 

            req.connection.destroy();

        }

    });
    
    req.on('end', () => {

        res.setHeader('Content-Type', 'application/json');

        if (body.length === 0) {

            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'body undefined' }));
            
        } else {

            const postData = JSON.parse(body)
            req.body = { ...postData };
            const delivery = new deliveryController();
            delivery.estimateTime(req, res);

        }

    });

};

server.listen(port, error => {

    if (error) {

        return console.log(error);

    }

    console.log(`Server listening on ${port}`);

});
