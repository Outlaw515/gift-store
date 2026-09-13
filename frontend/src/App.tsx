import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      <CategoryGrid />
      <section className="featured-section">
        <h3 className="section-title">{t('featured.title')}</h3>
        <ProductList />
      </section>
      <ComingSoon title={t('comingSoonSection.title')} />
    </>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div>
      <Header />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/custom-gifts" element={<CustomGiftsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
      <Footer />
      <CartButton />
    </div>
  );
}

export default App;