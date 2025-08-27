import React, { useState, useEffect } from 'react';
import styles from './Main.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    comment: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Проверка валидности формы при изменении данных
    const isValid = 
      formData.name.trim() !== '' && 
      formData.phone.trim() !== '' && 
      errors.name === '' && 
      errors.phone === '' && 
      errors.comment === '';
    setIsFormValid(isValid);
  }, [formData, errors]);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Имя обязательно для заполнения';
        } else if (value.length > 50) {
          error = 'Имя не должно превышать 50 символов';
        } else if (!/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(value)) {
          error = 'Имя может содержать только буквы, пробелы и дефисы';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Телефон обязателен для заполнения';
        } else if (!/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/.test(value)) {
          error = 'Введите телефон в формате +7 (999) 999-99-99';
        }
        break;
      case 'comment':
        if (value.length > 500) {
          error = 'Комментарий не должен превышать 500 символов';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Форматирование телефона при вводе
    if (name === 'phone') {
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Валидация поля после изменения
    validateField(name, name === 'phone' ? formatPhoneNumber(value) : value);
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 1) return value;
    if (phoneNumberLength <= 1) return `+${phoneNumber}`;
    if (phoneNumberLength <= 4) return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1)}`;
    if (phoneNumberLength <= 7) return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
    if (phoneNumberLength <= 9) return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
    
    return `+${phoneNumber.slice(0, 1)} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверка всех полей перед отправкой
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });
    
    // Если есть ошибки, не отправляем форму
    if (Object.values(errors).some(error => error !== '')) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5252/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }

      const data = await response.json();
      console.log('Успешно отправлено:', data);
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        comment: ''
      });
    } catch (error) {
      console.error('Ошибка:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactOverlay}></div>
      <div className={styles.contactContent}>
        <h2>ОСТАВЬТЕ ЗАЯВКУ — МЫ СВЯЖЕМСЯ С ВАМИ</h2>
        <p className={styles.contactSubtitle}>
          Хотите узнать больше о планировках, ценах и записаться на просмотр домов в нашем поселке?
          Просто заполните форму — наш менеджер свяжется с вами в ближайшее время и ответит на все вопросы.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Введите Ваше имя"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={isSubmitting}
              maxLength={50}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone">Телефон</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+7 (999) 999-99-99"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={isSubmitting}
            />
            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="comment">Комментарий</label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Введите комментарий / вопрос"
              value={formData.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              disabled={isSubmitting}
              maxLength={500}
            />
            <div className={styles.charCounter}>
              {formData.comment.length}/500 символов
            </div>
            {errors.comment && <span className={styles.errorText}>{errors.comment}</span>}
          </div>
          
          <div className={styles.privacyPolicy}>
            <p>
              Нажимая на кнопку «Отправить заявку» вы соглашаетесь с 
              <a href="/privacy"> Политикой конфиденциальности</a>
            </p>
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </button>

          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              Спасибо! Ваша заявка успешно отправлена.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              Произошла ошибка при отправке. Пожалуйста, попробуйте позже.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;