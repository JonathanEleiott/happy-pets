const client = require('./client.cjs');

const createPetProduct = async(petId, productId, count) => {
  try {
    await client.query(`
      INSERT INTO pets_products (pets_id, products_id, quantity)
      VALUES (${petId}, ${productId}, ${count});
    `);
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createPetProduct
}