import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { Gift, ShoppingCart, Check, ArrowRight } from 'lucide-react';
import { getLocalizedName, getLocalizedDescription, getLocalizedCategory } from '../utils/localizeProduct';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5144/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('المنتج غير موجود');
        return res.json();
      })
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (loading) return <p className="static-page">{t('common.loading')}</p>;
  if (error || !product) {
    return (
      <div className="static-page">
        <p>المنتج غير موجود.</p>
        <Link to="/shop">{t('common.back')}</Link>
      </div>
    );
  }

  const displayName = getLocalizedName(product, i18n.language);
  const displayDescription = getLocalizedDescription(product, i18n.language);
  const displayCategory = getLocalizedCategory(product, i18n.language);

  return (
    <div>
      <Link to="/shop" className="back-link">
        <ArrowRight size={18} />
        <span>{t('common.back')}</span>
      </Link>
      <div className="product-detail-page">
        <div className="product-detail-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={displayName} />
          ) : (
            <Gift size={64} />
          )}
        </div>
        <div className="product-detail-info">
          <span className="category-badge">{displayCategory || t('product.noCategory')}</span>
          <h2>{displayName}</h2>
          <p className="product-detail-description">{displayDescription}</p>
          <p className="product-detail-price">{product.price} {t('product.currency')}</p>
          <p className="product-detail-stock">
            {product.stockQuantity > 0
              ? t('product.inStock', { count: product.stockQuantity })
              : t('product.outOfStock')}
          </p>
          <button onClick={handleAddToCart} className="admin-submit-btn" disabled={product.stockQuantity === 0}>
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            <span style={{ marginRight: '0.5rem' }}>{t('common.addToCart')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;