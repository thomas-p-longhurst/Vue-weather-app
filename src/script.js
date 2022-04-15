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

            currWeather: undefined,

            forecasts: [],
            likelihoods: Array(40).fill('neutral'),

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

        toggle(ev) {
            let div = ev.currentTarget;
            let idx = div.getAttribute('data-index');
            let state = this.likelihoods[idx];
            if (state === 'neutral') {
                this.likelihoods[idx] = 'likely';
            } else if (state === 'likely') {
                this.likelihoods[idx] = 'unlikely';
            } else if (state === 'unlikely') {
                this.likelihoods[idx] = 'neutral';
            }
        },
    },

    computed: {
        neutral() {
            let c = 0;
            for (let i in this.forecasts) {
                if (this.likelihoods[i] === 'neutral') c ++;
            }
            return c;
        },

        likely() {
            let c = 0;
            for (let i in this.forecasts) {
                if (this.likelihoods[i] === 'likely') c ++;
            }
            return c;

        },

        unlikely() {
            let c = 0;
            for (let i in this.forecasts) {
                if (this.likelihoods[i] === 'unlikely') c ++;
            }
            return c;

        },
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