// const createCsvWriter = require('csv-writer').createObjectCsvWriter;  
// var fs = require('fs');
// var csv = require("fast-csv"); 

// var csvStream = csv.createWriteStream({headers: true}),
//   writableStream = fs.createWriteStream("reservation.csv");

// var startTime = (new Date).getTime();

// writableStream.on("finish", function(){
//   let endTime = new Date();
//   console.log(`Total Elapsed Time: ${(endTime - startTime) / 1000} seconds`);
// });

// csvStream.pipe(writableStream);
// (async () => {
//     for (let i = 0; i < 10000001; i++) {
//       let reservationObj = listingGen(i);
  
//       if (i % 1000000 === 0) console.log(i);
  
//       if (!csvStream.write(reservationObj)) {
//         await new Promise(resolve => csvStream.once('drain', resolve));
//       }
//     }
//     csvStream.end();
//     console.log('Finished generating data');
//     console.log((new Date).getTime() - start);
//   })();

// const csvWriter = createCsvWriter({  
//   path: 'reservation.csv',
//   header: [
//     {id: 'propertyId', title: 'PropertyId'},
//     {id: 'owner', title: 'Owner'},
//     {id: 'maxGuests', title: 'MaxGuests'},
//     {id: 'nightlyRate', title: 'NightlyRate'},
//     {id: 'avgRating', title: 'AvgRating'},
//     {id: 'minStay', title: 'MinStay'},
//     {id: 'serviceFeeRate', title: 'ServiceFeeRate'},
//     {id: 'recentViews', title: 'RecentViews'},
//     {id: 'popular', title: 'Popular'},
//     {id: 'cleaningFee', title: 'CleaningFee'},
//     {id: 'taxRate', title: 'TaxRate'},
//     {id: 'reviewsCount', title: 'ReviewsCount'},
//     {id: 'daysSinceUpdated', title: 'DaysSinceUpdated'},
//   ]
// });



// csvWriter  
//   .writeRecords(data)
//   .then(()=> console.log('The CSV file was written successfully'));

var faker = require("faker");
var fs = require('fs');

var ten_million = 1000000;
var start = 1;
var stop = ten_million;

var startTime = (new Date).getTime();

const getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

for (var i = 1; i <= 10; i++){
  writeInfoData(start, stop);
  function writeInfoData(start, stop){
    var header = 'propertyId|owner|maxGuests|nightlyRate|avgRating|minStay|serviceFeeRate|recentViews|reviewsCount|reviewsCount|daysSinceUpdated|popular|cleaningFee|taxRate|\n';
    var data = header;
    for (var j = start; j <= stop; j++){
      if (j % 100000 === 0) { console.log('j: ', j) }

      var propertyId = j;
      var owner = faker.name.firstName();
      var maxGuests = getRandomIntInclusive(1, 10);
      var nightlyRate = maxGuests * (getRandomIntInclusive(0, 20) + 25);
      var avgRating = getRandomIntInclusive(0, 1) / 2 + 4.5;
      var minStay = getRandomIntInclusive(1, 4);
      var serviceFeeRate = getRandomIntInclusive(10, 15) / 100;
      var recentViews = getRandomIntInclusive(0, 600);
      var reviewsCount = getRandomIntInclusive(0, 25);
      var daysSinceUpdated = getRandomIntInclusive(0, 40);
      var popular = true;
      var cleaningFee = 0;
      var taxRate = 0;
      

      if (Math.random() >= 0.5) {
        popular = true;
      } else {
        popular = false;
      }

      if (Math.random() >= 0.5) {
        let cleaningVar = maxGuests * getRandomIntInclusive(10, 20);
        cleaningFee = cleaningVar;
      } else {
        cleaningFee = null;
      }

      if (Math.random() >= 0.5) {
        taxRate = getRandomIntInclusive(5, 10) / 100;
      } else {
        taxRate = null;
      }

      var csvString = `${propertyId}|${owner}|${maxGuests}|${nightlyRate}|${avgRating}|${minStay}|${serviceFeeRate}|${recentViews}|${reviewsCount}|${reviewsCount}|${daysSinceUpdated}|${popular}|${cleaningFee}|${taxRate}|\n`;
      data += csvString;
    }
    fs.writeFileSync(__dirname + `/data${i}.csv`, data);
  }

  start += ten_million;
  stop += ten_million;
};

let endTime = new Date();
  console.log(`Total Elapsed Time: ${(endTime - startTime) / 1000} seconds`);