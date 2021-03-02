
var express = require('express')
var app = express()
app.use(express.static('public'));


app.get('/', function (req, res) {
  var fileToSend = "index.html";

  res.sendFile(fileToSend, {root: './public'});

})


app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
