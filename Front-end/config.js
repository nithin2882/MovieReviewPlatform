const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "root",
      password: "root",
      database: "reviewdb",
    },
    listPerPage: 10,
  };
  module.exports = config;