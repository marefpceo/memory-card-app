import { useEffect, useState } from 'react';
import '../styles/App.css';
import Header from './Header';
import Card from './Card';

function App() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const shuffleCards = (inputArray) => {
    return inputArray
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  function gameOver() {
    if (bestScore < score) {
      setBestScore(score);
    }

    setScore(0);

    setData(
      data.map((card) => {
        return { ...card, checked: false };
      }),
    );
  }

  function handleClick(e) {
    const selectedTarget = e.target.parentElement.parentElement.id;
    const selectedId = selectedTarget.replace('card-', '');

    setData(
      shuffleCards(
        data.map((card) => {
          if (card.id.toString() === selectedId) {
            if (card.checked === true) {
              alert('Game Over');
              gameOver();
              return card;
            } else {
              setScore(score + 1);
              return { ...card, checked: true };
            }
          } else {
            return card;
          }
        }),
      ),
    );

    console.log(selectedId);
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
          checked: false,
        };
      }
      setData(shuffleCards(temp));
    }

    getData();
  }, []);

  console.log(data);

  return (
    <div className='container'>
      <Header bestScore={bestScore} score={score} />
      <div className='card-area'>
        {data.map((character) => {
          return (
            <Card
              handleClick={handleClick}
              key={character.id}
              id={character.id}
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
