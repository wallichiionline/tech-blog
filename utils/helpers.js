module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    is_my_post: (postCreator, loggedInUser) => {
        return postCreator == loggedInUser;
    },
};