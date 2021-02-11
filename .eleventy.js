
module.exports = function(config) {
    config.addPassthroughCopy("style.css");

    config.addCollection('posts', collection => {
        return collection.getFilteredByTag('post').reverse();
    });

    // a filter that will take a list of all the posts no matter the source
    // and sort them by date
    config.addFilter("sortPostsByActualDate", arr => arr.sort((a, b) => a.date < b.date ? 1 : -1));

}