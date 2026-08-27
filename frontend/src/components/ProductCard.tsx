import type { Product } from '../types/Product';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../config';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const message = `مرحباً، أنا مهتم بمنتج: ${product.name} - $${product.price}`;

  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <a
          href={getWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-icon"
          title="اطلب عبر واتساب"
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </div>
  );
}
export default ProductCard;