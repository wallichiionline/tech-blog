const router = require('express').Router();
const {BlogPost, User, Comment} = require('../models');

router.get("/", async (req,res) => {
    try{
        const blogpost = await BlogPost.findAll({
            include: [
                {
                    model: User, 
                    attributes: ["name"]
                },
                {
                    model: Comment, 
                    atrributes: ["conetnt", "date_created"],
                    include: [
                        {
                            model: User,
                            attributes: [["name", "commenterName"]]
                        }
                    ]
                }
            ]
        });
        console.log(blogpost);
        const blogPostDisplay = blogpost.map((bp) => bp.get ({plain: true}));

        res.render("homePage", {
            blogPostDisplay
        })
    }
    catch (err){
        console.log(err);
        res.status(418).json(err);

    }
});

module.exports = router;