// Initialize express router
let router = require('express').Router();



// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to middelware'
    });
});




// Import address_book controller
var address_bookController = require('./address_bookController');
// address_book routes
router.route('/users')
    .get(address_bookController.index)
    .post(address_bookController.new);
router.route('/excel')
     .post(address_bookController.excel)
    

 router.route('/users/:user_id')
     .get(address_bookController.view)
     .patch(address_bookController.update)
     .put(address_bookController.update)
     .delete(address_bookController.delete);






// Export API routes
module.exports = router;