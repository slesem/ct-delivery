'use strict';

const http = require('http');
const deliveryController = require('./controllers/delivery');

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

const server = http.createServer((req, res) => {

    if(req.url === '/delivery' && req.method === 'POST') {
        return PostDelivery(req, res);
    }

    res.write('Hello World!');
    res.end();
})

async function PostDelivery(req, res) {

    req 
    .on('data', () => { 

    }) 
    .on('end', () => { 
      
        console.log('req -> ', req)
    //   const delivery = new deliveryController();
    //   const response = await delivery.estimateDelivery(req, res);
      const response = { time: "23 mins" };
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(response))
    })
}

server.listen(port, error => {
    if (error) {
        return console.error(error);
    }

    console.log(`Server Listening on ${port}`)
});



