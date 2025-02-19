const client = require('./client.cjs');

const createPet = async(petName, petType, ownerId) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO pets (name, type, owner_id)
      VALUES ('${petName}', '${petType}', ${ownerId})
      RETURNING *;
    `);

    return rows[0];
  } catch(err) {
    console.log(err);
  }
}

const getPets = async() => {
  try {
    const { rows: pets } = await client.query(`
      SELECT * FROM pets;
    `);

    return pets;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createPet,
  getPets
}