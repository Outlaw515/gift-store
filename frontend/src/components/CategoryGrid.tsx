import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';

function CategoryGrid() {
  const { t } = useTranslation();

  return (
    <section className="category-grid">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <Link to={`/shop?category=${encodeURIComponent(cat.id)}`} className="category-card" key={cat.id}>
            <div className="category-icon">
              <Icon size={22} />
            </div>
            <div>
              <h4>{t(cat.labelKey)}</h4>
              <span>{t('categories.shopNow')}</span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default CategoryGrid;