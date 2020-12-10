// Import address_book model
Address_book = require('./address_bookModel');
var json2xls = require('json2xls');
const filename = 'USERS.xlsx';
const fs = require('fs');



// Handle index actions
exports.index = function (req, res) {

    Address_book.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });

        const DATA=JSON.stringify(users)
        console.log(DATA)
           
    });
};


exports.excel = function(req,res){

    Address_book.get(function (err, users) {
        
        const data = JSON.stringify(users)
        const xldata = JSON.parse(data)
        //console.log(dataaa)
        res.send(xldata)

        var xls = json2xls(xldata);
        fs.writeFileSync(filename, xls, 'binary');
       
    });

}


// Handle create users actions
exports.new = function (req, res) {
    var User = new Address_book();
    
    User.name = req.body.name ;
    User.gender = req.body.gender;
    User.email = req.body.email;
    User.phoneNumber = req.body.phoneNumber;
    User.address = req.body.address;

    
// save the language and check for errors
    User.save(function (err) {
        if (err)
            res.json(err);
res.json({
            message: 'New user is created!',
            data: User
        });
        console.log("OKAY")
    });
};
// Handle view user with IDinfo
exports.view = function (req, res) {
    Address_book.findById(req.params.user_id, function (err, User) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: User
        });
        
        console.log("OKAY")

    });
};
// Handle update user info
exports.update = function (req, res) {
Address_book.findById(req.params.user_id, function (err, User) {
        if (err)
            res.send(err);
    User.name = req.body.name ;
    User.gender = req.body.gender;
    User.email = req.body.email;
    User.phoneNumber = req.body.phoneNumber;
    User.address = req.body.address;
        
// save the language and check for errors
        User.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'user info was updated',
                data: User
            });
            //console.log(User._id);

        });

    });
 };
// Handle delete user 
exports.delete = function (req, res) {
    Address_book.remove({
        _id: req.params.user_id
    }, function (err, language) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'User is deleted'
        });
        console.log("DELETING........")
    });
};