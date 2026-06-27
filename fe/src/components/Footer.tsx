import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-title">DEVORA</h2>
            <p className="footer-desc">
              The premier marketplace for vibe coders. Buy and sell AI agents, mini apps, and automation scripts.
            </p>
            <div className="footer-subscribe">
              <input type="email" placeholder="Email address" className="subscribe-input" />
            </div>
            <div className="social-links">
              <a href="#" className="social-icon"></a>
              <a href="#" className="social-icon"></a>
              <a href="#" className="social-icon"></a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <div className="footer-column">
              <h3 className="footer-col-title">Marketplace</h3>
              <a href="#" className="footer-link">Browse Products</a>
              <a href="#" className="footer-link">Reverse Auctions</a>
              <a href="#" className="footer-link">AI Agents</a>
              <a href="#" className="footer-link">Prompt Templates</a>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-col-title">For Sellers</h3>
              <a href="#" className="footer-link">Start Selling</a>
              <a href="#" className="footer-link">Seller Guide</a>
              <a href="#" className="footer-link">Payouts & Fees</a>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-col-title">Support</h3>
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Dispute Resolution</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Privacy Policy</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Copyright © 2023 BRIX Templates | All Rights Reserved | <a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  );
}
