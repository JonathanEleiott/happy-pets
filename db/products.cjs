const client = require('./client.cjs');

const createProduct = async(productType) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO products (type)
      VALUES ('${productType}')
      RETURNING *;
    `);

    return rows[0];
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createProduct
}