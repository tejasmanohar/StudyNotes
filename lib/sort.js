/*jslint node: true */
"use strict";

exports.byProp = function (propName, desc) {
  return function (a, b) {
    if (a[propName] < b[propName]) return desc ?  1 : -1
    if (a[propName] > b[propName]) return desc ? -1 :  1
    return 0
  }
}

/**
 * Sensical sort for chapter numbers
 */
var reChapter = /[^0-9]*([0-9]+)[^0-9]*/
exports.sortChapters = function (a, b) {
  a = Number(reChapter.exec(a.name)[1])
  b = Number(reChapter.exec(b.name)[1])
  if (a < b) return -1
  if (a > b) return 1
  return 0
}