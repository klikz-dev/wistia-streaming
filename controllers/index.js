const homeController = require('./home')
const videoController = require('./video')
const faqsController = require('./faqs')
const loginController = require('./login')
const authController = require('./auth')
const accountController = require('./account')

module.exports = {
  home: homeController.home,
  video: videoController.video,
  faqs: faqsController.faqs,
  login: loginController.login,
  auth: authController.auth,
  signout: authController.signout,
  myVideos: accountController.myVideos,
}
