const router = require('express').Router();
const {BlogPost, Comment, User} = require('../../models');

router.post("/", async (req, res) => {
    try{
        const comment = await Comment.create({
            content: req.body.comment,
            blog_post_id: req.body.blogpostid,
            user_id: req.session.user_id
        });
        
        res.status(200).json(comment);
    }
    catch (err){
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;