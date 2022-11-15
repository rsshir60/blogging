const authorController= require("../Controlers/authorController");
const blogController= require("../Controlers/blogController");
const express = require ("express")
const router = express.Router();

router.post('/createAuthor', authorController.createAuthor);

router.post('/createBlog', blogController.createBlog);

router.get('/getBlog', blogController.getBlog)

router.delete('/deleteBlogById/:blogId', blogController.deleteBlog);

router.delete('/deleteByquery', blogController.deleteByQuery);


module.exports = router;