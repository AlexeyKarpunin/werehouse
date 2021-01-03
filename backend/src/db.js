/**

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


for (let c = 0; c < 20; ++c) {
    const queries = [];

    queries.push("START TRANSACTION;")
    for (let i = 0; i < 100000; ++i) {
        const name = `a_${i}`;
        const birthYear = 1900 + Math.floor(Math.random() * 100);

        var sql = "INSERT INTO `animals` (name, birth_year) VALUES (?, ?);";
        var inserts = [name, birthYear];
        queries.push(mysql.format(sql, inserts));
    a
    queries.push("COMMIT;")

    connection.query(queries.join(' '), function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results.length);
    });
}


connection.end();

 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

const options = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'wherehouse',
  multipleStatements: true,
};

const pool = mysql.createPool(options);

const init = async () => {
  const conn = mysql.createConnection(Object.assign(options, {database: null}));
  // eslint-disable-next-line max-len
  const initQuery = fs.readFileSync(path.resolve(__dirname, './init.sql')).toString();
  const result = await conn.query(initQuery);
  conn.end();
  return result;
};

const query = (queries) => {
  return new Promise((resolve, reject) => {
    return pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      if (typeof queries === 'string') {
        connection.query(queries, (error, results, fields) => {
          if (error) reject(error);
          connection.release();
          resolve(results);
        });
      } else {
        connection.query(queries.join(' '), (error, results, fields) => {
          if (error) reject(error);
          connection.release();
          resolve(results);
        });
      }
    });
  });
};

const close = (callback) => pool.end(callback);

module.exports = {
  init,
  query,
  close,
};
