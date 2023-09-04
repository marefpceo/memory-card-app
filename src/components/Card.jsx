import PropTypes from 'prop-types';
import '../styles/Card.css';

function Card({ name, image, id }) {
  return (
    <div className='card' id={'card-' + id}>
      <div className='card-image'>
        <img src={image} alt='' className='character-image' />
      </div>
      <div className='card-text'>
        <p className='character-name'>{name}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string,
};

export default Card;
