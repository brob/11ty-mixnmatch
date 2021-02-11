const properlyOrderPosts = (postArrOne, postArrTwo) => [].concat(postArrOne, postArrTwo).sort((a, b )=> (a.date > b.date) ? -1 : 1);
export default properlyOrderPosts; 