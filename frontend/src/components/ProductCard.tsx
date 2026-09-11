import type { Product } from '../types/Product';
import { ShoppingCart, Check, Heart, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        {product.category && (
          <span className="category-badge">{product.category}</span>
        )}
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="no-image-placeholder">
            <Gift size={40} />
          </div>
        )}
        <button className="wishlist-btn" title="أضف للمفضلة">
          <Heart size={16} />
        </button>
      </div>
      <h3>{product.name}</h3>
      <div className="product-footer">
        <button onClick={handleAddToCart} className="add-to-cart-btn" title="أضف للسلة">
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          <span>أضف للسلة</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;