const { Quize } = require("../models/quiz");
const { Result } = require("../models/result");

const startQuize = async (req, res, next) => {
    try {

        const quize = await Quize.findById(req.params.id, { answers: 0, isPublish: 0, owner: 0, __v: 0, _id: 0 });

        if (!quize) return res.status(404).json({ message: 'quize not found' });
        res.send(quize)
    } catch (error) {
        next(error)
    }
}

const submitExam = async (req, res, next) => {
    try {
        const quizeId = req.body.quizeId;
        const quize = await Quize.findById(req.params.id, { answers: 1 });
        if (!quize) return res.status(404).json({ message: 'quize not found' });

        const attempted_answers = req.body.attempted_answers;
        const answers = quize.answers
        const questionsKeys = Object.keys(answers)

        const total = questionsKeys.length;
        let score = 0;
        for (let i = 0; i < total; i++) {
            let question_num = questionsKeys[i];
            if (answers[question_num] == attempted_answers[question_num]) {
                score = score + 1
            }
        }
        res.status(200).send({  total, score })


    } catch (error) {
        next(error)
    }
}

module.exports = {
    startQuize,
    submitExam
}