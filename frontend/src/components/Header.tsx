import { useState } from 'react';
import { ShoppingCart, User, Search, MessageCircle, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getWhatsAppLink, getInstagramLink } from '../config';

function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const generalMessage = 'مرحباً، عندي فكرة هدية خاصة أبي أستفسر عنها';

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <span>توصيل داخل مدينة تريم</span>
        <div className="header-top-icons">
          <a href={getWhatsAppLink(generalMessage)} target="_blank" rel="noopener noreferrer" title="واتساب">
            <MessageCircle size={16} />
          </a>
          <a href={getInstagramLink()} target="_blank" rel="noopener noreferrer" title="انستقرام">
            <Camera size={16} />
          </a>
        </div>
      </div>
      <div className="header-main">
        <div className="header-icons">
          <div className="cart-icon-wrap">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-mini-badge">{totalItems}</span>}
          </div>
          <User size={20} />
          <Search size={20} onClick={() => setSearchOpen((prev) => !prev)} style={{ cursor: 'pointer' }} />
        </div>
        <nav className="header-nav">
          <Link to="/">الرئيسية</Link>
          <Link to="/shop">المتجر</Link>
          <Link to="/custom-gifts">الهدايا المخصصة</Link>
          <Link to="/about">من نحن</Link>
          <Link to="/contact">اتصل بنا</Link>
        </nav>
        <div className="logo-wrap">
          <Link to="/">
            <img src="/src/assets/logo.jpg" alt="ROSA Gift Store" className="logo" />
          </Link>
        </div>
      </div>
      {searchOpen && (
        <form onSubmit={handleSearchSubmit} className="search-bar-wrap">
          <input
            type="text"
            autoFocus
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">بحث</button>
        </form>
      )}
    </header>
  );
}

export default Header;