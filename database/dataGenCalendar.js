const data = [];
const faker = require('faker');

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

const listingGen = id => {
  let listing = {};

  listing.itemID = id;
  listing.propertyId = getRandomIntInclusive(1, 20000000);
  listing.owner = faker.name.firstName();
  listing.maxGuests = getRandomIntInclusive(1, 10);
  listing.nightlyRate = listing.maxGuests * (getRandomIntInclusive(0, 20) + 25);
  listing.avgRating = getRandomIntInclusive(0, 1) / 2 + 4.5;
  listing.minStay = getRandomIntInclusive(1, 4);
  listing.serviceFeeRate = getRandomIntInclusive(10, 15) / 100;
  listing.recentViews = getRandomIntInclusive(0, 600);
  listing.reviewsCount = getRandomIntInclusive(0, 25);
  listing.daysSinceUpdated = getRandomIntInclusive(0, 40);
  listing.daysBooked = [];

  if (Math.random() >= 0.5) {
    listing.popular = true;
  } else {
    listing.popular = false;
  }

  if (Math.random() >= 0.5) {
    let cleaningVar = listing.maxGuests * getRandomIntInclusive(10, 20);
    listing.cleaningFee = cleaningVar;
  } else {
    listing.cleaningFee = 0;
  }

  if (Math.random() >= 0.5) {
    listing.taxRate = getRandomIntInclusive(5, 10) / 100;
  } else {
    listing.taxRate = 0;
  }

  // creating bookedDate randomly
  var bookedDate = [];
  function randomDate(start, end) {
    let one = new Date( start.getTime() + Math.random() * (end.getTime() - start.getTime()) );
    if (one.getDay() === 0) {
      one = new Date(one.getTime() + 86400000);
    } else if (one.getDay() === 4) {
      one = new Date(one.getTime() - 86400000);
    }
    let two = new Date(one.getTime() + 86400000);
    let three = new Date(one.getTime() + 2*86400000);
    let four = new Date(one.getTime() + 3*86400000);
    return [one, two, three, four];
  }
  var userID = getRandomIntInclusive(1, 20000000);
  var numGuests = getRandomIntInclusive(1, listing.maxGuests);
  var timesBooked = 2 + Math.round(Math.random() * 4);
  var dateArr = [];
  var pricesArr = [];
  for (let k=0; k<timesBooked; k++) {
    dateArr.push(...randomDate(new Date("2019-4-13"), new Date("2019-8-10")));
    pricesArr = pricesArr.concat(Array.apply(null, Array(4)).map(function(){ return listing.nightlyRate+ getRandomIntInclusive(0, 40)}));
  }
  bookedDate = { days: [...new Set(dateArr)] , prices: pricesArr };
  // diff between later & tomorrow is 10454400000
  // console.log(new Intl.DateTimeFormat().format(tomorrow.setDate(tomorrow.getDate() + 1)))
  listing.daysBooked.push({ userID, numGuests, bookedDate });
  return listing;
};

// for (let i = 1; i <= 100; i -= -1) {
//   //gottem
//   data.push(listingGen(i));
//   console.log(i)
// }

module.exports = listingGen;
