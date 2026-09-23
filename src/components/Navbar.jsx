import { useState } from 'react';
import LogoABC from './LogoABC';

export default function Navbar({ activeTab, setActiveTab, cartCount }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <div className="navbar-wrapper">
      <div className="container">
        <header className="navbar">
          <div 
            className="navbar-brand" 
            onClick={() => handleNavClick('home')} 
            style={{ cursor: 'pointer' }}
          >
            <LogoABC variant="ar" size="sm" dark={false} />
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="navbar-nav">
              <li>
                <span 
                  className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick('home')}
                >
                  الرئيسية
                </span>
              </li>
              <li>
                <span 
                  className={`nav-link ${activeTab === 'customizer' ? 'active' : ''}`}
                  onClick={() => handleNavClick('customizer')}
                >
                  صمم منتجك
                </span>
              </li>
              <li>
                <span 
                  className={`nav-link ${activeTab === 'calculator' ? 'active' : ''}`}
                  onClick={() => handleNavClick('calculator')}
                >
                  حاسبة الطباعة
                </span>
              </li>
              <li>
                <span 
                  className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
                  onClick={() => handleNavClick('services')}
                >
                  الخدمات الرقمية
                </span>
              </li>
              <li>
                <span 
                  className={`nav-link ${activeTab === 'custom_web' ? 'active' : ''}`}
                  onClick={() => handleNavClick('custom_web')}
                >
                  صمم موقعك
                </span>
              </li>

              <li>
                <button 
                  className={`btn ${activeTab === 'cart' ? 'btn-primary' : 'btn-outline'} cart-icon-wrapper`}
                  onClick={() => handleNavClick('cart')}
                  style={{ padding: '8px 16px' }}
                >
                  🛒 السلة
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Action Bar */}
          <div className="mobile-action-bar">
            <button 
              className={`btn ${activeTab === 'cart' ? 'btn-primary' : 'btn-outline'} cart-icon-wrapper mobile-cart-btn`}
              onClick={() => handleNavClick('cart')}
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            >
              🛒
              {cartCount > 0 && <span className="cart-badge" style={{ top: '-4px', right: '-4px' }}>{cartCount}</span>}
            </button>
            <button 
              className="mobile-menu-toggle" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className={`hamburger-bar ${isOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${isOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${isOpen ? 'open' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Overlay Menu */}
          <div className={`mobile-nav-overlay ${isOpen ? 'show' : ''}`}>
            <ul className="mobile-nav-links">
              <li>
                <span 
                  className={`mobile-nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick('home')}
                >
                  🏠 الرئيسية
                </span>
              </li>
              <li>
                <span 
                  className={`mobile-nav-link ${activeTab === 'customizer' ? 'active' : ''}`}
                  onClick={() => handleNavClick('customizer')}
                >
                  🎨 صمم منتجك
                </span>
              </li>
              <li>
                <span 
                  className={`mobile-nav-link ${activeTab === 'calculator' ? 'active' : ''}`}
                  onClick={() => handleNavClick('calculator')}
                >
                  📊 حاسبة الطباعة
                </span>
              </li>
              <li>
                <span 
                  className={`mobile-nav-link ${activeTab === 'services' ? 'active' : ''}`}
                  onClick={() => handleNavClick('services')}
                >
                  🌐 الخدمات الرقمية
                </span>
              </li>
              <li>
                <span 
                  className={`mobile-nav-link ${activeTab === 'custom_web' ? 'active' : ''}`}
                  onClick={() => handleNavClick('custom_web')}
                >
                  💻 صمم موقعك
                </span>
              </li>

            </ul>
          </div>
        </header>
      </div>
    </div>
  );
}
