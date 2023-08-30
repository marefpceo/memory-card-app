import logo from '../assets/images/futurama-logo.png';
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className='logo'>
        <img src={logo} alt='' />
      </div>

      <div className='scoreboard'>
        <div className='score'>
          <p>Best Score:</p>
          <p>5</p>
        </div>
        <div className='score'>
          <p>Current Score:</p>
          <p>2</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
