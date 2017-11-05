/* eslint-disable */

/**
 * Polyfill for ES2015 String `repeat` method
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 * @method
 * @param  {Integer} count An integer between 0 and +∞
 * @return {String} new string containing the specified number of copies
 *                  of the given string
 */
String.prototype.repeat = function(count) {
  'use strict';
  if (this == null) {
    throw new TypeError('can\'t convert ' + this + ' to object');
  }
  var str = '' + this;
  count = +count;
  if (count != count) {
    count = 0;
  }
  if (count < 0) {
    throw new RangeError('repeat count must be non-negative');
  }
  if (count == Infinity) {
    throw new RangeError('repeat count must be less than infinity');
  }
  count = Math.floor(count);
  if (str.length == 0 || count == 0) {
    return '';
  }
  // Ensuring count is a 31-bit integer allows us to heavily optimize the
  // main part. But anyway, most current (August 2014) browsers can't handle
  // strings 1 << 28 chars or longer, so:
  if (str.length * count >= 1 << 28) {
    throw new RangeError('repeat count must not overflow maximum string size');
  }
  var rpt = '';
  for (var i = 0; i < count; i++) {
    rpt += str;
  }
  return rpt;
}

/**
 * Pretty print object with tabs and multi-line
 * and send it to the `Logger.log`
 * @method prettyPrint
 * @param  {Object} obj Object to log
 * @param  {String} objName String to print in the 1st line
 * @param  {Integer} indent Number of tabs for identation
 * @return {String}
 */
function prettyPrint (obj, objName, indent) {
  var indent = indent || 1;
  var indentStr = '\t'.repeat(indent)
  var msg = '\t'.repeat(indent - 1) + (objName || '');

  if (obj && obj.hasOwnProperty) {
    msg = msg + '\n';
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] === 'object') {
          msg = msg + prettyPrint(
            obj[property],
            '[' + property + ']:',
            indent + 1
          );
        } else {
          msg = msg + indentStr +
          '[' + property + ']' + ': ' + obj[property] + '\n';
        }
      }
    }
  } else {
    return msg = msg + ' ' + obj + '\n';
  }
  return msg;
}
