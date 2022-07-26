const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const {firstName, lastName, town, country, email, password} = req.body;

    bcrypt.hash(password, 10)
    .then(hash => {
        const user = new User({
            name: lastName,
            firstName: firstName,
            country: country,
            town: town,
            email: email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({message: 'New user added!'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({
        email: email
    })
    .then((user) => {
        if(!user){
            return res.status(400).json({message: "There's no such user"})
        }
        bcrypt.compare(password, user.password)
        .then(valid => {
            if(!valid){
               return res.status(400).json({error: 'Invalid password'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    "CODING IS BACK, MUSIC IS BACK, RUMBA IS BACK!",
                    {expiresIn: '24h'}
                )
            })
        })
        .catch(err => res.status(500).json({err}))
    })
    .catch(error => res.status(500).json({error}))
};

exports.logout = (req, res, next) => {
    req.logout()
    req.session.destroy();
    res.redirect('/login');
}