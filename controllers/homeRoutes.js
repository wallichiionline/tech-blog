const router = require('express').Router();
const {BlogPost, User, Comment} = require('../models');
const confirmLogin = require('../utils/authenticate');

router.all('/signup', (req,res) => {
    if (req.session.logged_in){
        res.redirect('/homePage');
    }
    res.render('signup');
});

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
            blogPostDisplay,
            logged_in: req.session.logged_in,
            username: req.session.username,
        })
    }
    catch (err){
        console.log(err);
        res.status(418).json(err);

    }
});

router.all('/login', (req,res) => {
    if (req.session.logged_in){
        res.redirect('/homePage');
    }
    res.render('login');
});

router.get('/dashboard', confirmLogin, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ["password"]},
            include: [
                {
                    model: BlogPost,
                    include:[
                        {
                            model: Comment,
                            include: [User]
                        }
                    ]
                }
            ]
        })
        const userDisplay = user.get({ plain: true});
        console.log(userDisplay);
        res.render('dashboard', {
            ...userDisplay,
            logged_in: true
        });
    }
    catch (err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.get('/blogPost/:id', confirmLogin, async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"]
                },
                {
                    model: Comment,
                    include: [User]
                }
            ]
        });

        const blogPostDisplay = blogPost.get({plain: true});
        res.render('postpage', {
            ...blogPostDisplay,
            logged_in: req.session.logged_in,
            username: req.session.username
        });
    } catch (err){
        
    }
});

module.exports = router;