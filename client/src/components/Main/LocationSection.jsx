import React from 'react';
import styles from './Main.module.css';

const LocationSection = () => {
  return (
    <section id="location" className={styles.locationSection}>
      <div className={styles.locationContent}>
        <h2>Идеальное расположение</h2>
        <div className={styles.mapContainer}>
          {/* Здесь будет карта */}
          <div className={styles.mapPlaceholder}>
            <p>Карта расположения поселка</p>
          </div>
        </div>
        <div className={styles.locationInfo}>
          <p>Всего 15 минут до центра города</p>
          <p>Рядом лесной массив и озеро</p>
          <p>Хорошая транспортная доступность</p>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;