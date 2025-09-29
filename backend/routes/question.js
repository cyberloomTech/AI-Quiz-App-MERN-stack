const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// @route    GET api/question
// @desc     Get all histories
// @access   Public
router.get("/", async (req, res) => {
  try {
    let query = {};
    let quantity;
    if (req.query.category) query.category = req.query.category;
    if (req.query.quantity) quantity = req.query.quantity;
    if (req.query.mode) query.mode = req.query.mode;

    let questions = await Question.find(query);

    let object = [];
    for (let i = 0; i < quantity; i++) {
      let random = Math.floor(Math.random() * questions.length);
      let question = questions.splice(random, 1);
      object.push(question);
    }
    res.json(object);
  } catch (err) {
    res.status(400).json(err);
  }
});

// @route    POST api/question
// @desc     Add a new question
// @access   Private, Admin
router.post("/", async (req, res) => {
  try {
    const newQuestion = new Question({
      title: req.body.title,
      explanation: req.body.explanation,
      answer: req.body.answer,
      choices: req.body.choices,
      category: req.body.category,
      mode: req.body.mode
    })

    const question = await newQuestion.save();
    res.json(question);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// @route    PUT api/question/:id
// @desc     Add a new question
// @access   Private, Admin
router.put("/:id", async (req, res) => {
  try {
    let question = await Question.findById(req.params.id);

    question = {
      title: req.body.title,
      explanation: req.body.explanation,
      answer: req.body.answer,
      choices: req.body.choices,
      category: req.body.category,
      mode: req.body.mode
    }
    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (err) {
    return res.status(400).json(err);
  }
});

// @route    DELETE api/question/:id
// @desc     Delete a question
// @access   Private, Admin
router.delete("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    await question.remove();
    res.json({ msg: "Question removed" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;