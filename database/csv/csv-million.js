var fs = require('fs');
var ws = fs.createWriteStream(__dirname + "/reservation.csv");
var listingGen = require('../dataGen.js');

function writeTenMillionTimes(writer, callback) {
  let i = 0;
  create();
  function create() {
    let ok = true;
    do {
      if( i === 0 ){
        writer.write('itemID,propertyId,owner,maxGuests,nightlyRate,avgRating,minStay,serviceFeeRate,recentViews,reviewsCount,daysSinceUpdated,popular,cleaningFee,taxRate\n');
      }
      i++;
      var data = Object.values(listingGen(i)).join(',') + '\n';
      if (i === 1e7) {
        // last time!
        writer.write(data, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data);
      }
    } while (i <= 1e7 && ok);
    if (i <= 1e7) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', create);
    }
  }
}

var startTime = (new Date).getTime();
writeTenMillionTimes(ws, () => {
  let endTime = new Date();
  console.log(`Total Elapsed Time: ${(endTime - startTime) / 1000} seconds`);
});

// mongoimport --db reservation --collection listings --type csv --headerline --file /Users/tracyyu/hrla28/SDC/Reservation-Checkout/database/csv/reservation.csv

// ./mongoimport -d reservation -c listings --type csv --headerline --file /Users/tracyyu/hrla28/SDC/Reservation-Checkout/database/csv/reservation.csv --numInsertionWorkers 8

// mysql -uusername root -ppassword '' --local-infile scrapping -e "LOAD DATA LOCAL INFILE '/Users/tracyyu/hrla28/SDC/Reservation-Checkout/database/csv/reservation.csv'  INTO TABLE reservations  FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'"

// mysqlimport -h localhost -u root -p --ignore-lines=1 --fields-terminated-by=, sdc reservations '/Users/tracyyu/hrla28/SDC/Reservation-Checkout/database/csv/reservation.csv'

// LOAD DATA INFILE '/Users/tracyyu/hrla28/SDC/Reservation-Checkout/database/csv/reservation.csv' INTO TABLE reservations FIELDS TERMINATED BY ',' LINES TERMINATED BY'\n' IGNORE 1 ROWS (itemID, propertyId,owner,maxGuests,nightlyRate,avgRating,minStay,serviceFeeRate,recentViews,reviewsCount,daysSinceUpdated,@popular,cleaningFee,taxRate) SET popular = (@popular = 'true');

// Create table if not exists reservations ( itemID INT, propertyId INT, owner TEXT, maxGuests INT, nightlyRate FLOAT, avgRating FLOAT, minStay INT, serviceFeeRate FLOAT, recentViews INT, reviewsCount INT, daysSinceUpdated INT, popular TINYINT, cleaningFee INT, taxRate FLOAT,  PRIMARY KEY (itemID) ) ENGINE=INNODB;