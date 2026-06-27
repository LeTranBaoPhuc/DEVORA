import './ProductCard.css';

export interface ProductProps {
  id: string;
  title: string;
  price: string;
  author: string;
  rating: string;
  reviews: string;
  sales: string;
  image: string;
  tags: string[];
  type: string;
}

export function ProductCard({ product }: { product: ProductProps }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <a href={`/marketplace/${product.id}`} className="product-image-link">
          <div className="product-image-overlay"></div>
          {/* Mocking the AI chip look from Figma */}
          <div style={{ position: 'absolute', color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>AI</div>
        </a>
        <span className="product-badge">Save</span>
      </div>
      
      <div className="product-content">
        <div className="product-header">
          <a href={`/marketplace/${product.id}`} className="product-title-link">
            <h3 className="product-title" title={product.title}>{product.title}</h3>
          </a>
        </div>
        
        <div className="product-meta">
          <a href={`/profile/${product.author}`} className="product-author">
            <div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#6b7280'}}></div>
            {product.author}
          </a>
          <div className="product-stats">
            <span className="stat-rating">{product.rating}</span>
            <span className="stat-dot">•</span>
            <span className="stat-reviews">{product.reviews}</span>
          </div>
        </div>
        
        <div className="product-tags">
          {product.tags.map((tag, index) => (
            <span key={index} className="product-tag">{tag}</span>
          ))}
        </div>
        
        <div className="product-price-section">
          <div className="product-price">${product.price}</div>
          <div className="product-sales">{product.sales} sold</div>
        </div>
      </div>
    </div>
  );
}
