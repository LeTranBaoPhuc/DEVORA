import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            LOREM IPSUM DOLOR SIT<br/>
            AMET CONSECTETUR.<br/>
            AC HAC SOCIIS ARCU
          </h1>
          
          <p className="hero-description">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          
          <button className="btn-join">JOIN NOW</button>
        </div>
        
        <div className="hero-visual">
          <div className="visual-bg-blocks">
            <div className="bg-block top-left"></div>
            <div className="bg-block bottom-right"></div>
          </div>
          
          <div className="visual-cards">
            <div className="card-placeholder card-main"></div>
            <div className="card-placeholder card-sub"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
