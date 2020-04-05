const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dimitris Papatsarouchas'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dimitris Papatsarouchas'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: 'Dimitris Papatsarouchas'
    });
});

app.get('/weather', (req,res) => {
    const { address } = req.query

    if(!address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    let forcastError = null;
    let forcastLocation = null;
    let forcastResult = null;

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error
                })
            }

            return res.send({
                forecast: forecastdata,
                location,
                address
            })
        });
    });
});

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search);
    res.send(
        {
            products: []
        }
    )
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'help not found',
        name: 'Dimitris Papatsarouchas',
    });
});

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'My 404 page',
        name: 'Dimitris Papatsarouchas',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});