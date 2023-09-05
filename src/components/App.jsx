import { useEffect, useState } from 'react';
import '../styles/App.css';
import Header from './Header.jsx';
import Card from './Card.jsx';
import Modal from './Modal.jsx';
import { startGame, endGame } from './Data';

function App() {
  const [data, setData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState(startGame);
  const [toggle, setToggle] = useState(0);

  function handleButtonClick() {
    if (toggle === 0) {
      document.querySelector('.modal').style.display = 'none';
      document.querySelector('.card-area').style.display = 'grid';
      setToggle(1);
      setMessage(endGame);
    } else {
      document.querySelector('.modal').style.display = 'none';
    }
  }

  function shuffleCards(inputArray) {
    return inputArray
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  function gameOver() {
    document.querySelector('.modal').style.display = 'flex';
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

  function handleCardClick(e) {
    const selectedTarget = e.target.parentElement.parentElement.id;
    const selectedId = selectedTarget.replace('card-', '');
    let gamePlay = true;

    setData(
      shuffleCards(
        data.map((card) => {
          if (card.id.toString() === selectedId) {
            if (card.checked === true) {
              gamePlay = false;
              return;
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

    if (gamePlay === false) {
      gameOver();
    }
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

  return (
    <div className='container'>
      <Header bestScore={bestScore} score={score} />
      <Modal text={message} handleButtonClick={handleButtonClick} />
      <div className='card-area'>
        {data.map((character) => {
          return (
            <Card
              handleCardClick={handleCardClick}
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
