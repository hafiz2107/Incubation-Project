const express = require('express') 
const router = express.Router()
const userController = require('../controllers/userController')


router.route('/').post(userController.registerUser)
router.route('/login').post(userController.authUser)

router.route('/myapplications/:userId').get(userController.getUserApplications)

router.route('/createapplication').post(userController.createApplication)
router.route('/deleteapplication/:appId').delete(userController.deleteApplication)
module.exports = router