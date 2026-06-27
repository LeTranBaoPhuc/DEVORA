import { Hero } from '../components/Hero';
import { HowDevoraWork } from '../components/HowDevoraWork';
import { ProductCard, type ProductProps } from '../components/ProductCard';
import './Home.css';

const featuredProducts: ProductProps[] = [
  {
    id: 'notion-habit-tracker',
    title: 'Advanced Notion Habit Tracker + Data Visualization Mini App',
    price: '29.99',
    author: 'vibe_creator',
    rating: '4.7',
    reviews: '1205',
    sales: '534',
    image: '',
    tags: ['Python', 'Python', 'Python'],
    type: 'Mini App'
  },
  {
    id: 'notion-habit-tracker-2',
    title: 'Advanced Notion Habit Tracker + Data Visualization Mini App',
    price: '29.99',
    author: 'vibe_creator',
    rating: '4.7',
    reviews: '1205',
    sales: '534',
    image: '',
    tags: ['Python', 'Python', 'Python'],
    type: 'Mini App'
  },
  {
    id: 'notion-habit-tracker-3',
    title: 'Advanced Notion Habit Tracker + Data Visualization Mini App',
    price: '29.99',
    author: 'vibe_creator',
    rating: '4.7',
    reviews: '1205',
    sales: '534',
    image: '',
    tags: ['Python', 'Python', 'Python'],
    type: 'Mini App'
  },
  {
    id: 'notion-habit-tracker-4',
    title: 'Advanced Notion Habit Tracker + Data Visualization Mini App',
    price: '29.99',
    author: 'vibe_creator',
    rating: '4.7',
    reviews: '1205',
    sales: '534',
    image: '',
    tags: ['Python', 'Python', 'Python'],
    type: 'Mini App'
  }
];

export function Home() {
  return (
    <div className="home-page">
      <Hero />
      
      <section className="featured-section">
        <div className="container">
          <div className="featured-header">
            <h2 className="featured-title">
              Top product
              <span className="featured-title-underline"></span>
            </h2>
            <div className="featured-nav">
              <button className="nav-btn">‹</button>
              <button className="nav-btn">›</button>
            </div>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <HowDevoraWork />
    </div>
  );
}
