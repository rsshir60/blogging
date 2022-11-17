const authorController= require("../Controlers/authorController");
const blogController= require("../Controlers/blogController");
const middController= require("../Middelewers/middelewere");
const express = require ("express")
const router = express.Router();

router.post('/createAuthor', authorController.createAuthor);

router.post('/createBlog',middController.middauth, blogController.createBlog);

router.get('/getBlog',middController.middauth, blogController.getBlog)

router.put('/updateBlog/:blogId',middController.middauth,middController.authForpath, blogController.updateBlog)

router.delete('/deleteBlogById/:blogId',middController.middauth,middController.authForpath, blogController.deleteBlog);

router.delete('/deleteByquery',middController.middauth, blogController.deleteByQuery);

router.post('/login',authorController.login)


module.exports = router;