import './CategoryList.css';

const categories = [
  { name: 'AI Agents', icon: '🤖' },
  { name: 'Mini Apps', icon: '📱' },
  { name: 'Automation Scripts', icon: '⚙️' },
  { name: 'Prompt Templates', icon: '💬' },
  { name: 'Chatbots', icon: '🗣️' },
  { name: 'Data Tools', icon: '📊' },
  { name: 'Marketing Tools', icon: '🚀' },
  { name: 'E-commerce Tools', icon: '🛒' },
];

export function CategoryList() {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-grid">
          {categories.map((category, index) => (
            <a key={index} href={`/marketplace?category=${category.name.toLowerCase().replace(' ', '-')}`} className="category-card">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
