var exec = require('child_process').execFile;
var COMMAND = 'ps';
var ARGS = ['-ef'];

function removeEmptyElements (arr) {
  return arr.filter(function(a){
    return a.trim() != '';
  });
}

function parse(stdout, cb) {
 var lines = stdout.toString();
 var arr = lines.split('\n');
 arr.pop();
 var headers = arr.shift().split(' ');
 headers = removeEmptyElements(headers);
 arr = arr.map(function(line){
  var lineElements = line.split(' ');
  lineElements = removeEmptyElements(lineElements);
  var obj = {};
  headers.forEach(function(key, index){
    obj[key] = lineElements[index];
  });
  return obj;
 });
 cb(null, arr);
}

module.exports = function(cb) {
  exec(process.env.COMMAND || COMMAND, ARGS, function(err, stdout, stderr){
    if (err)
      return cb(err);
    parse(stdout, cb);
  });
}
