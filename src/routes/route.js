
const authorController = require("../Controlers/authorController");
const blogController = require("../Controlers/blogController");
const MW = require("../Middlewares/auth");
const express = require("express")
const router = express.Router();





router.post('/authors', authorController.createAuthor);

router.post('/blogs', MW.authenticate, blogController.createBlog);

router.get('/blogs', MW.authenticate, blogController.getBlog);

router.put("/blogs/:blogId", MW.authenticate, MW.authorise, blogController.updateBlog);

router.delete("/blogs/:blogId", MW.authenticate, MW.authorise, blogController.deleteBlogByPathParam);

router.delete("/blogs",MW.authenticate, blogController.deleteByQuery);

router.post("/login", authorController.loginAuthor);



router.all("/*", function (req, res) {
    try{
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
}catch(err){res.send(err.message)}
})


module.exports = router;


module.exports = router;