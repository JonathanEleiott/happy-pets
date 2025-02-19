import { useEffect, useState } from 'react';

const App = () => {
  const [pets, setPets] = useState([]);
  
  useEffect(() => {
    const getPets = async() => {
      const response = await fetch('/api/v1/pets');
      const allPets = await response.json();
      setPets(allPets);
    }

    getPets();
  }, []);

  return (
    <>
      <h1>Happy Pets</h1>

      <ul>
      {
        pets.map((singlePet) => {
          console.log(singlePet);
          return <li key={singlePet.id}>{singlePet.name}</li>
        })
      }
      </ul>
     
    </>
  )
}

export default App
