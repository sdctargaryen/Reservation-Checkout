const Sequelize = require('sequelize');
const connection = require('./mysql-index');

const Model = connection.define(
    'Reservations',
    {
        itemID: {type: Sequelize.INTEGER, primaryKey: true, unique: true },
        propertyId: {type: Sequelize.INTEGER },
        owner:{type: Sequelize.STRING },
        maxGuests: {type: Sequelize.INTEGER },
        nightlyRate: {type: Sequelize.FLOAT },
        avgRating: {type: Sequelize.FLOAT },
        minStay: {type: Sequelize.INTEGER },
        serviceFeeRate: {type: Sequelize.FLOAT }, 
        recentViews: {type: Sequelize.INTEGER },
        reviewsCount: {type: Sequelize.INTEGER },
        daysSinceUpdated: {type: Sequelize.INTEGER },
        popular: {type: Sequelize.BOOLEAN },
        cleaningFee: {type: Sequelize.FLOAT },
        taxRate: {type: Sequelize.FLOAT }
    },
    { timestamps: false }
    // ,
// ), BookedDates = connection.define(
//     'BookedDates', 
//     {
//         userID: { type: Sequelize.INTEGER, unique: true },
//         numGuests: Sequelize.INTEGER,
//         bookedDate: [
//             {
//             days: Date,
//             price: Sequelize.INTEGER
//             }
//         ]
//     }
);

// Model.hasMany(BookedDates); // Will add userId to Task model
// BookedDates.belongsTo(Model); // Will also add userId to Task model

connection
    .sync()
    .then( () => { console.log('Synced with MYSQL Databse')})
    .catch( err => console.error(err));

module.exports = Model;

// Create table if not exists reservations (  propertyId INT, owner TEXT, maxGuests INT, nightlyRate FLOAT, avgRating FLOAT, minStay INT, serviceFeeRate FLOAT, recentViews INT, reviewsCount INT, daysSinceUpdated INT, popular TINYINT, cleaningFee INT, taxRate FLOAT,  PRIMARY KEY (propertyId) ) ENGINE=INNODB;