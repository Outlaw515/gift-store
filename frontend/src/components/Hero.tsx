import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-text">
        <h2>{t('hero.title')}</h2>
        <p>{t('hero.subtitle')}</p>
        <Link to="/shop" className="hero-btn">{t('hero.shopNow')}</Link>
      </div>
      <div className="hero-image">
        <img src="/src/assets/hero.png" alt="Gift box" />
      </div>
    </section>
  );
}

export default Hero;