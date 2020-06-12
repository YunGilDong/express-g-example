const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '192.168.1.74',
    user: 'dev',
    password: 'dev',
    database: 'sbrt_test',
    connectionLimit: 5
});


async function GetGroup() {
    let conn, rows;
    try {
      conn = await pool.getConnection();
      //const rows = await conn.query("SELECT 1 as val");
      rows = await conn.query("SELECT * from INT_GRP");
      console.log(rows[0]); //[ {val: 1}, meta: ... ]
    //   const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //   console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      console.log('return!!');
      return rows;
    }
  }

module.exports = {
    getGroup: GetGroup
}