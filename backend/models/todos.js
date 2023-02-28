const pool = require('../db/pool');

const todos = {
  findAll: () =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.query('SELECT * FROM todos', (err, results) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
    }),
  findTodoById: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.query(
          'SELECT * FROM todos WHERE id = ?',
          [id],
          (err, results) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(results);
          }
        );
      });
    }),
  findByTask: (todo) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        const query = `SELECT * FROM todos WHERE task LIKE ?;`;
        connection.query(query, [todo.task], (err, results) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
    }),
  create: (todo) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(`INSERT INTO todos SET ?`, todo, (err, results) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });
    }),
  updateById: (id, todo) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          `UPDATE todos SET ? WHERE id = ?`,
          [todo, id],
          (err, results) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(results);
          }
        );
      });
    }),
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          `DELETE FROM todos WHERE id = ?`,
          [id],
          (err, results) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(results);
          }
        );
      });
    }),
};

module.exports = todos;
