const { Pool, Client } = require('pg');
var fs = require('fs');
var ndjson = require( "ndjson" );
var bluebird = require('bluebird');
var pgp = require('pg-promise')({
    promiseLib: bluebird
});

const client = new Client({
    user: 'tracyyu',
    host: '127.0.0.1',
    database: 'reservation',
    password: 'password',
    port: '5432'
});

client.connect()
    .then( () => {
        console.log('connected successfully');
        // console.log('drop database');
        // client.query("DROP DATABASE IF EXISTS reservation;")
        // .then( () => {
        //     console.log('create database');
        //     client.query("CREATE DATABASE reservation;")
        //     .then( () => { 
                console.log('drop table');
                client.query("DROP TABLE IF EXISTS reservations;")
                .then( () => {
                    console.log('create table');
                    client.query(`CREATE TABLE reservations(
                        itemID numeric PRIMARY KEY,
                        propertyId numeric, 
                        owner text, 
                        maxGuests numeric, 
                        nightlyRate numeric, 
                        avgRating numeric,
                        minStay numeric,
                        serviceFeeRate numeric,
                        recentViews numeric,
                        reviewsCount numeric,
                        daysSinceUpdated numeric,
                        popular boolean,
                        cleaningFee numeric,
                        taxRate numeric );`
                    )
                    .then( () => {
                        console.log('add data to table');
                        // fs.createReadStream('/Users/tracyyu/hrla28/SDC/Reservation-Checkout/database/streams/reservation.ndjson')
                        //     .pipe(ndjson.parse())
                        //     .on('data', function(obj) {
                        //         // obj is a javascript object
                        //         console.log(obj);
                        //     })
                        client.query(`COPY reservations FROM '/Users/tracyyu/hrla28/SDC/Reservation-Checkout/database/csv/reservation.csv' DELIMITER ',' CSV HEADER;`)
                        .then( () => {
                            console.log('add to database');
                            client.end();
                        })
                        .catch( e => {
                            console.error('Error in adding data', e);
                            client.end();
                        });
                    })
                    .catch(e => {
                        console.error('Error in adding data', e);
                        client.end();
                    });
                })
                .catch( e => {
                    console.error('Error in adding data', e);
                    client.end();
                });
            })
            .catch(e => {
                console.error('Error in adding data', e);
                client.end();
            });
    //     });
    // })
    // .catch( e => {
    //     console.error(e);
    //     client.end();
    // });



// client.query("CREATE DATABASE reservation;")
//     .then( () => { 
//         client.query("DROP TABLE IF EXISTS reservationsjson;")
//         .then()
//         .catch( e => console.error('Error in adding data', e));
//         client.query(`CREATE TABLE reservationsjson(
//                     propertyId integer PRIMARY KEY NOT NULL, 
//                     owner text NOT NULL, 
//                     maxGuests integer NOT NULL, 
//                     nightlyRate integer NOT NULL, 
//                     avgRating decimal NOT NULL,
//                     minStay integer NOT NULL,
//                     serviceFeeRate integer NOT NULL,
//                     recentViews integer NOT NULL,
//                     popular boolean NOT NULL,
//                     cleaningFee integer NOT NULL,
//                     taxRate integer NOT NULL,
//                     reviewsCount integer NOT NULL,
//                     daysSinceUpdated integer NOT NULL);`
//         );

//         client.query(`COPY reservationsjson FROM '/Users/tracyyu/hrla28/SDC/Reservation-Checkout/database/csv/reservation.csv';`)
//         .then( () => {
//             console.log('add to database');
//             client.end();
//         })
//         .catch( e => console.error('Error in adding data', e));
    // })
    // .catch( e => console.error(e))
    // .finally( () => client.end());

// const pool = new Pool({
//     user: 'tracyyu',
//     host: '127.0.0.1',
//     database: 'reservations',
//     password: '',
//     port: '5432'
// });

// pool.query("CREATE DATABASE Reservation;", (err, res) => {
//     console.log(err, res);

//     pool.query(`CREATE TABLE reservations(
//                 propertyId integer NOT NULL, 
//                 owner text NOT NULL, 
//                 maxGuests integer NOT NULL, 
//                 nightlyRate integer NOT NULL, 
//                 avgRating integer NOT NULL,
//                 minStay integer NOT NULL,
//                 serviceFeeRate integer NOT NULL,
//                 recentViews integer NOT NULL,
//                 popular boolean NOT NULL,
//                 cleaningFee integer NOT NULL,
//                 taxRate integer NOT NULL,
//                 reviewsCount integer NOT NULL,
//                 daysSinceUpdated integer NOT NULL,
//             )`, (err, res) => {
//         console.log(err, res);
//         pool.end();
//     });
// });

// // the pool with emit an error on behalf of any idle clients
// // it contains if a backend error or network partition happens
// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });
