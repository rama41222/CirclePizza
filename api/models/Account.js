var mongoose = require('mongoose')
var bluebird = require('bluebird')

mongoose.Promise = bluebird

var AccountSchema = mongoose.Schema({
  balance: {
    type: Number,
    required: true
  }
})

AccountSchema.statics.list = function () {
  return this.find().exec()
}

AccountSchema.statics.listOne = function () {
  return this.findOne().exec()
}

AccountSchema.statics.getCount = function () {
  return this.count({}).exec()
}

module.exports = mongoose.model('account',AccountSchema);
