import PropTypes from 'prop-types';
import '../styles/Modal.css';

function Modal({ text, handleButtonClick }) {
  return (
    <div className='modal'>
      <div className='modal-main'>
        <div className='modal-text'>
          <p>{text}</p>
        </div>
        <button type='buttton' id='modal-button' onClick={handleButtonClick}>
          OK
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  text: PropTypes.string,
  handleButtonClick: PropTypes.func,
};

export default Modal;
