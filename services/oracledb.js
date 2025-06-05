import oracledb from 'oracledb';
import { oracleSecrets } from './secrets.js';

const dbConfig = {
  user: oracleSecrets.user,
  password: oracleSecrets.password,
  connectString: oracleSecrets.connectString
};

async function getAllFromTable(tableName) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
        `SELECT * FROM ${tableName}`,
        [],
        {outFormat: oracledb.OUT_FORMAT_OBJECT}
    );
    return result.rows;
  } finally {
    if (connection) await connection.close();
  }
}

async function addToTable(tableName, data) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const keys = Object.keys(data);
    const values = Object.values(data);

    const columns = keys.map(k => `"${k}"`).join(', ');
    const bindVars = keys.map((_, i) => `:${i + 1}`).join(', ');

    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${bindVars})`;

    await connection.execute(sql, values, { autoCommit: true });
    return { success: true };
  } finally {
    if (connection) await connection.close();
  }
}

export default { getAllFromTable, addToTable };