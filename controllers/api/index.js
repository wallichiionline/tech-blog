const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogpostRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
router.use("/blogposts", blogPostRoutes);
router.use("/comments", commentRoutes);

module.exports = router;