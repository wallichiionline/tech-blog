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
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const blogpost = await BlogPost.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!blogpost){
            res.status(400).json({message: "Could not find post ID"})
            return;
        }
        res.status(200).json();
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.put('/:id', async (req,res) => {
    try{
        const blogpost = await BlogPost.update(req.body, {
            where: {id: req.params.id}
        })
        if (!blogpost){
            res.status(404).json({message: "Post not found"});
            return;
        }
        res.status(200).json(blogpost);
    }
    catch(err){

    }
});

module.exports = router;