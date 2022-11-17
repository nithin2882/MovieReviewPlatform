const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM review LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function getReviewsbyMovie(movie){
  let querystr ="select m.*,r.review_rating,r.review_comments,u.user_name from movie m ,review r,user u "+
                 "where m.movie_id = r.movie_id and r.user_id = u.user_id and m.movie_id =" +movie.movie_id;
  console.log(querystr);
 
  const rows = await db.query(
    querystr
  );
  const data =rows;
 

  return {
    data

  }
}
async function create(review){
 // console.log(review)
  let querystr= "INSERT INTO review (movie_id, user_id, user_category, review_rating, review_comments) VALUES " + 
  "("+review.movie_id+","+review.user_id+",'"+review.user_category+"',"+review.review_rating+",'"+review.review_comments+"')"
  console.log(querystr)
  const result = await db.query(
   querystr
  );

  let message = 'Error in review';

  if (result.affectedRows) {
    message = 'reviewed successfully';
  }

  return {message};
}
module.exports = {
    getMultiple,
    create,
    getReviewsbyMovie
  }