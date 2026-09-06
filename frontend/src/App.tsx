import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductList from './components/ProductList';
import ComingSoon from './components/ComingSoon';
import Footer from './components/Footer';
import CartButton from './components/CartButton';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CustomGiftsPage from './pages/CustomGiftsPage';
import './App.css';

function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <section className="featured-section">
        <h3 className="section-title">منتجات مميزة</h3>
        <ProductList />
      </section>
      <ComingSoon title="الهدايا حسب المناسبة" />
    </>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/custom-gifts" element={<CustomGiftsPage />} />
        </Routes>
      </main>
      <Footer />
      <CartButton />
    </div>
  );
}

export default App;