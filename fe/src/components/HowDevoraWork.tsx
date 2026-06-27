import './HowDevoraWork.css';

export function HowDevoraWork() {
  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">
          HOW DEVORA WORK
          <span className="title-underline"></span>
        </h2>
        
        <div className="steps-container">
          {/* Row 1 */}
          <div className="steps-row">
            <div className="step-card step-dark">
              <h3 className="step-title">BROWSE & DISCOVER</h3>
              <p className="step-desc">SEARCH THOUSANDS OF AI AGENTS, SCRIPTS AND TEMPLATES.</p>
              <div className="step-placeholder"></div>
            </div>
            
            <div className="step-card step-medium">
              <h3 className="step-title">PURCHASE & ESCROW</h3>
              <p className="step-desc">BUY SECURELY. FUNDS ARE HELD IN ESCROW UNTIL YOU DOWNLOAD.</p>
              <div className="step-placeholder"></div>
            </div>
            
            <div className="step-card step-light">
              <h3 className="step-title">DOWNLOAD & DEPLOY</h3>
              <p className="step-desc">GET INSTANT ACCESS TO SOURCE CODE AND DOCUMENTATION.</p>
              <div className="step-placeholder"></div>
            </div>
          </div>
          
          {/* Row 2 (duplicate as per screenshot) */}
          <div className="steps-row">
            <div className="step-card step-dark">
              <h3 className="step-title">BROWSE & DISCOVER</h3>
              <p className="step-desc">SEARCH THOUSANDS OF AI AGENTS, SCRIPTS AND TEMPLATES.</p>
              <div className="step-placeholder"></div>
            </div>
            
            <div className="step-card step-medium">
              <h3 className="step-title">PURCHASE & ESCROW</h3>
              <p className="step-desc">BUY SECURELY. FUNDS ARE HELD IN ESCROW UNTIL YOU DOWNLOAD.</p>
              <div className="step-placeholder"></div>
            </div>
            
            <div className="step-card step-light">
              <h3 className="step-title">DOWNLOAD & DEPLOY</h3>
              <p className="step-desc">GET INSTANT ACCESS TO SOURCE CODE AND DOCUMENTATION.</p>
              <div className="step-placeholder"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
