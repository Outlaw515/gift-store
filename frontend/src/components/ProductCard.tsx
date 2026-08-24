import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
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
        <span className="product-stock">{product.stockQuantity} in stock</span>
      </div>
    </div>
  );
}

export default ProductCard;