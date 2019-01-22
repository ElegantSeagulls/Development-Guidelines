var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.all('*', (req, res, next) => {  
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-type');

  const whiteList = process.env.WHITELIST.split(',');

  if (whiteList.indexOf(req.ip) >= 0 || whiteList.indexOf(req.headers['x-forwarded-for']) >= 0) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Forbidden.' });
  }  
});

app.use(express.static(__dirname + '/')); 

app.listen(port);
console.log(`Server running on port ${port}`);