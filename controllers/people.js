//Controladores
var sqlModel = require('../models/people.js');

function error(res, code) {
    switch (code) {
        case 502:
            res.status(code).jsonp({ status: code, error: 'internal error, contact with support!' });
            break;

        case 409:
            res.status(200).jsonp({ status: code, error: 'user already exists' });
            break;

        default:
            res.status(code).jsonp({ status: code, error: 'internal error, contact with support!' });
            break;
    }
}

//GET - Return all registers
exports.findAllPeople = function(req, res) {
    sqlModel.query('SELECT * FROM people', function(err, rows, fields) {
        if (err) {
            console.log('GET /people', err);
            error(res, 502);
        }
        res.status(200).jsonp(rows);
    });
};
//GET - Return a register with specified ID
exports.findById = function(req, res) {
    //sqlModel.connect();	
    sqlModel.query('SELECT * FROM people WHERE id =' + req.params.id, function(err, rows, fields) {
        if (err) {
            console.log('GET /people/:id', err);
            error(res, 502);
        }
        res.status(200).jsonp(rows);
    });
};
//POST - Return a message, receive body data, body.name
exports.create = function(req, res) {
    if (!req.body.fullname || !req.body.birth) {
        res.status(400).jsonp({ status: 400, error: 'incomplete data' });
    } else {
        console.log(req.body);
        sqlModel.query(`CALL SP_CreatePerson('${req.body.fullname}','${req.body.birth}',${req.body.parent})`, function(err, rows, fields) {
            if (err) {
                if (err.sqlState === '15023') {
                    error(res, 409);
                } else {
                    error(res, 502);
                }
                // console.log('POST /people', err);
            } else {
                console.log('aqui');
                res.status(201).jsonp({ status: 201 });
            }
        });
    }
};