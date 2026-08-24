import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <li>
      {product.name} - ${product.price}
    </li>
  );
}

export default ProductCard;