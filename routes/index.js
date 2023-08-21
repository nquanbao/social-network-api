const router = require('express').Router();
const apiRoute = require('./api');

router.use('/api', apiRoute);

router.use((req,res) => res.send('Wrong route!'));

module.exports = router;