import { useEffect, useState } from 'react';
import '../styles/App.css';
import Header from './Header';
import Card from './Card';

function App() {
  const [data, setData] = useState([]);

  const shuffleCards = (inputArray) => {
    return inputArray
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  function handleClick() {
    setData(shuffleCards(data));
  }

  useEffect(() => {
    async function getData() {
      const resp = await fetch(
        'https://api.sampleapis.com/futurama/characters',
      );
      const json = await resp.json();
      const temp = [];

      for (let i = 0; i < 12; i++) {
        temp[i] = {
          fName: json[i].name.first,
          lName: json[i].name.last,
          image: json[i].images.main,
          id: json[i].id,
        };
      }
      setData(shuffleCards(temp));
    }

    getData();
  }, []);

  console.log(data);

  return (
    <div className='container'>
      <Header />
      <div className='card-area'>
        {data.map((character) => {
          return (
            <Card
              handleClick={handleClick}
              key={character.id}
              name={character.fName + ' ' + character.lName}
              image={character.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
