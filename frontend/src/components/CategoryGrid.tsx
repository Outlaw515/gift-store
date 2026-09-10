import { Gift, Flower2, SprayCan, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'هدايا جاهزة', icon: Gift },
  { name: 'باقات الورد', icon: Flower2 },
  { name: 'العطور', icon: SprayCan },
  { name: 'الشوكولاتة', icon: Package },
];

function CategoryGrid() {
  return (
    <section className="category-grid">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} className="category-card" key={cat.name}>
            <div className="category-icon">
              <Icon size={22} />
            </div>
            <div>
              <h4>{cat.name}</h4>
              <span>تسوق الآن</span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default CategoryGrid;