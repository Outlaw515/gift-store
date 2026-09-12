import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

function ShopPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  return (
    <div>
      <h2 className="section-title">
        {search ? `نتائج البحث عن: ${search}` : category ? category : 'جميع المنتجات'}
      </h2>
      <ProductList category={category} search={search} />
    </div>
  );
}

export default ShopPage;