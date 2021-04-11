'use strict';

const http = require('http');
const deliveryController = require('./controllers/delivery');
require('dotenv').config();

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

    if(req.url === '/delivery' && req.method === 'POST') {

        return PostDelivery(req, res);

    }

    res.write('Hello World!');
    res.end();
})

async function PostDelivery(req, res) {

    let body = '';

    req.on('data', (data) => { 
        
        body += data

        if (body.length > 1e6) { 
            req.connection.destroy();
        }

    }).on('end', async () => {

        const postData = JSON.parse(body);
        req.body = { ...postData };
        const delivery = new deliveryController();
        res.setHeader('Content-Type', 'application/json');
        await delivery.estimateTime(req, res);

    });
}

server.listen(port, error => {

    if (error) {

        return console.log(error);

    }

    console.log(`Server listening on ${port}`);

});



