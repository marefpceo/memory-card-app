import PropTypes from 'prop-types';
import logo from '../assets/images/futurama-logo.png';
import '../styles/Header.css';

function Header({ bestScore, score }) {
  return (
    <header>
      <div className='logo'>
        <img src={logo} alt='' />
      </div>

      <div className='scoreboard'>
        <div className='score'>
          <p>Best Score:</p>
          <p>{bestScore}</p>
        </div>
        <div className='score'>
          <p>Current Score:</p>
          <p>{score}</p>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  bestScore: PropTypes.number,
  score: PropTypes.number,
};

export default Header;
