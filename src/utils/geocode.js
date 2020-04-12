const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?types=country&access_token=pk.eyJ1IjoibWFsaW5kdTg4IiwiYSI6ImNrOG5weWdzbDBzbG4zZnFjeDlkbXJ3amEifQ.NPz50CbZzjjX8bUKtu4t0g&limit=1';

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        } else {
            const locationText = 'Location found - ' + body.features[0].place_name

            callback(undefined, {
                latitude : body.features[0].center[0], 
                longitude : body.features[0].center[1], 
                location :  locationText
            })
        }
    })
}

module.exports = geoCode