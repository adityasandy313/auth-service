const router = require('express').Router();
const {userController} = require('../controllers');


router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/logout').get(userController.logoutUser);
router.route('/validate').get(userController.validateUser);
module.exports = router;