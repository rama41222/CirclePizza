var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')
var bluebird = require('bluebird')
var User = require('./models/User')
var jwt = require('jwt-simple')
// var jwt = require('./services/jwt')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var request = require('request')
var facebookAuth = require('./services/facebookAuth')
var createSendToken = require('./services/jwt')
var config = require('./services/config')
var distance = require('google-distance')
var Account = require('./models/Account')

distance.apiKey = config.GOOGLE_MAPS_DISTANCE_API_KEY

mongoose.Promise = bluebird


var app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

var strategyOptions = {usernameField: 'email'}
var loginStrategy = new LocalStrategy(strategyOptions , function (email, password, done) {
  User.findOne({email: email}, function(err, user) {
    if (err) return done(err)

    if(!user)
      return done(null, false, {message: 'User does not exist'})

    user.comparePasswords(password, function (err, isMatch) {
      if (err) return done(err)

        if(!isMatch)
          return done(null, false,{message: 'Wrong email/password'})

      return done(null, user)
    })
  })
})

var registerStrategy = new LocalStrategy(strategyOptions ,function (email, password,done) {

  User.findOne({email: email}, function(err, user) {
    if (err) return done(err)

    if (user)
      return done(null, false, {message: 'User already exist'})


    var newUser = new User({
      email: email,
      password: password
    });

    newUser.save(function (err) {
      done(null, newUser)
    })
  })
})

passport.use('local-register',registerStrategy)
passport.use('local-login',loginStrategy)

app.post('/login', passport.authenticate('local-login'),function(req, res, next) {
  createSendToken(req.user, res)
})

app.post('/register',passport.authenticate('local-register'), function(req, res) {
    createSendToken(req.user, res)
})
//0 - artificial
//1 - natural

app.get('/travels', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')
  res.status(200).send(travelHistory)

})

app.get('/balance', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')
  console.log(payload)
  Account.list().then(function (accountObj, err) {
    if(err) {
      return res.status(400).send()
    }
    res.status(200).send(accountObj)

  }).catch(function (e) {
    res.status(400).send(e.message)
  })
})

app.post('/balance', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')

  Account.getCount().then(function (count) {
    if (count <= 0) {
      var accObj = new Account()
      accObj.balance = req.body.balance

      accObj.save(function (err) {
        if (err) {
          return  res.status(400)
        }
        console.log(accObj)
        return res.status(200).send(accObj)
      })

    } else {
      Account.find({}).sort({ $natural: -1 }).limit(1).then(function (acc) {
        var oldBalance = acc[0].balance
        oldBalance = oldBalance + req.body.balance || 0
        acc[0].balance = oldBalance
        acc[0].save(function (err) {
          if (err) {
            return  res.status(400)
          }
          console.log(acc[0])
          return res.status(200).send(acc[0])
        })
      })
    }
  }).catch(function (e) {
    return  res.status(400).send(e.message)
  })
})


app.get('/wrappers', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')

  res.status(200).send(wrappers)
})

app.get('/notes', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')

  res.status(200).send(notes)
})


app.get('/orders', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')

  res.status(200).send(orders)
})


app.get('/locations', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')

  res.status(200).send(orders)
})


app.get('/ccs', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')

  res.status(200).send(ccs)
})

app.get('/cards', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')

  res.status(200).send(cards)
})

app.post('/cards', function (req, res) {

  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')

  res.status(200).send(cards)
})


app.get('/cards/:id', function (req, res) {
  console.log('sdsdsddsds')
  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')
  var card = filterIt(cards,req.params.id)
  res.status(200).send(card)
})


app.get('/ccs/:id', function (req, res) {
  console.log('sdsdsddsds')
  if(!req.headers.authorization) {
    return res.status(401).json({error:'You are not authorized'})
  }
  var token = req.headers.authorization.split(' ')[1]
  var payload = jwt.decode(token, 'shhhh')
  var specificCard = filterIt(ccs,req.params.id)
  res.status(200).send(specificCard)
})

