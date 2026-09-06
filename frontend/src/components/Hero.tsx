import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h2>هدايا تُعبّر عنك</h2>
        <p>اختر من مجموعتنا المميزة من الهدايا التي تضيف لمسة خاصة لكل مناسبة</p>
        <Link to="/shop" className="hero-btn">تسوق الآن</Link>
      </div>
      <div className="hero-image">
        <img src="/src/assets/hero.png" alt="Gift box" />
      </div>
    </section>
  );
}

export default Hero;