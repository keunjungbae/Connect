var https = require('https');
var fs = require('fs');

var credentials = {
    key: fs.readFileSync('/etc/letsencrypt/live/kb3335.itp.io/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/kb3335.itp.io/cert.pem')
  };


var express = require('express')
var multer = require('multer')
var path = require('path')

//set storage engine
var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
function checkFileType(file, cb){
    var filetypes = /jpeg|jpg|png|gif/;
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    var mimetype = filetypes.test(file.mimetype)
    if(extname && mimetype){
        return cb(null, true);
    } else{
        cb("Error, Images Only!")
    }
}

var upload = multer({
    storage: storage,
    limits: {fileSize: 2000000},
    fileFilter: function(req, file, cb){
        var filetypes = /jpeg|jpg|png|gif/;
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        var mimetype = filetypes.test(file.mimetype)
        if(extname && mimetype){
            return cb(null, true);
        }
        else{
            cb("Error, Images Only!")
        }
    }
}).single('sample_img')

var app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.get('/', (req, res) => res.render('index'))

app.post('/upload/', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg: err
            })
        }
        else{
            if(req.file == undefined){
                res.render('index', {
                    msg: 'Error, no file selected!'
                })
            }
            else{
                res.render('index', {
                    msg: "file uploaded",
                    file: `uploads/${req.file.filename}`
                })
            }
            
           
        }
    })
})



var httpsServer = https.createServer(credentials, app);

// Default HTTPS Port
httpsServer.listen(443);

// app.listen(80, function () {
//     console.log('Example app listening on port 80!');
//   });