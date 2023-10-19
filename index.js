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

function isValidDate(dateString) {
  // First, check if the input is in a valid format (e.g., "YYYY-MM-DD")
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }

  // Attempt to create a Date object from the provided string
  const date = new Date(dateString);

  // Check if the Date object is valid and represents the same date
  // as the provided string
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === dateString;
}

app.get("/api/:date?", function(req, res) {
  const { date } = req.params;
  console.log('------',new Date(date))
  let newDate = new Date();
  if(date)
    newDate = new Date(parseInt(date));
  if(newDate == "Invalid Date") {
    res.json({ error : "Invalid Date" });
  } else {
    res.json({
      unix: newDate.getTime(),
      utc: newDate
    });
  }
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
