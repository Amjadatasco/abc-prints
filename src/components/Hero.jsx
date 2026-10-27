import LogoABC from './LogoABC';
import CustomerReviews from './CustomerReviews';

export default function Hero({ setActiveTab, reviews = [], onAddReview }) {
  return (
    <div className="fade-in">
      {/* Main Hero Header */}
      <section className="hero-sec">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Hero Logo — 3D Prominent Floating Emblem with Smooth Auto-Flip */}
          <div className="hero-logo-3d-container">
            <div className="hero-logo-3d-card">
              <LogoABC variant="ar" size="lg" autoFlip={true} interval={4000} dark={false} />
            </div>
          </div>

          <div className="hero-badge">
            🚀 وكالتك الإبداعية المتكاملة: طباعة، دعاية، إعلان، وتسويق رقمي
          </div>
          <h1 className="hero-title">
            نصنع حضورك الرقمي والمادي بكل إتقان <span className="gradient-text">ABC</span>
          </h1>
          <p className="hero-subtitle text-muted" style={{ maxWidth: '850px' }}>
            نحن شريكك الإبداعي والتقني. نقدم حلولاً متكاملة تبدأ من تصميم الهويات البصرية والبراندينغ، مروراً بالتسويق الإلكتروني الذكي وتطوير المواقع والويب، ووصولاً إلى الطباعة الرقمية الفائقة والدقيقة على شتى المواد والأسطح.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => setActiveTab('customizer')}>
              🎨 صمم منتجك وهديتك الخاصة
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('services')}>
              🌐 خدمات التسويق وتطوير المواقع
            </button>
            <button className="btn btn-outline-cyan" onClick={() => setActiveTab('calculator')}>
              📊 حاسبة الطباعة الرقمية
            </button>
          </div>
        </div>
      </section>


      {/* Core Services Categories Section */}
      <section className="container">
        <h2 className="section-title">خدماتنا الرئيسية وحلولنا الشاملة</h2>
        <div className="machines-grid">
          
          {/* Services Category 1: Digital Services */}
          <div className="glass-panel machine-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <span className="machine-tag">تطوير وتسويق</span>
            <h3 className="glow-text-cyan" style={{ fontSize: '1.4rem', marginBottom: '10px' }}>
              التسويق الإلكتروني وبرمجة المواقع
            </h3>
            <p style={{ fontSize: '0.9rem' }}>
              نساعدك على مضاعفة مبيعاتك وتأسيس بنية رقمية لشركتك من خلال حلول الويب والتسويق المتطورة.
            </p>
            <ul className="machine-features">
              <li>إدارة وإطلاق الحملات الإعلانية الممولة</li>
              <li>إنشاء المتاجر الإلكترونية والمواقع التعريفية</li>
              <li>تحسين نتائج محركات البحث وكتابة المحتوى التسويقي</li>
            </ul>
            <button 
              className="btn btn-outline-cyan" 
              onClick={() => setActiveTab('services')}
              style={{ marginTop: 'auto', padding: '8px 16px', fontSize: '0.85rem' }}
            >
              استكشف الخدمات الرقمية
            </button>
          </div>

          {/* Services Category 2: Branding & Design */}
          <div className="glass-panel machine-card" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
            <span className="machine-tag">هوية وتصميم</span>
            <h3 className="glow-text-magenta" style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--secondary-color)' }}>
              الدعاية والإعلان وتصميم الـ Branding
            </h3>
            <p style={{ fontSize: '0.9rem' }}>
              نبتكر هوية بصرية كاملة وجذابة لعلامتك التجارية لترسم طابعاً فريداً ومميزاً في ذهن عملائك.
            </p>
            <ul className="machine-features">
              <li>تصميم الشعارات ودليل الاستخدام البصري الكامل</li>
              <li>تصميم المطبوعات الورقية واللافتات والعبوات</li>
              <li>تصميم لوحات الإعلانات وحلول العرض المعاصرة</li>
            </ul>
            <button 
              className="btn btn-outline" 
              onClick={() => setActiveTab('services')}
              style={{ marginTop: 'auto', padding: '8px 16px', fontSize: '0.85rem', borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}
            >
              اطلب هوية بصرية
            </button>
          </div>

          {/* Services Category 3: Printing Technologies */}
          <div className="glass-panel machine-card" style={{ borderLeft: '4px solid var(--accent-amber)' }}>
            <span className="machine-tag">طباعة وإنتاج مادي</span>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--accent-amber)' }}>
              تقنيات الطباعة الرقمية الحديثة
            </h3>
            <p style={{ fontSize: '0.9rem' }}>
              نمثّل أفكارك وتصاميمك على أرض الواقع بدقة ألوان استثنائية وعبر أحدث ماكينات الطباعة الفورية.
            </p>
            <ul className="machine-features">
              <li>UV Flatbed 6090 للأكريليك والخشب والزجاج</li>
              <li>DTF 60cm لطباعة المنسوجات والملابس رول</li>
              <li>UV DTF 60cm للملصقات الذكية القابلة للنقل</li>
            </ul>
            <button 
              className="btn btn-outline" 
              onClick={() => setActiveTab('calculator')}
              style={{ marginTop: 'auto', padding: '8px 16px', fontSize: '0.85rem', borderColor: 'var(--accent-amber)', color: 'var(--accent-amber)' }}
            >
              حساب تكلفة الطباعة
            </button>
          </div>

        </div>
      </section>

      {/* Real Customer Reviews Section (معرض آراء وتصوير الزبائن الحقيقي) */}
      <CustomerReviews reviews={reviews} onAddReview={onAddReview} />

      {/* Shipping Promo section */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div className="glass-panel-cyan" style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', textAlign: 'right' }}>
          <div style={{ fontSize: '3rem' }}>🚚</div>
          <div style={{ flex: 1 }}>
            <h3 className="glow-text-cyan" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              الشحن والتوصيل السريع والآمن
            </h3>
            <p style={{ fontSize: '0.95rem' }}>
              سواء كنت تصمم كوباً مخصصاً أو تطلب لافتة تجارية أو رول طباعة، نحن نوفر شحناً سريعاً وتوصيلاً يستغرق من يوم إلى ثلاثة أيام عمل كحد أقصى لتصل طلبيتك إلى منشأتك أو باب منزلك.
            </p>
          </div>
          <button className="btn btn-secondary" onClick={() => setActiveTab('customizer')}>
            ابدأ تصميم طلبك الآن
          </button>
        </div>
      </section>
    </div>
  );
}
