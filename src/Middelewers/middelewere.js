const blogModel = require("../Models/blogModel")
const jwt = require("jsonwebtoken");

const authorisation=async function(req,res,next){

    let token= req.headers["x-api-key"]
  if(!token){
    res.status(400).send({msg:"token not present"})
  }
  let decodedToken = jwt.verify(token, "#group20");
  console.log(decodedToken.ID)
  
    blogId=req.params.blogId
  
    let blogdata= await blogModel.findOne({_id:blogId})

    console.log(blogdata.authorId)
     
       if(blogdata.authorId==decodedToken.ID) {
        next()}
        else{
          return res.status(403).send({status:false,msg:"not authorised"})
        }         
  }
  

  module.exports.authorisation=authorisation;


