// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:id", (req, res) => {
  let dateParameter = req.params.id
  if(!req.params.id){
    dateParameter = ""
  }
  const unixRegex = /\d{13}/
  const utcRegex = /\d{4}-\d{2}-\d{2}/
  console.log(unixRegex.test(dateParameter))
  if(!(unixRegex.test(dateParameter)) && !(utcRegex.test(dateParameter))){
    res.status(400).json({error: "Invalid Date"})
  } else if(utcRegex.test(dateParameter)){
    const date = new Date(dateParameter)
    const utcdate = date.toUTCString()
    const unixdate = date.getTime()
    res.status(200).json({unix: unixdate, utc: utcdate})
  } else if (unixRegex.test(dateParameter)) {
    const dateObject = new Date(Number(dateParameter))
    res.status(200).json({unix: dateParameter, utc: dateObject.toUTCString()})
  }
  
});

app.get("/api", (req, res) => {
  const date = new Date()
  const utcdate = date.toUTCString()
  const unixdate = date.getTime()
  res.status(200).json({unix: unixdate, utc: utcdate})
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
