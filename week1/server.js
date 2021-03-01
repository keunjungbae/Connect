//Express is a node module for building HTTP servers

var express= require('express');
var app = express();

//Tell Express to look in the "public" directory for any files. first.
app.use(express.static("public"));

//The default route of / and what to do!

app.get('/', function (req, res) {
    res.send('Hello World! Here is another change A small change!');
  });


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
  