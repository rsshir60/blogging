const authorController= require("../Controlers/authorController");
const blogController= require("../Controlers/blogController");
const middController= require("../Middelewers/middelewere");
const express = require ("express")
const router = express.Router();

router.post('/createAuthor', authorController.createAuthor);

router.post('/createBlog', blogController.createBlog);

router.get('/getBlog', blogController.getBlog)

router.put('/updateBlog/:blogId', blogController.updateBlog)

router.delete('/deleteBlogById/:blogId',middController.authorisation, blogController.deleteBlog);

router.delete('/deleteByquery', blogController.deleteByQuery);

router.post('/login', blogController.login)

router.post('/midd', blogController.middauth)





module.exports = router;