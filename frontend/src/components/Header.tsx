import { useState } from 'react';
import { ShoppingCart, User, Search, MessageCircle, Camera, Globe, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { getWhatsAppLink, getInstagramLink } from '../config';

function Header() {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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

  function toggleLanguage() {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <span>{t('header.delivery')}</span>
        <div className="header-top-icons">
          <a href={getWhatsAppLink(generalMessage)} target="_blank" rel="noopener noreferrer" title="واتساب">
            <MessageCircle size={16} />
          </a>
          <a href={getInstagramLink()} target="_blank" rel="noopener noreferrer" title="انستقرام">
            <Camera size={16} />
          </a>
          <button onClick={toggleLanguage} className="lang-toggle-btn" title="Language / اللغة">
            <Globe size={16} />
            <span>{i18n.language === 'ar' ? 'EN' : 'ع'}</span>
          </button>
        </div>
      </div>
      <div className="header-main">
        <div className="header-icons">
          <div className="cart-icon-wrap">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-mini-badge">{totalItems}</span>}
          </div>
          <Link to="/favorites" className="cart-icon-wrap" style={{ color: 'inherit' }}>
            <Heart size={20} />
            {totalFavorites > 0 && <span className="cart-mini-badge">{totalFavorites}</span>}
          </Link>
          <User size={20} />
          <Search size={20} onClick={() => setSearchOpen((prev) => !prev)} style={{ cursor: 'pointer' }} />
        </div>
        <nav className="header-nav">
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/shop">{t('nav.shop')}</Link>
          <Link to="/custom-gifts">{t('nav.customGifts')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
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
            placeholder={t('header.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">{t('header.searchButton')}</button>
        </form>
      )}
    </header>
  );
}

export default Header;