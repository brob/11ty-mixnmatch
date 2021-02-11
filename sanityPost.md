---js
{
    pagination: {
        data: "posts", // uses return of /_data/posts.js as data
        size: 1, // Creates a page for each post
        alias: "post", // Makes accessing data easier
        addAllPagesToCollections: true // Adds pages to Collections based on tags
    },
    tags: ['post'], // The tag for collections
    layout: "base.html", // Which layout?
    eleventyComputed: {
        title: data => data.post.title, // Post title from data
        description: data => data.post.description, // Post description from data
        permalink: data => `/posts/${data.post.slug.current}/index.html`, // Slug and permalink creation
    }
}
---

{{ post.body }}
