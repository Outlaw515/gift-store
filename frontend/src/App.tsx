import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductList from './components/ProductList';
import ComingSoon from './components/ComingSoon';
import Footer from './components/Footer';
import CartButton from './components/CartButton';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <main className="page-container">
        <Hero />
        <CategoryGrid />
        <section className="featured-section">
          <h3 className="section-title">منتجات مميزة</h3>
          <ProductList />
        </section>
        <ComingSoon title="الهدايا حسب المناسبة" />
      </main>
      <Footer />
      <CartButton />
    </div>
  );
}

export default App;