const client = require('./client.cjs');

const createOwner = async(ownerName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO owners (name)
      VALUES ('${ownerName}')
      RETURNING *;
    `);

    return rows[0];
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createOwner
};