var express = require('express');
var router = express.Router();
var CloudFoundryApi = require('cloud-foundry');

var request = require('request');
require('request').debug = true;


function hasRequiredHeaders(req) {
    return (!!req.headers['cf-api'] && !!req.headers['cf-token']);
}

function getOrganizations(req, res) {
    if (!hasRequiredHeaders(req)) {
        res.send(400, {
            'error': 'CF headers missing'
        });
    }

    console.log(req.headers['cf-api']);
    console.log(req.headers['cf-token']);

    var cf_api = new CloudFoundryApi(req.headers['cf-api'], {
        token: req.headers['cf-token']
    });

    cf_api.organizations.list({},
        function(err, page) {
            if (err) {
                res.send(401, {'error': 'Invalid Token'});
                return console.log(err);
            }

            res.send(page.data);
        }
    );
}

function getApps(req, res) {
    if (!hasRequiredHeaders(req)) {
        res.send(400, {
            'error': 'CF headers missing'
        });
    }

    var cf_api = new CloudFoundryApi(req.headers['cf-api'], {
        token: req.headers['cf-token']
    });

    cf_api.apps.list({},
        function(err, page) {
            if (err) {
                res.send(401, {'error': 'Invalid Token'});
                return console.log(err);
            }

            res.send(page.data);
        }
    );
}

function getSpaces(req, res) {
    if (!hasRequiredHeaders(req)) {
        res.send(400, {
            'error': 'CF headers missing'
        });
    }

    var cf_api = new CloudFoundryApi(req.headers['cf-api'], {
        token: req.headers['cf-token']
    });

    cf_api.spaces.list({},
        function(err, page) {
            if (err) {
                res.send(401, {'error': 'Invalid Token'});
                return console.log(err);
            }

            res.send(page.data);
        }
    );
}

function getInfo(req, res, callback) {
    var request_options = {
        method: 'GET',
        url: req.headers['cf-api'] + '/v2/info',
        json: true,
        headers: {
            'Accept': 'application/json'
        }
    };


    request.get(request_options, function(error, response, body) {
        if (!error) {
            callback(error, response, body);
        } else {
            console.warn("request error", response.statusCode, body);
            res.send(response.statusCode || 500, body);
        }

    });

}

function getToken(req, res) {
    console.log(req.headers['cf-api']);
    console.log(req.headers['cf-username']);
    console.log(req.headers['cf-password']);
    var get_info_response = getInfo(req, res, function(error, response, get_info_response) {
        var token_endpoint = get_info_response.token_endpoint;

        var req_data = {
            "username": req.headers['cf-username'],
            "password": req.headers['cf-password'],
            "client_id": 'app',
            "grant_type": 'password'
        };

        var request_options = {
            method: 'POST',
            url: token_endpoint + '/oauth/token',
            form: req_data,
            json: true,
            headers: {
                'Authorization': 'Basic Y2Y6',
                'Accept': 'application/json'
            }
        };


        request.post(request_options, function(error, response, body) {
            if (!error) {
                res.send(response.statusCode, body);
            } else {
                console.warn("request error", response.statusCode, body);
                res.send(response.statusCode || 500, body);
            }
        });
    });


}

router.get('/organizations', getOrganizations);
router.get('/spaces', getSpaces);
router.get('/apps', getApps);
router.get('/token', getToken);


module.exports = router;