const User = require('./user');
const BlogPost = require('./blogpost');
const Comment = require('./comment');

User.hasMany(BlogPost, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

BlogPost.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

BlogPost.hasMany(Comment, {
    foreignKey: "blog_post_id",
    onDelete: "CASCADE"
});

Comment.belongsTo(BlogPost, {
    foreignKey: "blog_post_id"
});

module.exports = {User, BlogPost, Comment};