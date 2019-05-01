const router = require('express').Router();
// const controller = require('./controller.js');
const controller = require('../database/mysql/controller.js');
// const controller = require('../database/postgres/controller.js');

router.route('/')
    .get(controller.getALL)
    .post(controller.post);
router.route('/:itemID')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete);

module.exports = router;
