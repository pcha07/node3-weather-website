const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { query } = require('express');

const app = express();
const port = proccess.env.PORT || 3001

//define paths for express config
const public = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

//set up handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static dir to serve
app.use(express.static(public))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'prabh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'prabh c'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is help page',
        title: 'Help',
        name: 'Prabh chahal'
    })
})


app.get('/weather', (req,res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude,latitude,location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(longitude,latitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        errorMessage: 'article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: '404 error Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port);
})