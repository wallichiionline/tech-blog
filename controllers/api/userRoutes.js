const router = require('express').Router();
const {User} = require('../../models');

router.post('/signup', async (req, res) => {
    try {
        const user = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            req.session.username = user.name;

            res.status(200).json(user);
        });
    }
    catch (err){
        console.log(err);
        res.status(400).json(err);
    }
});

router.post("/login", async (req,res) => {
    try {
        const user = await User.findOne({
            where: {email: req.body.email}
        });
        if (!user){
            console.log("");
            res.status(400).json({message: "Email not found in our database"})
            return;
        }
        const validPassword = await user.validatePassword(req.body.password);
        if (!validPassword){
            console.log("Incorrect password");
            res.status(400).json({message: "Incorrect password"});
            return;
        }
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            req.session.username = user.name;

            res.json({user: user, message: "Log-in successful!"});
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/logout', (req,res) => {
    req.session.destroy(() => {
        res.status(200).end();
    });
});

module.exports = router;