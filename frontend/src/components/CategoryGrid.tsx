import { Gift, Flower2, SprayCan, Package } from 'lucide-react';

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
          <div className="category-card" key={cat.name}>
            <div className="category-icon">
              <Icon size={22} />
            </div>
            <div>
              <h4>{cat.name}</h4>
              <span>تسوق الآن</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default CategoryGrid;