const blocksToMd = require('@sanity/block-content-to-markdown')
const sanityClient = require('../utils/sanityClient')
const query = `*[_type == "blog"] | order(_createdAt desc)`

module.exports = async function() {
    // Fetches data
    const data = await sanityClient.fetch(query)
    console.log(data.map(item => item._id))
    // Modifies the data to fit our needs
    const preppedData = data.map(prepPost)

    // returns this to the 11ty data cascade
    return preppedData
}



function prepPost(data) {
    // Converts Portable Text to markdown
    // data.body = blocksToMd(data.body,{serializers})
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