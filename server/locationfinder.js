'use strict'
const request = require('request');

// here you match the data with the google API and check their location json api with your city and country name
// (note: in google it is locality instead of city)

function getUrl(location) {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCHPF4FxpMR4BXF3NZSz_aZE-ZIU7ypHCg`;
}



module.exports = {
    getCityAndCountry: (location, callback) => {
        let result = {
            country: 'unknown',
            city: 'unknown'
        };

        request(getUrl(location), function (error, response, body) {
            if (body) {
                body = JSON.parse(body);
                console.log(body.status);
                if(body.status == 'OK') {
                //logic to match with google api
                    let addresses = body.results[0].address_components;
                    addresses.forEach((address) => {
                        if(address.types.indexOf('country') >= 0) {
                            result.country = address.long_name;
                        }

                        if(address.types.indexOf('locality') >= 0) {
                            result.city = address.long_name;
                        }
                    });

                    console.log(result);
                }
            }
            callback(result);
        });
    }
}