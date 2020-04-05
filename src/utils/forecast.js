const request = require('request');

const forecast = (lat,long,callback) => {
    const url = `https://api.darksky.net/forecast/fef9c7578d4f17f9225535b691cc9f09/${lat},${long}?lang=el&units=si`;

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            // Low level error like no internet connection
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            // Error from server, like error with inputs
            callback(body.error, undefined);
        } else {
            let cw = body.currently;
            let temperature = cw.temperature;
            let rain_chance = cw.precipProbability;

            callback(undefined,`${body.daily.data[0].summary} Η θερμοκρασία είναι ${temperature} βαθμούς κελισίου. Υπάρχει ${rain_chance}% πιθανότητα βροχής`)
        }
    });
};

module.exports = forecast;