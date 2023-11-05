const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const signup = (req, res) => {
    const user = new User({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        storageUsed: 0,
        createdAt: new Date()
    })

    user.save().then(data => {
        res.status(200).send({
            message: 'User created successfully'
        })
    }).catch(err => {
        res.status(500).send({
            message: err
        })
    })
    return
}

const signin = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            res.status(404).send({
                message: 'User not found'
            })
        }
        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!isPasswordValid) {
            res.status(401).send({
                accessToken: null,
                message: 'Invalid Password'
            })
        }
        const token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        })

        res.status(200).send({
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                email: user.email
            },
            message: 'User signed in successfully',
            accessToken: token
        })
    }).catch(err => {
        res.status(500).send({
            message: err
        })
        return
    })
}

module.exports = { signin, signup }