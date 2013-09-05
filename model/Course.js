var model = require('./')
var mongoose = require('mongoose')
var plugin = require('./plugin')

var Course = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  desc: String,
  slug: model.SLUG_UNIQUE,
  examDate: Date
})

Course.index({ slug: 1 }, { unique: true })

Course.virtual('url').get(function() {
  return '/' + this.slug + '/'
})

Course.virtual('searchDesc').get(function () {
  return 'Course'
})

Course.methods.populateNotetypes = function (cb) {
  var course = this

  model.Notetype
    .find({ courseId: this._id })
    .sort('ordering')
    .exec(function (err, notetypes) {
      if (!err) course.notetypes = notetypes
      cb(err)
    })
}

Course.plugin(plugin.modifyDate)
Course.plugin(plugin.createDate)
Course.plugin(plugin.absoluteUrl)
Course.plugin(plugin.slug)

module.exports = mongoose.model('Course', Course)