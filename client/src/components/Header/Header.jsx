import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Header.module.css';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current) {
        setShowHeader(true); // Скролл вверх — показать
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowHeader(false); // Скролл вниз — скрыть
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокировка скролла при открытом меню
  /*useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);*/

  return (
    <header className={`${styles.header} ${!showHeader ? styles.hide : ''}`}>
      <div className={styles.headerContentGrid}>
        {/* Левая навигация или бургер */}
        <div className={styles.headerNavLeft}>
          <nav className={styles.desktopNav}>
            <a href="#about" className={styles.ha}>
              <button className={styles.hbuttons}>О поселке</button>
            </a>
            <a href="#location" className={styles.ha}>
              <button className={styles.hbuttons}>Расположение</button>
            </a>
            <a href="#houses" className={styles.ha}>
              <button className={styles.hbuttons}>Дома</button>
            </a>
          </nav>
          <button className={styles.burger} onClick={() => setMenuOpen(true)} aria-label="Открыть меню">
            <span></span><span></span><span></span>
          </button>
        </div>
        {/* Центр: лого и название */}
        <div className={styles.headerCenter}>
          <h1 className={styles.logo}>ЛУЧИ</h1>
        </div>
        {/* Правая навигация */}
        <div className={styles.headerNavRight}>
          <a href="#contact" className={styles.ha}>
            <button className={styles.hbuttons}>Контакты</button>
          </a>
        </div>
      </div>
      {/* Мобильное меню через портал */}
      {menuOpen && createPortal(
        <>
          <div className={styles.menuBackdrop} onClick={() => setMenuOpen(false)} />
          <nav className={styles.mobileMenu}>
            <button className={styles.menuClose} onClick={() => setMenuOpen(false)} aria-label="Закрыть меню">&times;</button>
            <div className={styles.menuLogo}>LUXURY ESTATE</div>
            <a href="#about" onClick={() => setMenuOpen(false)} className={styles.menuLink}>О поселке</a>
            <a href="#location" onClick={() => setMenuOpen(false)} className={styles.menuLink}>Расположение</a>
            <a href="#houses" onClick={() => setMenuOpen(false)} className={styles.menuLink}>Дома</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              <button className={styles.menuContactBtn}>Контакты</button>
            </a>
          </nav>
        </>,
        document.body
      )}
    </header>
  );
};

export default Header;