'use strict';
const delivery = require('../services/delivery');


class deliveryController {

    constructor() {}
    
    async estimateTime(req, res) {

        try {

            const $delivery = new delivery();
            const response = await $delivery.estimateTime(req.body);
            res.end(JSON.stringify(response));

        } catch (error) {

            res.statusCode = 400;
            res.end(JSON.stringify({ error: error.message }));

        }


    };

};

module.exports = deliveryController;