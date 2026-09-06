import { ShoppingCart, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <div className="header-top">
        <span>توصيل داخل مدينة تريم</span>
      </div>
      <div className="header-main">
        <div className="header-icons">
          <div className="cart-icon-wrap">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-mini-badge">{totalItems}</span>}
          </div>
          <User size={20} />
        </div>
        <nav className="header-nav">
          <Link to="/">الرئيسية</Link>
          <Link to="/custom-gifts">الهدايا المخصصة</Link>
          <Link to="/about">من نحن</Link>
          <Link to="/contact">اتصل بنا</Link>
        </nav>
        <div className="logo-wrap">
          <Link to="/">
            <img src="/src/assets/logo.jpg" alt="ROSA Gift Store" className="logo" />
          </Link>
        </div>
        <div className="header-search">
          <input type="text" placeholder="ابحث عن منتج..." />
          <Search size={18} />
        </div>
      </div>
    </header>
  );
}

export default Header;