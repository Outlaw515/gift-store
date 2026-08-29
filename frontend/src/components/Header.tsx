import { ShoppingCart, Search, User } from 'lucide-react';
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
          <span className="active">الرئيسية</span>
          <span>الهدايا المخصصة</span>
          <span>من نحن</span>
          <span>اتصل بنا</span>
        </nav>
        <div className="logo-wrap">
          <img src="/src/assets/logo.png" alt="ROSA Gift Store" className="logo" />
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