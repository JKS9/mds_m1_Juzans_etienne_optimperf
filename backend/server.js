var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Task = require('./api/models/todoListModel'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
/* connect mongodb cluster atlas */
// mongoose.connect('mongodb+srv://JKS:root@cluster0-tgshq.gcp.mongodb.net/todographql?retryWrites=true&w=majority');

/* connect mongodb local */
mongoose.connect('mongodb://localhost:27018');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
