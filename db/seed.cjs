const client = require('./client.cjs');
const { createOwner } = require('./owners.cjs');
const { createPet } = require('./pets.cjs');
const { createProduct } = require('./products.cjs');
const { createPetProduct } = require('./petsProducts.cjs');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS pets_products;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS pets;
      DROP TABLE IF EXISTS owners;
    `);
  } catch(err) {
    console.log(err);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE owners (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        type VARCHAR(20) NOT NULL,
        owner_id INTEGER REFERENCES owners(id)
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        type VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets_products (
        pets_id INTEGER REFERENCES pets(id),
        products_id INTEGER REFERENCES products(id),
        quantity INTEGER
      )
    `);
  } catch(err) {
    console.log(err);
  }
}

const syncAndSeed = async() => {
  console.log('CONNECTING TO THE DB');
  await client.connect();
  console.log('CONNECTED TO THE DB');

  console.log('DROPPING TABLES');
  await dropTables();
  console.log('TABLES DROPPED');

  console.log('CREATING TABLES');
  await createTables();
  console.log('TABLES CREATED');

  console.log('CREATING OWNERS');
  const frida = await createOwner('Frida');
  const bill = await createOwner('Bill');
  const lisa = await createOwner('Lisa');
  const jill = await createOwner('Jill');
  const kenny = await createOwner('Kenny');
  console.log('OWNERS CREATED');

  console.log('CREATING PETS');
  const chrissy = await createPet('chrissy', 'boxer', bill.id);
  const beago = await createPet('beago', 'beagle', bill.id);
  const floofer = await createPet('floofer', 'bunny', jill.id);
  const jelly = await createPet('jelly', 'jellyfish', kenny.id);
  const rufus = await createPet('rufus', 'horse', lisa.id);
  const flopsy = await createPet('flopsy', 'bunny', null);
  console.log('PETS CREATED');

  console.log('CREATING PRODUCTS');
  const brush = await createProduct('brush');
  const ball = await createProduct('ball');
  const saddle = await createProduct('saddle');
  const toy = await createProduct('toy');
  console.log('PRODUCTS CREATED');

  console.log('CREATING PET PRODUCT LINKS');
  await createPetProduct(chrissy.id, brush.id, 2);
  await createPetProduct(chrissy.id, ball.id, 6);
  await createPetProduct(rufus.id, saddle.id, 1);
  await createPetProduct(jelly.id, saddle.id, 1);
  await createPetProduct(floofer.id, saddle.id, 2);
  console.log('PET PRODUCT LINKS CREATED');

  await client.end();
  console.log('DISCONNECTED FROM THE DB');
}

syncAndSeed();