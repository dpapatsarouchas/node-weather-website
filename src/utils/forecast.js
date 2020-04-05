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
            let todayWeather = body.daily.data[1];
            let temperature = cw.temperature;
            let rain_chance = cw.precipProbability;
            let humidity = cw.humidity;
            let higherTemperature = todayWeather.temperatureHigh;
            let lowerTemperature = todayWeather.temperatureLow;

            callback(undefined,`${body.daily.data[0].summary} Η θερμοκρασία είναι ${temperature} βαθμοί κελισίου.
            Υψηλότερη θερμοκρασία ${higherTemperature} βαθμοί κελισίου.
            Χαμηλότερη θερμοκρασία ${lowerTemperature} βαθμοί κελισίου.
            Υπάρχει ${Math.round(rain_chance*100)}% πιθανότητα βροχής.
            Ποσοστό θερμοκρασίας ${humidity}.`)
        }
    });
};

const testForecast = (lat, long) => {
    const url = `https://api.darksky.net/forecast/fef9c7578d4f17f9225535b691cc9f09/${lat},${long}?lang=el&units=si`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            console.error(error);
        } else if (body.error) {
            console.error(body.error);
        } else {
            console.log(body.currently);
        }
    });
};

if (require.main === module) {
    testForecast('37.96667', '23.61667');
} else {
    module.exports = forecast;
}
