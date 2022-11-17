const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getUser(user){
  let querystr="select * from user where user_name='"+user.user_name+"' and user_password='"+user.user_password+"'"
  //console.log(querystr)
  const rows = await db.query(
    querystr
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}
module.exports = {
    getUser
  }