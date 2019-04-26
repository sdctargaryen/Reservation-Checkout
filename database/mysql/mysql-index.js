const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('sdc', 'root', '', {
  host: 'localhost',
  database: 'sdc',
  dialect: 'mysql'
});

// // Option 2: Using a connection URI
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = sequelize;

  // Create index propertyId ON reservations (propertyId);

  