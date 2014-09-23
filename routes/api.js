var express = require('express');
var router = express.Router();
var CloudFoundryApi = require('cloud-foundry');

var cfConfig = require('../config/cf.json');

// https://github.com/ActiveState/cloud-foundry-client-js


var api_endpoint = cfConfig.Target;
var api_token = cfConfig.AccessToken.replace('bearer ', '');


var cf_api = new CloudFoundryApi(api_endpoint, {
    token: api_token
});


function getOrganizations(req, res) {
    cf_api.organizations.list({},
        function(err, page) {
            if (err) {
                res.send(500, err);
                return console.log(err);
            }

            res.send(page.data);
        }
    );
}

function getApps(req, res) {
    cf_api.apps.list({},
        function(err, page) {
            if (err) {
                res.send(500, err);
                return console.log(err);
            }

            res.send(page.data);
        }
    );
}

function getSpaces(req, res) {
    cf_api.spaces.list({},
        function(err, page) {
            if (err) {
                res.send(500, err);
                return console.log(err);
            }

            res.send(page.data);
        }
    );
}

router.get('/organizations', getOrganizations);
router.get('/spaces', getSpaces);
router.get('/apps', getApps);


module.exports = router;