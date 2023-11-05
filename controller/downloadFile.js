const downloadFileRouter = require('express').Router()
const bodyParser = require('body-parser')
const verifyToken = require('../middleware/authJWT')
const userFileModel = require('../models/userFileModel')
const fs = require('fs')
const path = require('path')
downloadFileRouter.use(bodyParser.urlencoded({ extended: false }));
downloadFileRouter.use(bodyParser.json());

downloadFileRouter.get('/', verifyToken, (req, res) => {
    const { filePath, fileName } = req.body

    userFileModel.find({
        fileName: fileName,
        path: filePath
    }).then((file) => {
        console.log(file[0]?.shared[0])
        console.log(req.user._id.toString())
        const filePath = path.join(__dirname, '../uploads', file[0]?.diskFileName)
        const name = `${fileName}.${file[0]?.extension}`
        if (file[0]?.permission === 'private' && file[0]?.userId !== req.user._id.toString()) {
            res.status(401).send('This file is private. You are not allowed to view this file.')
        } else if (file[0]?.permission === 'shared' && !file[0]?.shared[0].includes(req.user._id.toString())) {
            res.status(401).send('You are not authorised to view this file.')
        } else {
            if (fs.existsSync(filePath)) {
                res.status(200).download(filePath, name, (err) => {
                    if (err) {
                        res.status(500).send({ messgae: 'Error download file', err })
                    }
                })
            } else {
                res.status(404).send('File Not Found')
            }
        }
    }).catch((err) => {
        res.status(300).send('Something wrong with payload')
    })
})

module.exports = downloadFileRouter