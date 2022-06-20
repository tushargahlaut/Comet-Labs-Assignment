const { default: axios } = require("axios");
// const dotenv = require("dotenv");
// dotenv.config();
const sphereId = process.env.SPHERE_ID;
const sphereAPI = process.env.SPHERE_API;

//POST Request to add problem
const addProblems = async(req,res)=>{
    const { typeId, name, masterjudgeId,interactive } = req.body;
    let isInteractive = interactive.toLowerCase()=="True"?true:false;
   try {
    const result = await axios.post(`https://${sphereId}.problems.sphere-engine.com/api/v4/problems/access_token=${sphereAPI}`,{
        headers:{
            "Content-Type":"application/json",
            "access-token":sphereAPI
        },
        body:{
            
            "name":name,
            "typeId":parseInt(typeId),
            "masterjudgeId":parseInt(masterjudgeId),
            "interactive":isInteractive
        }
    })
    const data = await result.json();
    res.status(201).json({data,message:"Success"});
    
   } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
   }
}
  
  module.exports.addProblems=addProblems;

// Delete Request  

const deleteProblems = async(req,res)=>{
        const id = req.params.id;
        try {
            const result = await axios.delete(`https://${sphereId}.problems.sphere-engine.com/api/v4/problems/:${id}access_token=${sphereAPI}`,{
                headers:{
                    "access-token":sphereAPI
                }
            });
            const data = await result.json();
            res.status(200).json({message:"Success"})
        } catch (error) {
            res.status(400).json({message:"Delete Failed"});
        }
}

module.exports.deleteProblems = deleteProblems;

//Update Problems

const updateProblems = async(req,res)=>{
    const id = req.params.id;
    const { typeId, name, masterjudgeId,interactive } = req.body;
    let isInteractive = interactive.toLowerCase()=="True"?true:false;
    try {
        const result = await axios.put(`https://${sphereId}.problems.sphere-engine.com/api/v4/problems/:${id}access_token=${sphereAPI}`,{
            headers:{
                "Content-Type":"application/json",
            },
            body:{
                "name":name,
                "typeId":parseInt(typeId),
                "masterjudgeId":parseInt(masterjudgeId),
                "interactive":isInteractive
            }
        });
        const data = await result.json();
        res.status(200).json({message:"Success",data})
    } catch (error) {
        res.status(400).json({message:"Update Failed"});
    }
}

module.exports.updateProblems = updateProblems;

//POST route to add test cases

const addTestCase = async(req,res)=>{
    const id = req.params.id;
    const { input, output, timeLimit,active,judgeId } = req.body;
    let isActive = interactive.toLowerCase()=="True"?true:false;
   try {
    const result = await axios.post(`https://${sphereId}.problems.sphere-engine.com/api/v4/problems/:${id}?access_token=${sphereAPI}`,{
        headers:{
            "Content-Type":"application/json",
        },
        body:{
            
            "input":input,
            "output":output,
            "timeLimit":parseFloat(timeLimit),
            "judgeId":parseInt(judgeId),
            "active":isActive
        }
    })
    const data = await result.json();
    res.status(201).json({data,message:"Success"});
    
   } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
   }
}

module.exports.addTestCase = addTestCase;

//submit a solution



//check the solution on basis of submission id and return appropriate result

const checkSolution = async(req,res)=>{
    const id = req.params.id;
    try {
        const result = await awais.get(`https://${sphereId}.problems.sphere-engine.com/api/v4/submissions/:${id}?access_token=${sphereAPI}`);
         const data = await result.json();
        res.send(200).json(data);
        
    } catch (error) {
        res.send(500).json({message:"Something Went Wrong"});
    }
}


module.exports.checkSolution = checkSolution;