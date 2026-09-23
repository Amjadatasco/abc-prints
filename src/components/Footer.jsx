import LogoABC from './LogoABC';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <LogoABC variant="ar" size="md" dark={false} />
        </div>
        <ul className="footer-nav">
          <li onClick={() => setActiveTab('home')}>الرئيسية</li>
          <li onClick={() => setActiveTab('customizer')}>صمم منتجك</li>
          <li onClick={() => setActiveTab('calculator')}>حاسبة الطباعة</li>
          <li onClick={() => setActiveTab('services')}>الخدمات الرقمية</li>
          <li onClick={() => setActiveTab('custom_web')}>صمم موقعك</li>
          <li onClick={() => setActiveTab('admin')}>لوحة تحكم الأدمن</li>
        </ul>
        <div style={{ margin: '15px 0', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          راسلنا على: <a href="mailto:info@abc-prints.com" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', direction: 'ltr' }}>info@abc-prints.com</a>
        </div>
        <p style={{ fontSize: '0.85rem' }}>
          جميع الحقوق محفوظة لـ &copy; {new Date().getFullYear()} شركة ABC للطباعة والدعاية والإعلان.
        </p>
      </div>
    </footer>
  );
}
