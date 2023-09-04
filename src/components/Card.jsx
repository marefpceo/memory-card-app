import '../styles/Card.css';
import amyWong from '../assets/images/AmyWong.png';

function Card({ name, image }) {
  return (
    <div className='card'>
      <div className='card-image'>
        <img src={amyWong || image} alt='' className='character-image' />
      </div>
      <div className='card-text'>
        <p className='character-name'>{'Fry' || name}</p>
      </div>
    </div>
  );
}

export default Card;
