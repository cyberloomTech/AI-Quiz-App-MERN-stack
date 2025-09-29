const express = require("express");
const router = express.Router();
const History = require("../models/History");


// @route    GET api/history
// @desc     Get all histories
// @access   Public
router.get("/", async(req,res)=>{
  try{
    const allHistory = await History.find().sort({createdAt:-1});
    res.json(allHistory);
  }catch(err){
    res.status(400).json(err);
  }
});

// @route    POST api/history
// @desc     Record new history
// @access   Private
router.post("/", async(req,res)=> {
  const newRecord = new History({
    account: req.body.walletAddress,
    category: req.body.category,
    quantity: req.body.quantity,
    difficulty:req.body.difficulty,
    score: req.body.score
  })
  try{
    const record = await newRecord.save();
    res.json(record);
  }catch(err){
    return res.status(400).json(err);
  }
});

// @route    DELETE api/history
// @desc     Delete a history
// @access   Private
router.delete("/:id", async(req,res)=> {
  try{
    const record = await History.findById(req.params.id);

    await record.remove();
    res.json({msg:"Record removed"});
  }catch(err){
    return res.status(400).json(err);
  }
});

module.exports = router;