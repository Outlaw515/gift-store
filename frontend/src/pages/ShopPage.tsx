import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductList from '../components/ProductList';
import { categories } from '../data/categories';

function ShopPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  const categoryLabel = category
    ? t(categories.find((c) => c.id === category)?.labelKey || '')
    : undefined;

  let title = t('shop.allProducts');
  if (search) {
    title = `${t('shop.searchResults')} ${search}`;
  } else if (categoryLabel) {
    title = categoryLabel;
  }

  return (
    <div>
      <h2 className="section-title">{title}</h2>
      <ProductList category={category} search={search} />
    </div>
  );
}

export default ShopPage;