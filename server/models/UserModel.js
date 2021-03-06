'use strict';

var mysql = require('./db').mysql,
    pool = require('./db').pool;

function UserModel() {
    if (!(this instanceof UserModel)) {
        return new UserModel();
    }
}

UserModel.prototype.selectAll = function (criteria, options, callback) {
    var query = "SELECT * FROM USER_TB;";

    pool.query(query, function(err, result) {
        callback(err, result);
    });
};

UserModel.prototype.selectById = function (criteria, options, callback) {
    var sql = "SELECT USER_ID FROM USER_TB WHERE USER_ID=?";
    var inserts = [ criteria.ID ];
    sql = mysql.format(sql, inserts);

    pool.query(sql, function (err, result) {
        callback(err, result);
    });
};

UserModel.prototype.selectByName = function (criteria, options, callback) {
    var sql = "SELECT USER_NAME FROM USER_TB WHERE USER_NAME=?";
    var inserts = [ criteria.NAME ];
    sql = mysql.format(sql, inserts);

    pool.query(sql, function (err, result) {
        callback(err, result);
    });
};

UserModel.prototype.selectByUser = function (criteria, options, callback) {
    var sql = "SELECT USER_ID, USER_NAME FROM USER_TB WHERE USER_ID=? AND USER_PW=?";
    var inserts = [ criteria.ID, criteria.PW ];
    sql = mysql.format(sql, inserts);

    pool.query(sql, function (err, result) {
        callback(err, result);
    });
};

UserModel.prototype.insert = function (criteria, options, callback) {
    var sql = "INSERT INTO USER_TB (USER_ID,USER_PW,USER_NAME) VALUES (?,?,?);";
    var inserts = [ criteria.ID, criteria.PW, criteria.NAME ];
    sql = mysql.format(sql, inserts);

    pool.query(sql, function (err, result) {
       callback(err, result);
    });
};

UserModel.prototype.update = function (paramMap, callback) {

};

UserModel.prototype.remove = function (paramMap, callback) {

};

module.exports = UserModel;


