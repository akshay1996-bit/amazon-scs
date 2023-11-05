const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const { signin, signup } = require('./controller/authController')
const { uploadFileRoute } = require('./controller/fileUploadController')
const downloadFileRouter = require('./controller/downloadFile')
const routes = require('express').Router()

const uri = "mongodb+srv://aghodke1996:akshay1996@cluster0.eamu0xy.mongodb.net/?retryWrites=true&w=majority";

const PORT = 3000

require('dotenv').config()

try {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('database connected')
}
catch (e) {
    console.log('something went wrong', e)
}
const app = express()
app.use(cors())
app.use(routes)
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());


routes.get('/', () => {
    console.log('welcome to amazon-scs')
})
routes.use('/file/upload', uploadFileRoute)
routes.use('/download',downloadFileRouter)
routes.post('/register', signup)
routes.post('/login', signin)
app.listen(PORT, () => {
    console.log('server running at port ' + PORT)
})