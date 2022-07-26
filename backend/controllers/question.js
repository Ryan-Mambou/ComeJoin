const Question = require('../Models/Question');

exports.createQuestion = (req, res, next) => {
    const {lastName, firstName, country, town, email, topic, question, userId} = req.body;
    const questionObject = new Question({
        name: lastName,
        firstName: firstName,
        country: country,
        town: town,
        email: email,
        topic: topic,
        question: question,
        author: userId
    })
    questionObject.save()
    .then(() => res.status(201).json({message: 'Question Created!'}))
    .catch(error => res.status(500).json({error}))
}