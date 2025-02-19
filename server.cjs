const { getPets } = require('./db/pets.cjs');

const client = require('./db/client.cjs');
client.connect();

const express = require('express');
const app = express();

app.use(express.static('dist'));

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/dist/index.html`);
// });

app.get('/api/v1/pets', async(req, res) => {
  const allPets = await getPets();
  res.send(allPets);
});

// app.get('/api/v1/pets/:id', async(req, res) => {
//   const allPets = await getPets();
//   res.send(allPets);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { 
  console.log(`listening on PORT ${PORT}`)
});