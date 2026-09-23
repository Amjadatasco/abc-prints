import { useState } from 'react';

export default function PromoBanner({ setActiveTab }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('ABC2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="promo-banner-wrapper">
      <div className="container promo-banner-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.1rem' }}>🎉</span>
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>
            عرض إطلاق منصة ABC الجديد: خصم <strong style={{ color: 'var(--accent-yellow)' }}>10%</strong> عند استخدام الكود:
          </span>
          <span className="promo-code-badge" onClick={handleCopyCode}>
            ABC2026
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="promo-copy-btn" onClick={handleCopyCode}>
            {copied ? '✅ تم النسخ!' : '📋 انسخ الكود'}
          </button>
          {setActiveTab && (
            <button 
              className="promo-copy-btn" 
              onClick={() => setActiveTab('customizer')}
              style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-white)' }}
            >
              🎨 صمم الآن
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
