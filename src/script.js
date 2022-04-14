// ip-api url: http://ip-api.com/json/209.221.40.226?fields=status,message,lat,lon
//      found from https://ip-api.com/docs/api:json#test
// current weather url: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// 5-day url: http://api.openweathermap.org/data/2.5/forecast?lat=40.6566&lon=-111.8907&appid=fdbb102c63cc5e52ea665a5e67aa8ed3&units=imperial
//      found from https://openweathermap.org/forecast5

let ipURL = "http://ip-api.com/json";
let ipArgs = "fields=status,message,lat,lon";

let weatherURL = "http://api.openweathermap.org/data/2.5/forecast";
let weatherKey = "fdbb102c63cc5e52ea665a5e67aa8ed3";

let userIP = "192.168.0.1"
let userLat, userLon;
fetch(`${ipURL}/${userIP}?${ipArgs}`)
    .then(r => r.json())
    .then(json => {
        if (json.status === "fail") {
            console.log(json.message)
        } else {
            userLat = json.lat;
            userLon = json.lon;
        }
    });