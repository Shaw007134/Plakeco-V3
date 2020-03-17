const express = require('express');
const compression = require('compression');
const app = new express();
const port = 10001;
app.use(compression());
app.use('/', express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile('/index.html');
});
var server = app.listen(port, function() {
  console.log(`App listening on ${port}`);
});
