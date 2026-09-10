import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

function ShopPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;

  return (
    <div>
      <h2 className="section-title">
        {category ? category : 'جميع المنتجات'}
      </h2>
      <ProductList category={category} />
    </div>
  );
}

export default ShopPage;