const router = require('express').Router();
const { BlogPost } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const blogpost = await BlogPost.create({
            title: req.body.title,
            blog_content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(blogpost);
    }
    catch (err){
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;