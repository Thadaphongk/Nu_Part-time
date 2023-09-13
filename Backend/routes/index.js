const router = require('express').Router();
const { authenticated, isInRoles  } = require('../configs/security');
const { authenticatedowner, isInRolesowner  } = require('../configs/securityowner');

// สำหรับ เจ้าของร้าน route
router.use('/owner', require('./owner'));

// สำหรับ ผู้หางาน route
router.use('/account', require('./account'));
// Equipment route

// สำหรับ ผู้ใช้ทั่วไป   route
router.use('/jobshow', authenticated,require('./jobshow'));
router.use('/jobapp', require('./jobapp'));

// สำหรับ งาน route
router.use('/job', authenticatedowner, isInRolesowner(['owner']), require('./job'));


// สำหรับ การสมัครงาน route
router.use('/apply',authenticatedowner,require('./apply'));

module.exports = router;