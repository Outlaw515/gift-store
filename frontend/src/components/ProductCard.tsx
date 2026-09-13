import type { Product } from '../types/Product';
import { ShoppingCart, Check, Heart, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedName, getLocalizedCategory } from '../utils/localizeProduct';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t, i18n } = useTranslation();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    toggleFavorite(product.id);
  }

  const displayName = getLocalizedName(product, i18n.language);
  const displayCategory = getLocalizedCategory(product, i18n.language);
  const favorited = isFavorite(product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-placeholder">
        {displayCategory && (
          <span className="category-badge">{displayCategory}</span>
        )}
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={displayName} />
        ) : (
          <div className="no-image-placeholder">
            <Gift size={40} />
          </div>
        )}
        <button
          className={`wishlist-btn ${favorited ? 'active' : ''}`}
          title={t('common.addToFavorites')}
          onClick={handleToggleFavorite}
        >
          <Heart size={16} fill={favorited ? 'currentColor' : 'none'} />
        </button>
      </Link>
      <Link to={`/product/${product.id}`} className="product-name-link">
        <h3>{displayName}</h3>
      </Link>
      <div className="product-footer">
        <button onClick={handleAddToCart} className="add-to-cart-btn" title={t('common.addToCart')}>
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          <span>{t('common.addToCart')}</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;