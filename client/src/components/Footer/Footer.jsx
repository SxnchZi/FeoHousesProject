import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Контакты</h3>
          <p>Телефон: +7 (123) 456-78-90</p>
          <p>Email: info@luxuryestate.ru</p>
          <p>Адрес: г. Москва, ул. Примерная, 123</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Застройщик</h3>
          <p>ООО "Люкс Строй"</p>
          <p>Лицензия №123456789</p>
          <p>Год основания: 2010</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Социальные сети</h3>
          <div className={styles.socialLinks}>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Telegram</a>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© 2023 Luxury Estate. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;