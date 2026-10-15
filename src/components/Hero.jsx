import LogoABC from './LogoABC';

export default function Hero({ setActiveTab }) {
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


      {/* Products Showcase / Gallery Section (معرض المنتجات القابلة للتنفيذ) */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div className="hero-badge" style={{ display: 'inline-block', marginBottom: '10px' }}>
            ✨ تصنيع وتخصيص فوري بأعلى مقاييس الجودة
          </div>
          <h2 className="section-title" style={{ marginTop: '5px' }}>
            معرض المنتجات القابلة للتنفيذ والطباعة
          </h2>
          <p className="hero-subtitle text-muted" style={{ maxWidth: '750px', margin: '0 auto' }}>
            اختر منتجك المفضل وابدأ بتصميمه فوراً بإضافة شعارك، صورك، أو نصوصك الخاصة مع معاينة حية ثلاثية الأبعاد قبل الطلب!
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', 
          gap: '24px' 
        }}>
          {[
            {
              id: 'mug',
              title: 'أكواب سيراميك فاخرة',
              desc: 'أكواب بيضاء مصقولة مع طباعة حرارية كاملة مقاومة للغسيل والحرارة المرتفعة.',
              price: '$6.50',
              tag: 'الأكثر طلباً',
              tech: 'UV Flatbed',
              img: '/mockups/blank_mug.png'
            },
            {
              id: 'acrylic',
              title: 'ألواح أكريليك مضيئة LED',
              desc: 'أكريليك نقي كريستالي شفاف مع قاعدة خشبية فاخرة وإضاءة دافئة للمكاتب والمطاعم.',
              price: '$15.00',
              tag: 'ديكور وهدايا',
              tech: 'UV Flatbed 6090',
              img: '/mockups/blank_acrylic.png'
            },
            {
              id: 'tshirt',
              title: 'تيشرتات قطنية 100%',
              desc: 'أقمشة قطنية عالية النعومة مع طباعة DTF رقمية ناصعة الألوان ومقاومة للتشقق.',
              price: '$18.00',
              tag: 'ملابس ومناسبات',
              tech: 'DTF 60cm',
              img: '/mockups/blank_tshirt.png'
            },
            {
              id: 'phone',
              title: 'كوفرات حماية للهاتف',
              desc: 'كفرات سيليكون مرنة وصدمات قوية مع طباعة بارزة ولامعة لكافة موديلات الهواتف.',
              price: '$8.00',
              tag: 'إكسسوارات',
              tech: 'UV Flatbed',
              img: '/mockups/blank_phone.png'
            },
            {
              id: 'sticker',
              title: 'ملصقات شعار UV DTF',
              desc: 'ملصقات نقل ذكية ثلاثية الأبعاد تنقل الشعار مباشرة على الزجاج، البلاستيك والمعادن.',
              price: '$4.00',
              tag: 'براندينغ فوري',
              tech: 'UV DTF Roll',
              img: '/mockups/blank_sticker.png'
            }
          ].map((item) => (
            <div 
              key={item.id}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px',
                borderRadius: 'var(--border-radius-lg)',
                border: '1px solid var(--panel-border)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                background: '#ffffff',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Product Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ 
                  background: 'rgba(2, 132, 199, 0.08)', 
                  color: 'var(--primary-color)', 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  fontSize: '0.75rem', 
                  fontWeight: 700 
                }}>
                  {item.tag}
                </span>
                <span style={{ 
                  fontSize: '0.72rem', 
                  color: 'var(--text-muted)', 
                  fontFamily: 'var(--font-english)', 
                  fontWeight: 600,
                  direction: 'ltr'
                }}>
                  {item.tech}
                </span>
              </div>

              {/* Product Mockup Image Container */}
              <div 
                style={{ 
                  background: '#f8fafc', 
                  borderRadius: '12px', 
                  padding: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '16px',
                  minHeight: '170px',
                  border: '1px solid #f1f5f9'
                }}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  style={{ 
                    maxHeight: '140px', 
                    maxWidth: '100%', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.06))'
                  }} 
                />
              </div>

              {/* Product Info */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '6px', color: '#0f172a' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                  {item.desc}
                </p>
              </div>

              {/* Price & Action Button */}
              <div style={{ 
                borderTop: '1px solid #f1f5f9', 
                paddingTop: '14px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                gap: '10px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>يبدأ من</span>
                  <span style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 800, 
                    color: 'var(--primary-color)', 
                    fontFamily: 'var(--font-english)' 
                  }}>
                    {item.price}
                  </span>
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('customizer')}
                  style={{ 
                    padding: '8px 14px', 
                    fontSize: '0.85rem', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>صمم الآن</span>
                  <span>🎨</span>
                </button>
              </div>
            </div>
          ))}
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

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">شركاء النجاح وآراء عملائنا</h2>
          <div className="machines-grid" style={{ marginTop: '40px' }}>
            
            <div className="glass-panel testimonial-card">
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                "تعاونا مع ABC لتصميم وبرمجة متجرنا الإلكتروني وإطلاق حملة تسويقية على سناب شات وتيك توك. تضاعفت مبيعاتنا خلال الشهر الأول بفضل استهدافهم الذكي وموقعهم السريع جداً!"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">ح</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>حلويات الحجاز الفاخرة</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>متجر إلكتروني وتسويق</span>
                </div>
              </div>
            </div>

            <div className="glass-panel testimonial-card" style={{ borderRightColor: 'var(--secondary-color)' }}>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                "طلبنا طباعة لوحات أكريليك وقواعد مضيئة LED لطاولات المطعم بجانب طباعة تيشرتات الطاقم بتقنية DTF. دقة الألوان في ماكينات UV لديهم مذهلة وتتحمل الاستخدام المكثف."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: 'var(--secondary-color)' }}>ب</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>مطعم وكافيه برجر فاكتوري</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>خدمات طباعة وإنتاج مادي</span>
                </div>
              </div>
            </div>

            <div className="glass-panel testimonial-card" style={{ borderRightColor: 'var(--accent-amber)' }}>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                "قمنا بنقل هوية شركتنا بالكامل بالتعاون مع ABC. صمموا لنا شعاراً مبدعاً وكتالوج المنتجات واللوحات الخارجية لمكاتبنا. احترافية عالية جداً والتزام تام بالمواعيد."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{ background: 'var(--accent-amber)', color: '#000' }}>م</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>مجموعة الأفق العقارية</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>تصميم براندينغ ودعاية</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

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
