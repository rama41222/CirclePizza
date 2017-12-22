var mongoose = require('mongoose')
var bluebird = require('bluebird')
var bcrypt = require('bcrypt-nodejs')
mongoose.Promise = bluebird

var NoteSchema = mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  text: {
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})


NoteSchema.statics.list = function () {
  return this.find().populate('User').exec()
}

module.exports = mongoose.model('Note',NoteSchema);
//{id: '1', title:'note1', text:'lorem ipsum dolor init', towhom:'Test Subject' , location:'no non o', deliverytime:'Fri Nov 03 2017 15:52:45 GMT+0530 (+0530)'},
