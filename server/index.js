const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const moment = require('moment');
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const cron = require('node-cron');
const hebrewDate = require("hebrew-date");
const axios = require('axios');



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/greeting', (req, res) => {

    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.end(`<h2>Server working !!!</h2>`);
});


console.log(hebrewDate(2022, 6, 20 ))
cron.schedule('* * * * *', function() {
    console.log('running a task every minute');

    axios.get(`${process.env.BACKEND_URL}/profiles?_sort=createdAt:DESC&_limit=10000`)
        .then(res => {

            res.data.forEach(profile => {
                let formatData = moment().format('MMM D YYYY');
                let deceaseDate = moment(profile.deceaseDate).format('MMM D YYYY');
                let currentDate = moment( formatData);
                let differenceBetweenDates = currentDate.diff(deceaseDate, 'days')

                if (profile.Cron_48h === false && ((differenceBetweenDates === 2) && (profile.Notify_48h === false))){

                    app.post('/api/messages', (req, res) => {
                        res.header('Content-Type', 'application/json');
                        client.messages
                            .create({
                                from: process.env.TWILIO_PHONE_NUMBER,
                                to: profile.phoneNumber,
                                body: `${profile.fullName} 7 day memorial will be on ${profile.pominkis[0].date}, at ${profile.pominkis[0].startTime}, at (${profile.pominkis[0].description}, ${profile.pominkis[0].location}, ${profile.pominkis[0].contactInfo})`
                            })
                            .then(() => {
                                res.send(JSON.stringify({ success: true }));
                            })
                            .catch(err => {
                                console.log(err);
                                res.send(JSON.stringify({ success: false }));
                            });
                    });

                    const indicators_48h = {
                        Cron_48h: true,
                        Notify_48h: true,
                    };

                    fetch(`${process.env.BACKEND_URL}/profiles/${profile.id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmI2YTRhM2E0NDNmMWExNDVjZjRkZCIsImlhdCI6MTYyMzA1ODI3NSwiZXhwIjoxNzQ5MjAyMjc1fQ.3r98ZU_0ImdYh1faPmHCEpMC4if8B1i7_U2npP7rzG8`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(indicators_48h)
                    }).then(res => {
                        console.log('Successfully subscribed!')
                    }).catch(err => {
                        console.log(err.message)
                    });


                }else if(profile.Cron_14d === false && ((differenceBetweenDates === 14) && (profile.Notify_14d === false))){
                    app.post('/api/messages', (req, res) => {

                        res.header('Content-Type', 'application/json');
                        client.messages
                            .create({
                                from: process.env.TWILIO_PHONE_NUMBER,
                                to: profile.phoneNumber,
                                body: `${profile.fullName} 30 day memorial will be on ${profile.pominkis[0].date}, at ${profile.pominkis[0].startTime}, at (${profile.pominkis[0].description}, ${profile.pominkis[0].location}, ${profile.pominkis[0].contactInfo})`
                            })
                            .then(() => {
                                res.send(JSON.stringify({ success: true }));
                            })
                            .catch(err => {
                                console.log(err);
                                res.send(JSON.stringify({ success: false }));
                            });
                    });

                    const indicators_14d = {
                        Cron_14d: true,
                        Notify_14d: true,
                    };

                    fetch(`${process.env.BACKEND_URL}/profiles/${profile.id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmI2YTRhM2E0NDNmMWExNDVjZjRkZCIsImlhdCI6MTYyMzA1ODI3NSwiZXhwIjoxNzQ5MjAyMjc1fQ.3r98ZU_0ImdYh1faPmHCEpMC4if8B1i7_U2npP7rzG8`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(indicators_14d)
                    }).then(res => {
                        console.log('Successfully subscribed!')
                    }).catch(err => {
                        console.log(err.message)
                    });
                }else if(profile.Cron_1y === false && ((differenceBetweenDates === 365) && (profile.Notify_1y === false))){
                    app.post('/api/messages', (req, res) => {

                        res.header('Content-Type', 'application/json');
                        client.messages
                            .create({
                                from: process.env.TWILIO_PHONE_NUMBER,
                                to: profile.phoneNumber,
                                body: `${profile.fullName}  1 year  memorial will be on ${profile.pominkis[0].date}, at ${profile.pominkis[0].startTime}, at (${profile.pominkis[0].description}, ${profile.pominkis[0].location}, ${profile.pominkis[0].contactInfo})`
                            })
                            .then(() => {
                                res.send(JSON.stringify({ success: true }));
                            })
                            .catch(err => {
                                console.log(err);
                                res.send(JSON.stringify({ success: false }));
                            });
                    });

                    const indicators_1y = {
                        Cron_1y: true,
                        Notify_1y: true,
                    };

                    fetch(`${process.env.BACKEND_URL}/profiles/${profile.id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmI2YTRhM2E0NDNmMWExNDVjZjRkZCIsImlhdCI6MTYyMzA1ODI3NSwiZXhwIjoxNzQ5MjAyMjc1fQ.3r98ZU_0ImdYh1faPmHCEpMC4if8B1i7_U2npP7rzG8`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(indicators_1y)
                    }).then(res => {
                        console.log('Successfully subscribed!')
                    }).catch(err => {
                        console.log(err.message)
                    });
                }
            })
        }).catch(err => {
        console.error(err)
    })



}, {
    timezone: 'America/New_York'
});





app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);