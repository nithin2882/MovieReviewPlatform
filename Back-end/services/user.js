const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM user LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function create(user){
  //console.log(user)
  let querystr= "INSERT INTO user (user_name, user_emailid, user_password, user_category) VALUES " + 
  "('"+user.user_name+"','"+ user.user_emailid+"','"+ user.user_password+"','"+ user.user_category+"')"
  console.log(querystr)
  const result = await db.query(
   querystr
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'user created successfully';
  }

  return {message};
}
async function update(id, user){
  const result = await db.query(
    `UPDATE user 
    SET name="${user.user_name}", emailid=${user.user_emailid}, password=${user.user_password}, category=${user.user_category}, 
    WHERE id=${user_id}` 
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'user updated successfully';
  }

  return {message};
}
async function remove(id){
  const result = await db.query(
    `DELETE FROM user WHERE id=${user_id}`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'user deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}