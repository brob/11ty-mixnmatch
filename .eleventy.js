
module.exports = function(config) {
    config.addPassthroughCopy("style.css");

    config.addCollection('posts', collection => {
        const posts = collection.getFilteredByTag('post');
        posts.forEach(item => {
            item.date = item.data.post ? new Date(item.data.post.date) : item.date
            console.log(item.date)
        })
        const sortedPosts = posts.sort((a, b) => b.date - a.date)
        return sortedPosts;
    });
}