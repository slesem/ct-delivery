'use strict'

const https = require('https');

class Delivery {

    constructor() {}

    async estimateTime(body) {

        try {

            if (typeof body === 'undefined' || 
                typeof body.address === 'undefined' ||
                Object.keys(body).length === 0 ||
                body.address === '') {
                
                throw new Error('address not defined');

            }
            let kitchens = await this._getKitchens();
            kitchens = kitchens.filter((data) => data.kitchen_state === 'online');
    
            let promises = [];
            for(let i = 0; i < kitchens.length; i++) {

                promises.push(this._getDirections(kitchens[i], body));

            }
    
            let result = await Promise.all(promises);
    
            const minRoute = result.reduce((accumulator, currentObj) => {

                return (currentObj.routes[0].legs[0].distance.value < accumulator.routes[0].legs[0].distance.value) 
                    ? currentObj : accumulator;

            });
    
            const response = {
                name: minRoute.name,
                id: minRoute.id,
                delivery_time: minRoute.routes[0].legs[0].duration.text
            }
    
            return response;

        } catch (error) {

            throw error;

        }



    }

    async _getKitchens() {

        try {

            const options = {
                hostname: 'api.staging.clustertruck.com',
                port: 443,
                path: '/api/kitchens',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
    
            return await this.request(options);

        } catch (error) {

            throw error;

        }

    }

    async _getDirections(kitchen, body) {

        try {

            const lat = kitchen.location.lat;
            const lng = kitchen.location.lng;
            const encodedAddress = encodeURIComponent(body.address);
            const key = process.env.GOOGLE_API_KEY;
    
            const options = {
                hostname: 'maps.googleapis.com',
                port: 443,
                path: `/maps/api/directions/json?origin=${lat},${lng}&destination=${encodedAddress}&key=${key}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
    
            let response = await this.request(options);
            response = { ...response, id: kitchen.id, name: kitchen.name }
    
            return response;

        } catch (error) {

            throw error;

        }



    }

    request(options) {

        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                
                res.setEncoding('utf8');
                let body = '';
      
                res.on('data', (data) => {

                    body += data;

                });
      
                res.on('end', () => {

                    const bodyParse = JSON.parse(body);
                    resolve(bodyParse);

                });
            });

            req.on('error', (error) => {

                reject(error.message);

            });
            
            req.end();
      
        });

    }

}

module.exports = Delivery;