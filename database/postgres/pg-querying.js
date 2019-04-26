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
        client.query("EXPLAIN ANALYZE SELECT * FROM tenk1 t1, tenk2 t2 WHERE t1.unique1 < 100 AND t1.unique2 = t2.unique ORDER BY t1.fivethous;")
            .then( () => {

            })
            .catch(e => {
                console.error('Error in adding data', e);
                client.end();
            });
    })
    .catch(e => {
        console.error('Error in adding data', e);
        client.end();
    });