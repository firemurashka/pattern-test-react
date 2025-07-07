import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartTestIntroSection = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/test');
  };

  return (
    <div>
      <div id="button-hipe-test"></div>
      <div className="trek" id="trek">
        <div className="trek__container">
          <div className="trek__body">
            <h2 className="trek__title">Перейти к тестированию</h2>
            <img src="/img/test-patterns/fairway-example.svg" alt="Пример фарватера" />
            <button id="trek-button" className="trek__button patterns-button patterns-button-primary" onClick={handleStart}>
              Пройти тест
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTestIntroSection;