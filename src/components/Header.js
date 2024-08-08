import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './../index.scss';
import SidebarPopup from './../components/SidebarPopup';

function Header({ showPopup = true, isHomePage = false }) {
  const { resetState } = useContext(AppContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const hambRef = useRef(null);

  const handleLogoClick = () => {
    resetState();
  };

  const togglePopup = () => {
    const newState = !isPopupOpen;
    setIsPopupOpen(newState);
    document.body.classList.toggle('noscroll', newState);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.classList.remove('noscroll');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) &&
          hambRef.current && !hambRef.current.contains(event.target)) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <header className={`header ${isHomePage ? 'header_homepage' : ''}`}>
      <div className="container">
        <div className="navbar__wrap">
          <Link to="/" onClick={handleLogoClick}>
            <img src="/img/logo1.png" alt="logo" className="logo" loading="lazy"/>
          </Link>
        </div>
      </div>
      {showPopup && (
        <>
          <div className={`hamb ${isPopupOpen ? 'open' : ''}`} onClick={togglePopup} ref={hambRef}>
            <div className="hamb__field" id="hamb">
              <span className="hamb_title">Услуги</span>
            </div>
          </div>
          {isPopupOpen && <div className="overlay" onClick={closePopup}></div>}
          <div className={`popup ${isPopupOpen ? 'open' : ''}`} id="popup" ref={popupRef}>
            <SidebarPopup closePopup={closePopup} className='sidebar_popup' />
          </div>
        </>
      )}
    </header>
  );
}

export default Header;