function filterIt(cards, searchKey) {
  return cards.filter(function(v) {
    return v.id === searchKey; // Filter out the appropriate one
  })
}


app.post('/auth/google', function (req, res) {
  var url =  'https://www.googleapis.com/oauth2/v4/token'
  var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'
  var params = {
    client_id: req.body.clientId,
    redirect_uri: req.body.redirectUri,
    code: req.body.code,
    grant_type: 'authorization_code',
    client_secret: config.GOOGLE_SECRET
  }
  request.post(url, {json: true,form: params}, function (err, response, token) {
      var accessToken = token.access_token
    var headers = {
      Authorization: 'Bearer ' + accessToken
    }

    request.get({url: apiUrl, headers: headers, json: true}, function (err, response, profile) {
      console.log(profile)
      User.findOne({googleId: profile.sub}, function (err, foundUser) {
          if(foundUser){
            return createSendToken(foundUser, res)
          }

          var newUser = new User();
          newUser.googleId = profile.sub
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
})

app.post('/auth/facebook', facebookAuth)

mongoose.connect('mongodb://localhost/cards', { useMongoClient: true})

var server  = app.listen(9090, function () {
  console.log('Api listening on '+ server.address().port)
})

module.exports = app; // for testing






































































var cards = [
  {id:'1', name:'Naturalist', image:'http://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/9/7/9/RX-DK-AGX12004_natural-card_s3x4.jpg.rend.hgtvcom.1280.1707.suffix/1400956956111.jpeg', price:10.23 , type:'artificial'},
  {id:'2', name:'Wonders', image:'http://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/9/7/9/RX-DK-AGX12101_completed-card_s3x4.jpg.rend.hgtvcom.1280.1707.suffix/1400956850313.jpeg', price:10.23 , type:'artificial'},
  {id:'3', name:'Lorem Series', image:'http://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/9/7/8/RX-DK-AGX12003_leaf-cover_s3x4.jpg.rend.hgtvcom.1280.1707.suffix/1400956635381.jpeg', price:10.23 , type:'artificial'},
  {id:'4', name:'Wind', image:'https://i.pinimg.com/originals/c2/f5/75/c2f575e448241d63ecfa13abcb3db326.jpg', price:10.23 , type:'natural'},
  {id:'5', name:'Supernova', image:'https://i.pinimg.com/736x/3c/33/b2/3c33b2dffb4af5a2b8bfee50e7037465--artist-card-paper-cards.jpg', price:10.23 , type:'natural'},
  {id:'6', name:'Sparks', image:'https://i.pinimg.com/736x/0a/e1/a4/0ae1a499b666186ce87439209577a4cd.jpg', price:10.23 , type:'artificial'},
  {id:'7', name:'Wrgiht', image:'https://render.fineartamerica.com/images/rendered/medium/greeting-card/images-medium-5/together-veikko-suikkanen.jpg?&targetx=0&targety=-25&imagewidth=500&imageheight=751&modelwidth=500&modelheight=700&backgroundcolor=877435&orientation=1', price:10.23 , type:'natural'},

]

var ccs = [
  {id:'1', name:'Sampath', image:'http://missionmillion.weebly.com/uploads/1/1/2/2/11220133/4782418.jpg?205', price:10.23 , type:'artificial'},
  {id:'2', name:'HNB Visa', image:'https://www.hnb.net/images/img/hnb_cards_1.png', price:10.23 , type:'artificial'},
  {id:'3', name:'MBNA', image:'https://www.mbna.co.uk/uploads/content/allround-1005x645-v2.png', price:10.23 , type:'artificial'},
]


var wrappers = [
  {id:'1', name:'enamel', image:'http://www.sassandbelle.com/Images/Product/Default/xlarge/WRAP048.jpg', price:1.23 , type:'0'},
  {id:'2', name:'lux', image:'https://cdn.dotcomgiftshop.com/sites/dotcom.pleasetest.co.uk/files/25024%20%28swatch%29.jpg', price:2.23 , type:'0'},
  {id:'3', name:'lexicana', image:'https://cdn.dotcomgiftshop.com/sites/dotcom.pleasetest.co.uk/files/25394_1.jpg', price:3.23 , type:'0'},
  {id:'4', name:'forest', image:'https://thumb1.shutterstock.com/display_pic_with_logo/1445909/523867240/stock-vector-seamless-christmas-check-pattern-ideal-for-wrapping-paper-designs-523867240.jpg', price:1.23 , type:'1'},
  {id:'5', name:'Ch white', image:'http://www.thesho.co.uk/shop/267-large_default/wrapping-paper-day-of-the-dead.jpg', price:0.23 , type:'1'},
  {id:'6', name:'Recycled', image:'https://thumb9.shutterstock.com/display_pic_with_logo/2664289/485097958/stock-vector-vector-vintage-christmas-wrapping-paper-with-winter-sweaters-hats-and-scarf-festive-holiday-485097958.jpg', price:1.23 , type:'0'},
  {id:'7', name:'Emerals', image:'http://cdn.notonthehighstreet.com/system/product_images/images/001/262/026/original_animal-print-wrapping-paper.jpg', price:0.23 , type:'1'},
]

var notes = [
  {id: '1', title:'note1', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {id: '2', title:'note2', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {id: '3', title:'note3', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {id: '4', title:'note4', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {id: '5', title:'note5', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
  {id: '6', title:'note6', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},

]

var orders= [
  {id: '1',cardid:'11111', wrapperid:'11111', towhom:'Amal' , location:'5th floor, b402', locatdeliverytimeion:'Tue Nov 03 2017 1:52:45', totalprice: 200, qty:1},
  {id: '2',cardid:'22222', wrapperid:'22222', towhom:'Nimal' , location:'34, main street malmber', locatdeliverytimeion:'Fri Otc 03 2017 13:12:45', totalprice: 2100,  qty:10},
  {id: '3',cardid:'33333', wrapperid:'33333', towhom:'Sudheera' , location:'No 23, peradeniya rd, kandy', locatdeliverytimeion:'Sun Jan 03 2017 15:22:45', totalprice: 100,  qty:1},
  {id: '4',cardid:'44444', wrapperid:'44444', towhom:'Ashani' , location:'mainhall, kelani university', locatdeliverytimeion:'Mon Feb 03 2017 1:5:45', totalprice: 240, qty: 2},
  {id: '5',cardid:'55555', wrapperid:'55555', towhom:'Jane' , location:'-', locatdeliverytimeion:'Wed Aug 03 2017 13:12:45', totalprice: 300 , qty: 1},
  {id: '6',cardid:'66666', wrapperid:'66666', towhom:'Steph' , location:'pickup', locatdeliverytimeion:'Wed Dec 03 2017 17:52:45', totalprice: 242, qty:10},

]


var travelHistory = [
  {id: '1',cardid:'11111', from: 'Kandy', to:'Colombo', time:'Tue Nov 03 2017 1:52:45', totalprice: 320},
  {id: '2',cardid:'22222', from: 'Colombo', to:'Nuwaraeliya', time:'Fri Otc 03 2017 13:12:45', totalprice: 400},
  {id: '3',cardid:'33333', from: 'Galle', to:'Matara', time:'Sun Jan 03 2017 15:22:45', totalprice: 60},
  {id: '4',cardid:'44444', from: 'Kadawatha', to:'Colombo', time:'Mon Feb 03 2017 1:5:45', totalprice: 80},
  {id: '5',cardid:'55555', from: 'Kadawatha', to:'Matara', time:'Wed Aug 03 2017 13:12:45', totalprice: 600},
  {id: '6',cardid:'66666', from: 'Kadawatha', to:'Negambo', time:'Wed Dec 03 2017 17:52:45', totalprice: 150},

]
