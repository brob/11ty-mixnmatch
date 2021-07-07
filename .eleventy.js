const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const blocksToMd = require('@sanity/block-content-to-markdown')
require('dotenv').config()

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

    config.addNunjucksShortcode("getPost", async function(id) { 
        const sanityClient = require('./utils/sanityClient')
        sanityClient.config({token: process.env.SANITY_PREVIEW })

        const query = `*[_id == $postId]{
            ...,  
            body[]{
                ..., 
                asset->{
                ...,
                "_key": _id
                } 
            }
        } | order(_createdAt desc)`
        const params = {postId: id}
        console.log({params})
        const data = await sanityClient.fetch(query, params)
        console.log(data)
        return data 
    });


    config.addPlugin(EleventyServerlessBundlerPlugin, {
        name: "preview", // The serverless function name from your permalink object
        functionsDir: "./netlify/functions/",
        copy: ['utils/']
      });
}

function prepPost(data) {
    // Converts Portable Text to markdown
    data.body = blocksToMd(data.body,{serializers})
    // Adjusts where our date lives (for convenience)
    data.date = data.publishDate
    // Returns back to our main function
    return data
}

const serializers = {
    // Creates the code blocks how markdown and 11ty want them
    types: {
        code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
    }
}