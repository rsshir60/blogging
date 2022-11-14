const blogModel = require("../Models/blogModel")
const authorModel = require("../Models/authorModel")


function stringVerify(value) {
  if (typeof value !== "string" || value.length == 0) {
      return false
  }
  return true;
}
const createBlog = async function (req, res) {
    try {
      let data = req.body;
      if (Object.keys(data).length == 0) {
        return res.status(400).send({ msg: "Please Enter details" })
       }
      let { title, body, authorId, tags, category,subCategory, isPublished} = data

      if(!stringVerify(title)){
        return res.status(400).send({err:"Title is required"})
      }

      if(!stringVerify(body)){
        return res.status(400).send({err:"invailed body formet"})
      }
      if(!stringVerify(authorId)){
        return res.status(400).send({err:"authorID is required"})
      }
        let authid= await authorModel.findById(data.authorId)
    
      if(!authid){
        return res.status(400).send({err:"invalid authorid "})
      }
      
      if(!stringVerify(category)){
        return res.status(400).send({err:"category is required"})
      }
      

      if (typeof isPublished !== "boolean") {
        return res.status(400).send({ status: false, msg: "is Published input is needed" })
    }

    if (typeof (tags && subCategory) !== "object") {
      return res.status(400).send({ status: false, msg: "tags/subcategory should be in array of string only" })
  }

      let savedData = await blogModel.create(data);
      res.status(201).send({ msg: savedData });
      
    } catch (err) {
      console.log("this is the error :",err.message)
      res.status(500).send({msg: "Error", error: err.message})
    }
  
  };

  const getBlog = async function (req, res){
    try {
        let allblog =req.query
        let {authorId,category}=allblog
        
        let blogDetails =await blogModel.find({$and:[{isDeleted:false,isPublished:true},allblog]})
        if(blogDetails==0){
        return res.status(404).send({msg:"blog not found"})
        }
        else{
            res.status(200).send({data:blogDetails})
        }
    } catch (err) {
        console.log("this is the error :",err.message)
        res.status(500).send({msg: "Error", error: err.message})
      }
    
        
    }
  
  module.exports.createBlog= createBlog;
  module.exports.getBlog= getBlog;