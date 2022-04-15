const ipURL = "http://ip-api.com/json?fields=status,message,country,regionName,city,lat,lon";
const weatherURL = "http://api.openweathermap.org/data/2.5"
const weatherAPIKey = "fdbb102c63cc5e52ea665a5e67aa8ed3";

const app = Vue.createApp({
    data() {
        return {
            country: undefined,
            region: undefined,
            city: undefined,
            lat: undefined,
            lon: undefined,

            // currWeather: {
            //     time: undefined,
            //     temp: undefined,
            //     high: undefined,
            //     low: undefined,
            //     description: undefined,
            //     humidity: undefined,
            //     pressure: undefined,
            // },

            currWeather: undefined,

            forecasts: [],

            err: undefined,
        }
    },

    methods: {
        getTime(json) {
            let d = new Date(json.dt * 1000);
            return d.toLocaleString();
        },
        digestResponse(json, currentConditions) {
            let r = {}

            if (currentConditions) {
                r.temp = `Currently ${json.main.temp}F`;
                r.high = `High ${json.main.temp_max}F`;
                r.low = `Low ${json.main.temp_min}F`;
            } else {
                r.temp = `Temperature ${json.main.temp}F`
            }
            r.desc = json.weather[0].description;
            r.humidity = `${json.main.humidity}% humidity`;
            r.pressure = `${json.main.pressure} hPa pressure`;

            return r;
        },
    },

    computed: {

    },

    created() {
        fetch(ipURL)
            .then(r => r.json())
            .then(json => {
                this.country = json.country;
                this.region = json.regionName;
                this.city = json.city;
                this.lat = json.lat;
                this.lon = json.lon;

                return fetch(`${weatherURL}/weather?lat=${json.lat}&lon=${json.lon}&appid=${weatherAPIKey}&units=imperial`);
            })
            .then(r => r.json())
            .then(json => {
                this.currWeather = json;

                return fetch(`${weatherURL}/forecast?lat=${this.lat}&lon=${this.lon}&appid=${weatherAPIKey}&units=imperial`);
            })
            .then(r => r.json())
            .then(json => {
                // Retrieve forecast data
                this.forecasts = json.list;
            })
            .catch(err => this.error = err);
    },
});

const vm = app.mount("#weather-app");