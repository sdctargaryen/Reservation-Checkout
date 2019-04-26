var fs = require( "fs" );
var ndjson = require( "ndjson" );
const listingGen = require('../dataGenCalendar.js');

let writeStream = fs.createWriteStream(__dirname + '/reservation.ndjson');
var start = (new Date).getTime();
var total = 10000001;

// seeding data function --> ran into running async call to handle
(async () => {
  for (let i = 0; i < total; i++) {
    let reservationObj = listingGen(i);

    if (i % 1000000 === 0) console.log(i);

    if (!writeStream.write(ndjson.stringify(reservationObj) + '\n')) {
      await new Promise(resolve => writeStream.once('drain', resolve));
    }
  }
  writeStream.end();
  console.log('Finished generating data');
  console.log((new Date).getTime() - start);
})();
  
// writeStream.on('finished', () => {
//   writeStream.end();
//   console.log('Finished generating data');
//   console.log((new Date).getTime() - start);
// });