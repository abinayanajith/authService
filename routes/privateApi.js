const router = require('express').Router();
const verify = require('./api_gaurd');

router.get('/',(req,res)=>{
    res.send('You have successfully accessed private api');
});

module.exports = router;