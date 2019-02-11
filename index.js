var path = require('path');


var express = require('express')
var fileUpload = require('express-fileupload');
var app = express()
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var multer  = require('multer')
var upload = multer({ dest: '/home/ubuntu/upload_data' })

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hi tyler')
  console.log("root loaded");
})

app.post('/dee', upload.single('sampleFile'), function(req, res) {

	console.log(req.file);
  email = req.body.email;
  filename = "/upload/" + req.file.filename;
  argstring = ' "' + email + '" "' + filename + '"';
  res.send('submission received');
  const { exec } = require('child_process');
  exec('sudo docker run -i --rm -v /home/ubuntu/rcode:/code -v /home/ubuntu/upload_data:/upload rserver Rscript /code/deedive.R '+ argstring, {maxBuffer : 500 * 1024}, (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
//   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
  });
  email = req.body.email;
  argstring = '"' + email + '"';


});

app.post('/B', function(req, res) {
  artist = req.body.artist;
  email = req.body.email;
  discover = req.body.discover || 'off';
  argstring = ' "' + artist + '" "' + email + '" "' + discover +'"';
  const { exec } = require('child_process');
  exec('sudo docker run -i --rm -v /home/ubuntu/rcode:/code -v /home/ubuntu/rcode/artists:/home/ubuntu/artists rserver Rscript /code/lastFM.R '+ argstring, (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});
    res.set('Access-Control-Allow-Origin: *');
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/app', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


module.exports = app
