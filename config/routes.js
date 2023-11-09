const express = require('express')
const controllers = require('../controllers')

const router = express.Router()

router.get('/', controllers.home)
router.get('/faq', controllers.faqs)
router.get('/login', controllers.login)
router.post('/auth', controllers.auth)
router.get('/signout', controllers.signout)
router.get('/account/videos', controllers.myVideos)
router.get(['/category/:categoryId', '/category/:categoryId/:videoId'], controllers.video)

module.exports = router
