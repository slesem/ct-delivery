'use strict';
const delivery = require('../services/delivery');


class deliveryController {
    
    async estimateDelivery(req, res) {

        try {

            const $service = new delivery(req, res);
            const response = await $service.estimateDeliveryTime(req);
            // return json

        } catch (error) {

            // error status codes

        }


    };

};

module.exports = deliveryController;