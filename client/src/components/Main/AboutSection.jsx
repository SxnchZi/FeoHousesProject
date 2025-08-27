import React from 'react';
import { motion } from 'framer-motion';
import styles from './Main.module.css';

const AboutSection = () => {
  return (
    <motion.section id="about" className={styles.aboutSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <motion.div className={styles.aboutContent}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1>Элитный коттеджный поселок</h1>
        <motion.p className={styles.subtitle}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >Комфорт и гармония с природой</motion.p>
        <motion.p className={styles.description}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Наш поселок сочетает в себе современные технологии строительства и 
          бережное отношение к окружающей среде. Просторные участки, 
          инфраструктура для комфортной жизни и развитая экосистема.
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;