const express = require("express");
const {addProblems,deleteProblems, updateProblems, addTestCase,submitSolution, checkSolution} = require("../controllers/problems.js");
const router = express.Router();

router.post("/addproblems", addProblems);
router.delete("/deleteproblem/:id",deleteProblems);
router.put("/updateproblems/:id",updateProblems);
router.post("addtestcase/:id",addTestCase);
router.post("/submitsolution",submitSolution);
router.get("/checksolution",checkSolution);

module.exports= router;