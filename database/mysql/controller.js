const Listings = require('./model');

const controller = {
    getALL: (req, res) => {
      Listings.findAll({ limit: 20 })
        .then(data => res.status(200).send(data))
        .catch(err => {
          console.log(err);
          res.status(404).send('Could not retreive property');
        });
    },
    get: (req, res) => {
      const itemID = parseInt(req.params.itemID);
      Listings.findOne({ where: { itemID } })
        .then(data => res.status(200).json(data))
        .catch(err => {
          console.log(err);
          res.status(404).send('Could not retreive property');
        });
    },
    post: (req, res) => {
        Listings.create(req.body)
          .then((data => {
            res.status(201).send(data); 
          })).catch(err => {
            console.error(err);
          });
    
      },
      update: (req, res) => {
        const {itemID } = req.params;
        Listings.update( req.body, { where: {itemID} })
          .then( (data) => {
            res.status(202).send(data);
          }).catch( (err) => console.error(err) );
    
      },
      delete: (req, res) => {
        const { itemID } = req.params;
        console.log(itemID);
        Listings.destroy({ where: { itemID  } })
        .then( (data) => {
          res.status(200).send(`Destroy id ${itemID}`);
        }).catch( (err) => console.error(err) );
        // todo
        // res.send('hello from delete');
      },

  };
  
  module.exports = controller;