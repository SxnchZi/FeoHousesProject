import React from 'react';
import styles from './Main.module.css';
import { useNavigate } from 'react-router-dom';

const houses = [
  {
    id: 1,
    name: 'Дом 1',
    left: '14.23%',
    top: '35%',
    width: '18%',
    height: '10%'
  },
  {
    id: 2,
    name: 'Дом 2',
    left: '35.8%',
    top: '49.5%',
    width: '27%',
    height: '10%'
  }
];

const ApartmentSelectorSection = () => {
  const navigate = useNavigate();
  return (
    <section id="houses" className={styles.apartmentSelectorSection}>
      <h2>Выберите дом на плане</h2>
      <div className={styles.sitePlanWrapper}>
        <img
          src={require('./render1lend.JPG')}
          alt="План участка"
          className={styles.sitePlanImg}
        />
        {houses.map(house => (
          <button
            key={house.id}
            className={styles.houseOverlay}
            style={{
              left: house.left,
              top: house.top,
              width: house.width,
              height: house.height
            }}
            onClick={() => navigate(`/house/${house.id}`)}
            aria-label={house.name}
          >
            {house.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ApartmentSelectorSection;