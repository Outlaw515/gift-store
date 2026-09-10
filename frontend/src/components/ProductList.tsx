import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductListProps {
  category?: string;
}

function ProductList({ category }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5144/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  if (filtered.length === 0) {
    return <p className="no-products">لا توجد منتجات في هذه الفئة حالياً</p>;
  }

  return (
    <div className="product-grid">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;