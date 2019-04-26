const Model = require('../index.js');
const chalk = require('chalk');
const fs = require('fs');
var ndjson = require( "ndjson" );
const mongoose = require('mongoose');
const through2 = require('through2');
//let fileStream =  fs.createReadStream("./reservation.ndjson");
// const Stream = require('stream');

var highWaterMark = 1024;

var startTime = (new Date).getTime();

var inputStream = fs.createReadStream(
  ( __dirname + "/reservation.ndjson" ),
  {highWaterMark: ( 1 * highWaterMark )}
);

const doStream = inputStream.pipe(
  through2(
    {
      highWaterMark: 1 * 1024
    },
    function handleWrite(chunk, encoding, done) {
      this.push(chunk, encoding);
      done();
    }
  )
);

var transformStream = doStream.pipe(
  ndjson.parse({highWaterMark: 10 })
);

const batchingStream = (function batchObjects(source) {
  let batchSize = 5;
  let batchBuffer = [];
  let batchingStream = source.pipe(
    through2.obj(
      function handleWrite(item, encoding, done) {
        batchBuffer.push(item);
        if (batchBuffer.length >= batchSize) {
          this.push(batchBuffer);
          batchBuffer = [];
        }
        done();
      },
      function handleFlush(done) {
        if (batchBuffer.length) {
          this.push(batchBuffer);
        }
        done();
      }
    )
  );

  return batchingStream;
})(transformStream);

const databaseStream = batchingStream.pipe(
  through2(
    {
      objectMode: true,
      highWaterMark: 10
    },
    function handleWrite(batch, encoding, done) {
      const promises = batch.map(function operator(item) {
        return writeToMongo(item);
      });
      Promise.all(promises).then(
        function handleResolve(results) {
          done(null, results);
        },
        function handleError(error) {
          done(error);
        }
      );
    }
  )
);

databaseStream.on('data', function(results) {
  // console.log(chalk.dim.italic('Batch completed.'));
});

databaseStream.on('end', function(results) {
  let endTime = new Date();
  console.log(`Total Elapsed Time: ${(endTime - startTime) / 1000} seconds`);
});

function pluckIds(batch) {
  var ids = batch.map(function operator(item) {
    return item.id;
  });

  return ids;
}

function writeToMongo(data) {
  return Model.collection.insertOne(data);
}

