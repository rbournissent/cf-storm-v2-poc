var express = require('express');
var router = express.Router();
var CloudFoundryApi = require('cloud-foundry');

var cfConfig = require('../config/cf.json');

router.get('/', function(req, res) {

    var api_endpoint = cfConfig.Target;
    var api_token = cfConfig.AccessToken.replace('bearer ', '');


    var cf_api = new CloudFoundryApi(api_endpoint, {
        token: api_token
    });

    cf_api.apps.list({},
        function(err, page) {
            if (err) {
                res.send(500, err);
                return console.log(err);
            }

            res.send(page.data);
        }
    );

});


module.exports = router;