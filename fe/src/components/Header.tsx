import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-container">
          <div className="logo-section">
            <button className="mobile-menu-btn">☰</button>
            <a href="/" className="logo-link">
              <div className="logo-icon-rect">LOGO</div>
            </a>
          </div>
          
          <nav className="main-nav">
            <a href="/marketplace" className="nav-link">Marketplace</a>
            <a href="/auctions" className="nav-link">Auctions</a>
            <a href="/auctions" className="nav-link">Auctions</a>
            <button className="nav-dropdown">More ⌄</button>
          </nav>
          
          <div className="user-actions">
            <button className="icon-btn">💬</button>
            <button className="icon-btn notification">
              🔔
              <span className="notification-dot"></span>
            </button>
            <button className="avatar-btn">
              <div className="avatar"></div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="header-bottom">
        <div className="container header-search-container">
          <div className="search-bar">
            <button className="search-category">All product ⌄</button>
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input type="search" placeholder="Search" className="search-input" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
