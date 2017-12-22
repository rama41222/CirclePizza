var mongoose = require('mongoose')
var bluebird = require('bluebird')
var bcrypt = require('bcrypt-nodejs')
mongoose.Promise = bluebird

var OrderSchema = mongoose.Schema({
  cid : {
    type: Schema.Types.ObjectId,
    ref: 'Card'
  },
  wid: {
    type: Schema.Types.ObjectId,
    ref: 'Wrapper'
  },
  towhom: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  locatdeliverytimeion: {
    type: Date,
    default: new Date()
  },
  totalprice: {
    type: Number,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    default: 1
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

OrderSchema.static.list = function () {
  return this.find().populate('User').populate('Wrapper').populate('Card').exec()
}

module.exports = mongoose.model('Order',OrderSchema);
