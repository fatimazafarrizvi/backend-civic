const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./Routes/user_routes')
const adminRoutes = require('./Routes/admin_routes')

//import url
let url = require('./url')
//create rest object
let app = express()
//set JSON as MIME type
app.use(bodyparser.json())
//client is not sending form data -> encoding JSON
app.use(bodyparser.urlencoded({ extended: false }))
//enable CORS -> Cross Origine Resource Sharing -> communication among various ports
app.use(cors())
mongoose.connect(url,{dbName : "sih"}).then(()=>{
    console.log("Connection successful")
},(errRes)=>{
    console.log("Connection Failed - ",errRes)
})

app.use('/user', userRoutes)
app.use('/admin', adminRoutes)

//create port
const port = process.env.PORT || 8080;
// assign port no
app.listen(port, () => {
    console.log('Server listening on port:', port);
});

