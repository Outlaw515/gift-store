import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Product } from '../types/Product';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

function FavoritesPage() {
  const { t } = useTranslation();
  const { favoriteIds } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5144/api/products')
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="static-page">{t('common.loading')}</p>;

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  return (
    <div>
      <h2 className="section-title">{t('favoritesPage.title')}</h2>
      {favoriteProducts.length === 0 ? (
        <p className="no-products">{t('favoritesPage.empty')}</p>
      ) : (
        <div className="product-grid">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;