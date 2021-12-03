const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { query } = require('express');


const app = express();


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

// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidDAwNjY5OTUzIiwiYSI6ImNrd2gwemJlbjB1YmwycXFicDFlMmVhbmEifQ.3U0CNX_Zrk1oVkGLtVAoAw&limit=1';
//     request({url, json: true}, (error, {body}) => {
//         if(error) {
//             callback('unable to connect location services', undefined);
//         } else if(body.features.length === 0) {
//             callback('unable to find location. try another search', undefined)
//         } else {
//             callback(undefined, {
//                 latitiude: body.features[0].center[0],
//                 longitude: body.features[0].center[1],
//                 location: body.features[0].place_name
//             });
//         }
//     })

// }

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

app.listen(3001, () => {
    console.log('server is up on port 3001');
})