const express = require('express')
const router = express.Router()
const admin = require("../api/adminapi")

router.get("/admin_all", admin.adminfind) //login
router.post("/admin_insert", admin.insert_admin) //sign_up

module.exports = router
//