import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import "./../index.scss";

function Footer({ progress, handleNextClick, finalStep = false }) {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  const handleNext = () => {
    if (handleNextClick) {
      handleNextClick();
    } else {
      navigate('/next-page');
    }
  };

  return (
    <footer className="footer">
      <div className="progress_container">
        <div className={`progress_label ${finalStep ? 'final_step' : ''}`}>
          <span className="finish">Готово:</span> <span className="percent">{progress}%</span> <span className="awesome">{finalStep && 'Отлично. Последний шаг!'}</span>
        </div>
        <div className={`${finalStep ? 'progress_bar__final' : 'progress_bar'}`}>
          <div className="progress_fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      {!finalStep && (
        <div className="next_and_discount">
          <button className="next_button" onClick={handleNext}>
            Далее
          </button>
          <div className="footer_discount discount">
            <span>Ваша скидка: {state.discount}%</span>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;