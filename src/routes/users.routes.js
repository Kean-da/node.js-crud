const express               = require('express');
const router                = express.Router();
const UsersController       = require('../controllers/Users');
const authMiddleware        = require('../system/middlewares/Auth_Middleware');

router.get('/', UsersController.index);
router.post('/login', UsersController.process_login);
router.post('/register', UsersController.process_register);
router.post('/logout', UsersController.process_logOut);

router
  .route('/profile')
  .get(authMiddleware, UsersController.getUserProfile);

module.exports = router;