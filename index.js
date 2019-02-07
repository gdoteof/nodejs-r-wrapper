var path = require('path');


var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hi tyler')
  console.log("root loaded");
})

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
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/app', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


module.exports = app
