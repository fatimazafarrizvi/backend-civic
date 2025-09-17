const express = require('express')
const router = express.Router()
const user = require("../api/usersapi")

router.post("/user_all", user.userfind) //login
router.post("/user_insert", user.insert_user) //sign_up

module.exports = router
//