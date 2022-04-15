// ip-api url: http://ip-api.com/json/209.221.40.226?fields=status,message,lat,lon
//      found from https://ip-api.com/docs/api:json#test
// current weather url: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// 5-day url: http://api.openweathermap.org/data/2.5/forecast?lat=40.6566&lon=-111.8907&appid=fdbb102c63cc5e52ea665a5e67aa8ed3&units=imperial
//      found from https://openweathermap.org/forecast5

let ipURL = "http://ip-api.com/json";
let ipArgs = "fields=status,message,lat,lon";

let weatherURL = "http://api.openweathermap.org/data/2.5/forecast";
let weatherKey = "fdbb102c63cc5e52ea665a5e67aa8ed3";

// let userIP = "192.168.0.1"
// let userLat, userLon;
// fetch(`${ipURL}/${userIP}?${ipArgs}`)
//     .then(r => r.json())
//     .then(json => {
//         if (json.status === "fail") {
//             console.log(json.message)
//         } else {
//             userLat = json.lat;
//             userLon = json.lon;
//             // Insert fetch for weather here
//         }
//     });
//
// data: {
//     states: ['neutral', 'neutral', ...],
//     ...
// },
//
// methods: {
//     forecastToggle(event) {
//         let idx = div.getAttribute('data-idx');
//         if (this.states[idx] === 'neutral') {
//             this.states[idx] = 'likely';
//         } else if (this.states[idx] === 'likely') {
//             this.states[idx] = 'unlikely';
//         } else if (this.states[idx] === 'unlikely') {
//             this.states[idx] = 'neutral';
//         }
//     }
// }

const app = Vue.createApp({
    data() {
        return {
            title: "My first app",
            description: "Joe mama",

            visible: true,

            todos: [
                {done: true, text: "Learn vue.js"},
                {done: false, text: "Get dinner"},
                {done: false, text: "Watch lectures"},
            ],

            lat: undefined,
            lon: undefined,
            error: undefined,
        };
    },

    methods: {
        toggle(ev) {
            let li = ev.currentTarget;
            let idx = li.getAttribute('data-index');
            this.todos[idx].done = !this.todos[idx].done;
        },

        pluralize(n) {
            return n == 1 ? '' : 's';
        },
    },

    computed: {
        remaining() {
            let c = 0;
            for (let i of this.todos) {
                if (!i.done) {
                    c ++;
                }
            }
            return c;
        },

        completed() {
            let d = 0;
            for (let i of this.todos) {
                if (i.done) {
                    d ++;
                }
            }
            return d;
        },
    },

    created() {
        fetch("http://ip-api.com/json/?fields=status,message,lat,lon")
            .then(r => r.json())
            .then(json => {
                this.lat = json.lat;
                this.lon = json.lon;
                return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${json.lat}&lon=${json.lon}&appid=fdbb102c63cc5e52ea665a5e67aa8ed3`)
            })
            .then(r => r.json())
            .then(json => {
                console.log(json);
            })
            .catch(err => this.error = err);
    },
});

const vm = app.mount('#my-app');