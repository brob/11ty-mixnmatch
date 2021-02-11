# Mix and Match 11ty markdown files and Data files

This repository is a companion to a blog post where I cover starting with an 11ty markdown blog and connecting to a headless content platform (Sanity.io) and mixing those two data streams into one collection

## Get started

If you're following along with the blog post, you'll want to clone the repository and checkout the `start` branch.

```sh
git clone git@github.com:brob/11ty-mixnmatch.git
g checkout start 
```

Then run the following commands:

```sh
npm install
npm start
```


### What I did (Peter Tumulty)

I wrote a filter in the .eleventy.js file that will take in an array of all posts regardless of the sorts
and sort them by their date 

I write applying my filter directly to the loop that was interating over the posts in index.liquid. But, apparently liquid
doesn't like that https://github.com/11ty/eleventy/issues/504

Oh, I also refactored the sanityPosts.md file so that all posts regardless of post had the same base permalink /post/<insert-name-of-post>
