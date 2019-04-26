const Pool = require('pg').Pool
const pool = new Pool({
  user: 'tracyyu',
  host: '127.0.0.1',
  database: 'reservation',
  password: 'password',
  port: 5432,
})

const controller = {
    getALL: (req, res) => {
        Listings.findAll({ limit: 20 })
          .then(data => res.status(200).send(data))
          .catch(error => {
            console.log(error);
            res.status(404).send('Could not retreive property');
          });
      },
    get: (req, res) => {
        const itemID = parseInt(req.params.itemID);
        // const propertyId = parseInt(req.params.propertyId);
        pool.query('SELECT * FROM reservations WHERE itemID = $1', [itemID], (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).send(results.rows);
        })
    },
    post: (req, res) => {
        const { itemID, propertyId, owner, maxGuests, nightlyRate, 
                avgRating, minStay, serviceFeeRate, recentViews,
                popular, cleaningFee, taxRate, reviewsCount, daysSinceUpdated } = req.body;

        pool.query('INSERT INTO reservations (itemID, propertyId, owner, maxGuests, nightlyRate,avgRating, minStay, serviceFeeRate, recentViews, reviewsCount, daysSinceUpdated, popular, cleaningFee, taxRate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', 
            [itemID, propertyId, owner, maxGuests, nightlyRate, avgRating, minStay, serviceFeeRate, recentViews, reviewsCount, daysSinceUpdated, popular, cleaningFee, taxRate], 
                (error, result) => {
                    if (error) {
                        throw error;
                    }
                    res.status(201).send(`Property added with ID: ${itemID}`);
        })
      },
      update: (req, res) => {
        const itemID = parseInt(req.params.itemID);
        var query = updateProductByID(itemID, req.body);

        // Turn req.body into an array of values
        var colValues = Object.keys(req.body).map(function (key) {
          return req.body[key];
        });

        pool.query(query, colValues, (error, result) => {
          if (error) {
            throw error;
          }
          res.status(200).send(`Property added with ID: ${itemID}`);
        });
      },
      delete: (req, res) => {
        const itemID = parseInt(req.params.itemID);

        pool.query('DELETE FROM reservations WHERE itemID = $1', [itemID], (error, results) => {
            if (error) {
            throw error;
            }
            res.status(200).send(`User deleted with ID: ${itemID}`);
        })
      },

  };
  
  function updateProductByID (id, cols) {
    // Setup static beginning of query
    var query = ['UPDATE reservations'];
    query.push('SET');
  
    // Create another array storing each set command
    // and assigning a number value for parameterized query
    var set = [];
    Object.keys(cols).forEach(function (key, i) {
      set.push(key + ' = ($' + (i + 1) + ')'); 
    });
    query.push(set.join(', '));
  
    // Add the WHERE statement to look up by id
    query.push('WHERE itemID = ' + id );
  
    // Return a complete query string
    return query.join(' ');
  }

  module.exports = controller;