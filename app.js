var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var methodOverride = require("method-override");
var app = express();
var peopleControlador = require('./controllers/people.js');

// Middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
var router = express.Router();
// Index
router.get('/', function(req, res) {
    res.send("Welcom to api REST, nodejs&Mysql");
});
app.use(router);

// API routes GET
app.route('/people').get(peopleControlador.findAllPeople);
app.route('/people/:id').get(peopleControlador.findById);
app.route('/people').post(peopleControlador.create);

// Start server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});