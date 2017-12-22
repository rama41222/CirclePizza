var request = require('request')
var  qs = require('querystring')
var createSendToken = require('./jwt')
var config = require('./config')
var User = require('../models/User')

module.exports = function (req, res) {
    var accessTokenUrl = 'https://graph.facebook.com/v2.10/oauth/access_token'
    var graphApiUrl = 'https://graph.facebook.com/me?'

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: config.FACEBOOK_SECRET,
        code: req.body.code
    }

    request.get({url: accessTokenUrl, qs: params}, function (err, response, accessToken) {
        var params = {
            access_token: JSON.parse(accessToken).access_token
        }
        request.get({ url: graphApiUrl,qs:params, json: true}, function (err, response, profile) {
            User.findOne({facebookId: profile.id}, function (err, existingUser) {
                if(existingUser) {
                    return createSendToken(existingUser, res)
                }
                var newUser = new User();
                newUser.facebookId = profile.id
                newUser.displayName = profile.name
                newUser.save(function (err) {

                    if(err){
                        return next(err)
                    }
                    createSendToken(newUser, res)

                })
            })
        })
    })
}