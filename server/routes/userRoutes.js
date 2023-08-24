const { registerUser, loginUser, currentUser, deleteUser, joinRoom } = require('../server/controllers/UserController')
const router = require('express').Router();

router.get('/currentUser', currentUser);
router.post('/user', registerUser);
router.post('/login', loginUser);

module.exports = router;

