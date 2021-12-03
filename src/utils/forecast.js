const request = require('request');

const forecast = (lat,long,callBack) => {
    const url = 'http://api.weatherstack.com/current?access_key=6f12687c1806c541193b12f84aeb8330&query=' + long + ',' + lat +'&units=f'
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callBack('unable to access services', undefined);
        } else if(body.error) {
            callBack('unable to access location', undefined);
        } else {
            callBack(undefined,  body.current.weather_descriptions[0]+ ` it is currently ${body.current.temperature} degrees out. it feels like ${body.current.feelslike} degrees.there is a ${body.current.precip}% chance of rain`);
    }
})


}

module.exports = forecast