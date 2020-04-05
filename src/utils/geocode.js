const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZHBhcGF0c2Fyb3VjaGFzIiwiYSI6ImNqdGRnOGZndTBrM3MzeXFkemRtN3ZoMGMifQ.sopUFdRdKzfc5A0TZVlG1w`;

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to geocode service', undefined);
        } else if(body.message) {
            callback(body.message, undefined);
        } else if(body.features.length === 0) {
            callback('Invalide location', undefined);
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;