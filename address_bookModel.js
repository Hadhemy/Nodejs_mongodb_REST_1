var mongoose = require('mongoose');
// Setup schema
var address_bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     gender: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true
    },
     phoneNumber: {
        type: String,
        required: true
    },
     address: {
        type: String,
        required: true
    }
});
// Export address_book model
var Address_book = module.exports = mongoose.model('users', address_bookSchema);
module.exports.get = function (callback, limit) {
    Address_book.find(callback).limit(limit);
}