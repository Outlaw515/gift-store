import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { Gift, ShoppingCart, Check, ArrowRight } from 'lucide-react';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
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

  if (loading) return <p className="static-page">جاري التحميل...</p>;
  if (error || !product) {
    return (
      <div className="static-page">
        <p>المنتج غير موجود.</p>
        <Link to="/shop">الرجوع للمتجر</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/shop" className="back-link">
        <ArrowRight size={18} />
        <span>الرجوع للمتجر</span>
      </Link>
      <div className="product-detail-page">
        <div className="product-detail-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <Gift size={64} />
          )}
        </div>
        <div className="product-detail-info">
          <span className="category-badge">{product.category || 'بدون فئة'}</span>
          <h2>{product.name}</h2>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">{product.price} ر.ي</p>
          <p className="product-detail-stock">
            {product.stockQuantity > 0 ? `متوفر (${product.stockQuantity})` : 'غير متوفر حالياً'}
          </p>
          <button onClick={handleAddToCart} className="admin-submit-btn" disabled={product.stockQuantity === 0}>
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
            <span style={{ marginRight: '0.5rem' }}>أضف للسلة</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;