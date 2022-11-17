const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM movie LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function getPublishedMovies(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM movie where movie_publish="true"`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};
  
    return {
      data,
      meta
    }
  }
  async function getReviewsbyMovie(){
    let querystr ="select m.*,r.review_rating,r.review_comments,r.user_category review_category,u.* from movie m ,review r,user u "+
                   "where m.movie_id = r.movie_id and r.user_id = u.user_id";
    console.log(querystr);
   
    const rows = await db.query(
      querystr
    );
    const data =rows;
   
  
    return {
      data
  
    }
  }
async function create(movie){
  //console.log(movie)
  let querystr= "INSERT INTO movie (movie_title, movie_year, movie_language, movie_genre, movie_publish) VALUES " + 
  "('"+movie.movie_title+"',"+movie.movie_year+",'"+movie.movie_language+"','"+movie.movie_genre+"','"+movie.movie_publish+"')"
  console.log(querystr)
  const result = await db.query(
   querystr
  );

  let message = 'Error in creating movie';

  if (result.affectedRows) {
    message = 'movie created successfully';
  }

  return {message};
}
async function update(movie){
  //console.log(movie)
  let querystr= "update movie set movie_title='" + movie.movie_title +"',movie_year = '"+ movie.movie_year+"', movie_language='"+ movie.movie_language +"', movie_genre ='"+ movie.movie_genre+"', movie_publish='"+movie.movie_publish+"' where movie_id=" + movie.movie_id
  console.log(querystr)
  const result = await db.query(
   querystr
  );

  let message = 'Error in creating movie';

  if (result.affectedRows) {
    message = 'movie created successfully';
  }

  return {message};
}
module.exports = {
    getMultiple,
    create,
    update,
    getPublishedMovies,
    getReviewsbyMovie
  }