var mongoose = require('mongoose')
var bluebird = require('bluebird')

mongoose.Promise = bluebird

var CardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    default: 'artificial'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

CardSchema.statics.list = function () {
  return this.find().populate('User').exec()
}

//{id:'1', name:'Naturalist', image:'http://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2010/9/7/9/RX-DK-AGX12004_natural-card_s3x4.jpg.rend.hgtvcom.1280.1707.suffix/1400956956111.jpeg', price:10.23 , type:'artificial'},


module.exports = mongoose.model('Card',CardSchema);
