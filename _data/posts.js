const blocksToMd = require('@sanity/block-content-to-markdown')
const sanityClient = require('../utils/sanityClient')
const query = `*[_type == "blog"] | order(_createdAt desc)`

module.exports = async function() {
    const data = await sanityClient.fetch(query)
    const preppedData = data.map(prepNewsletter);
    return preppedData
}



function prepNewsletter(data) {
    data.body = blocksToMd(data.body,{serializers})
    return data
}

const serializers = {
    types: {
        code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
    }
}