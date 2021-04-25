
module.exports = function(config) {
    config.addPassthroughCopy("style.css");

    config.addCollection('posts', collection => {
        const posts = collection.getFilteredByTag('post');
        const postsWithUpdatedDates = posts.map(item => {
            item.date = item.data.post ? new Date(item.data.post.date) : item.date
            return item
        })
        const sortedPosts = postsWithUpdatedDates.sort((a, b) => b.date - a.date)
        return sortedPosts;
    });
}