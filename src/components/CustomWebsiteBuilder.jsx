import { useState } from 'react';

export default function CustomWebsiteBuilder({ addServiceRequest }) {
  const [websiteType, setWebsiteType] = useState('landing');
  const [pagesCount, setPagesCount] = useState('1');
  const [designType, setDesignType] = useState('template');
  const [features, setFeatures] = useState({
    multilingual: false,
    cms: false,
    seo: false,
    payment: false,
    booking: false,
    security: false
  });
  const [hosting, setHosting] = useState('no');
  const [projectDesc, setProjectDesc] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [success, setSuccess] = useState(false);

  // Pricing constants based on global average rates
  const basePrices = {
    landing: 600,
    corporate: 1500,
    ecommerce: 2800,
    custom: 4500
  };

  const pagePrices = {
    '1': 0,
    '2-5': 200,
    '6-15': 500,
    '15+': 1000
  };

  const designPrices = {
    template: 0,
    custom: 600,
    premium: 1200
  };

  const featurePrices = {
    multilingual: 400,
    cms: 500,
    seo: 250,
    payment: 600,
    booking: 350,
    security: 150
  };

  const hostingPrice = 200;

  const calculatePrice = () => {
    let total = basePrices[websiteType] || 0;
    total += pagePrices[pagesCount] || 0;
    total += designPrices[designType] || 0;
    
    if (features.multilingual) total += featurePrices.multilingual;
    if (features.cms) total += featurePrices.cms;
    if (features.seo) total += featurePrices.seo;
    if (features.payment) total += featurePrices.payment;
    if (features.booking) total += featurePrices.booking;
    if (features.security) total += featurePrices.security;
    
    if (hosting === 'yes') total += hostingPrice;
    
    return total;
  };

  const toggleFeature = (key) => {
    setFeatures(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !projectDesc) {
      alert('يرجى ملء جميع الحقول المطلوبة وخصوصاً الوصف ورقم الهاتف لتسجيل طلبك.');
      return;
    }

    const price = calculatePrice();

    const typeLabels = {
      landing: 'صفحة تعريفية واحدة (Landing Page)',
      corporate: 'موقع تعريفي للشركات (Corporate Site)',
      ecommerce: 'متجر إلكتروني متكامل (E-Commerce Store)',
      custom: 'منصة/تطبيق ويب مخصص (Custom Web Application)'
    };

    const pageLabels = {
      '1': 'صفحة واحدة فقط',
      '2-5': 'من 2 إلى 5 صفحات',
      '6-15': 'من 6 إلى 15 صفحة',
      '15+': 'أكثر من 15 صفحة'
    };

    const designLabels = {
      template: 'قالب جاهز أنيق معدل',
      custom: 'تصميم واجهات UI/UX مخصص بالكامل',
      premium: 'تصميم فاخر وحركات تفاعلية ممتازة'
    };

    const selectedFeatures = [];
    if (features.multilingual) selectedFeatures.push('دعم لغات متعددة (عربي/إنجليزي)');
    if (features.cms) selectedFeatures.push('لوحة تحكم برمجية لإدارة المحتوى (CMS)');
    if (features.seo) selectedFeatures.push('تهيئة محركات البحث (SEO)');
    if (features.payment) selectedFeatures.push('ربط بوابات دفع إلكترونية');
    if (features.booking) selectedFeatures.push('نظام حجز مواعيد تفاعلي');
    if (features.security) selectedFeatures.push('حماية متقدمة وتثبيت شهادة أمان');

    const formattedDesc = `
[طلب برمجة وتصميم موقع مخصص]
- نوع الموقع: ${typeLabels[websiteType]}
- عدد الصفحات: ${pageLabels[pagesCount]}
- نمط الواجهات: ${designLabels[designType]}
- الميزات المطلوبة: ${selectedFeatures.length > 0 ? selectedFeatures.join('، ') : 'لا يوجد'}
- الدومين والاستضافة: ${hosting === 'yes' ? 'نعم (حجز لسنة)' : 'لا (لدى العميل)'}
- شرح ووصف الفكرة: ${projectDesc}
    `.trim();

    const newRequest = {
      id: 'WEB-' + Date.now(),
      type: 'Service',
      serviceKey: 'custom_web',
      serviceName: 'تصميم موقع مخصص (صمم موقعك)',
      clientName,
      clientPhone,
      projectDesc: formattedDesc,
      budget: `${price}`, // Store estimated price
      status: 'pending',
      date: new Date().toLocaleDateString('ar-EG')
    };

    addServiceRequest(newRequest);
    setSuccess(true);
    setProjectDesc('');
    setClientName('');
    setClientPhone('');
    
    // Reset selections
    setWebsiteType('landing');
    setPagesCount('1');
    setDesignType('template');
    setFeatures({
      multilingual: false,
      cms: false,
      seo: false,
      payment: false,
      booking: false,
      security: false
    });
    setHosting('no');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setSuccess(false);
    }, 8000);
  };

  const totalPrice = calculatePrice();

  return (
    <div className="container fade-in" style={{ paddingBottom: '80px' }}>
      {/* Page Header */}
      <section className="hero-sec" style={{ padding: '40px 0 20px' }}>
        <div className="hero-badge">
          💻 صمم موقعك الإلكتروني الخاص بأسعار معيارية دقيقة
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.1rem' }}>
          أداة تصميم المواقع وتحديد الأسعار
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '0.95rem', maxWidth: '750px' }}>
          قم ببناء وتخصيص مواصفات موقعك المثالي، واكتشف فوراً التسعيرة النهائية التقديرية المحتسبة وفقاً لمتوسط أسعار تطوير الويب العالمية.
        </p>
      </section>

      {success && (
        <div className="glass-panel" style={{ borderColor: '#22c55e', background: 'rgba(34, 197, 94, 0.08)', color: '#22c55e', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ color: '#22c55e', marginBottom: '6px' }}>🎉 تم تسجيل طلب موقعك بنجاح!</h3>
          <p style={{ color: '#86efac', fontSize: '0.95rem' }}>
            لقد تم تدوين خياراتك وحساب التسعيرة. سيقوم خبير تطوير الويب لدينا بالتواصل معك عبر واتساب خلال 24 ساعة لبدء المشروع.
          </p>
        </div>
      )}

      <div className="cart-layout" style={{ alignItems: 'start', gap: '30px' }}>
        
        {/* Left Side: Selections & Questionnaire */}
        <div style={{ flex: 1.6, display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Question 1: Website Type */}
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
            <h3 style={{ marginBottom: '6px', fontSize: '1.2rem', color: 'var(--text-white)' }}>
              1. ما هو نوع الموقع الإلكتروني الذي تحتاجه؟
            </h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '20px', color: 'var(--text-muted)' }}>
              يحدد نوع الموقع العام البنية الهيكلية ونوع التقنيات المستخدمة.
            </p>
            
            <div className="custom-select-grid">
              <div 
                className={`custom-select-card ${websiteType === 'landing' ? 'selected' : ''}`}
                onClick={() => setWebsiteType('landing')}
              >
                <div className="card-icon">📄</div>
                <h4>صفحة هبوط تعريفية</h4>
                <p>صفحة واحدة لعرض منتج أو خدمة بفعالية عالية.</p>
                <span className="card-price">${basePrices.landing}</span>
              </div>

              <div 
                className={`custom-select-card ${websiteType === 'corporate' ? 'selected' : ''}`}
                onClick={() => setWebsiteType('corporate')}
              >
                <div className="card-icon">🏢</div>
                <h4>موقع تعريفي للشركات</h4>
                <p>موقع رسمي يعرض خدمات الشركة وصورها وموقعها الجغرافي.</p>
                <span className="card-price">${basePrices.corporate}</span>
              </div>

              <div 
                className={`custom-select-card ${websiteType === 'ecommerce' ? 'selected' : ''}`}
                onClick={() => setWebsiteType('ecommerce')}
              >
                <div className="card-icon">🛍️</div>
                <h4>متجر إلكتروني متكامل</h4>
                <p>سلة شراء، لوحة تحكم، منتجات، وقبول الدفع الإلكتروني.</p>
                <span className="card-price">${basePrices.ecommerce}</span>
              </div>

              <div 
                className={`custom-select-card ${websiteType === 'custom' ? 'selected' : ''}`}
                onClick={() => setWebsiteType('custom')}
              >
                <div className="card-icon">⚡</div>
                <h4>منصة / نظام مخصص</h4>
                <p>برمجة خاصة بلوحات تحكم معقدة وميزات حصرية ومطورة.</p>
                <span className="card-price">${basePrices.custom}</span>
              </div>
            </div>
          </div>

          {/* Question 2: Pages Count */}
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', color: 'var(--text-white)' }}>
              2. كم عدد الصفحات المتوقع برمجتها في الموقع؟
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              {Object.keys(pagePrices).map((key) => {
                const labelMap = {
                  '1': 'صفحة واحدة',
                  '2-5': '2 - 5 صفحات',
                  '6-15': '6 - 15 صفحة',
                  '15+': 'أكثر من 15 صفحة'
                };
                return (
                  <div 
                    key={key}
                    onClick={() => setPagesCount(key)}
                    style={{
                      border: pagesCount === key ? '2px solid var(--secondary-color)' : '1px solid var(--secondary-color)',
                      background: '#ffffff',
                      borderRadius: 'var(--border-radius-md)',
                      padding: '16px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--primary-color)', marginBottom: '4px' }}>{labelMap[key]}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontFamily: 'var(--font-english)', fontWeight: 700 }}>
                      {pagePrices[key] === 0 ? 'مجاناً' : `+$${pagePrices[key]}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question 3: Design Complexity */}
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
            <h3 style={{ marginBottom: '6px', fontSize: '1.2rem', color: 'var(--text-white)' }}>
              3. ما هو مستوى تعقيد التصميم والواجهات (UI/UX) المطلوب؟
            </h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '20px', color: 'var(--text-muted)' }}>
              نبتكر تصاميم حصرية تناسب طابع وهدف فكرة علامتك التجارية.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div 
                onClick={() => setDesignType('template')}
                style={{
                  border: designType === 'template' ? '2px solid var(--secondary-color)' : '1px solid var(--secondary-color)',
                  background: '#ffffff',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '6px' }}>قالب أنيق معدل</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary-color)', lineHeight: '1.4', marginBottom: '8px' }}>تعديل وتخصيص قالب مجهز بمستوى احترافي ليلائم علامتك.</p>
                <div style={{ fontFamily: 'var(--font-english)', fontWeight: 700, color: 'var(--primary-color)', fontSize: '0.95rem' }}>+$0</div>
              </div>

              <div 
                onClick={() => setDesignType('custom')}
                style={{
                  border: designType === 'custom' ? '2px solid var(--secondary-color)' : '1px solid var(--secondary-color)',
                  background: '#ffffff',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '6px' }}>واجهات فريدة مخصصة</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary-color)', lineHeight: '1.4', marginBottom: '8px' }}>بناء وهندسة الواجهات وتجربة المستخدم (UI/UX) خصيصاً لك من الصفر.</p>
                <div style={{ fontFamily: 'var(--font-english)', fontWeight: 700, color: 'var(--primary-color)', fontSize: '0.95rem' }}>+${designPrices.custom}</div>
              </div>

              <div 
                onClick={() => setDesignType('premium')}
                style={{
                  border: designType === 'premium' ? '2px solid var(--secondary-color)' : '1px solid var(--secondary-color)',
                  background: '#ffffff',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <h4 style={{ fontSize: '1rem', color: 'var(--primary-color)', marginBottom: '6px' }}>تصميم ثلاثي الأبعاد وتفاعلي</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary-color)', lineHeight: '1.4', marginBottom: '8px' }}>تأثيرات بصرية استثنائية، حركات تفاعلية مذهلة لجذب الانتباه.</p>
                <div style={{ fontFamily: 'var(--font-english)', fontWeight: 700, color: 'var(--primary-color)', fontSize: '0.95rem' }}>+${designPrices.premium}</div>
              </div>
            </div>
          </div>

          {/* Question 4: Additional Features */}
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <h3 style={{ marginBottom: '6px', fontSize: '1.2rem', color: 'var(--text-white)' }}>
              4. حدد الميزات والوظائف الإضافية التي تريد ربطها بموقعك:
            </h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '20px', color: 'var(--text-muted)' }}>
              يمكنك اختيار ميزة واحدة أو ميزات متعددة حسب احتياجات مشروعك الرقمي.
            </p>

            <div className="features-checkbox-grid">
              
              <div 
                className={`feature-checkbox-card ${features.multilingual ? 'selected' : ''}`}
                onClick={() => toggleFeature('multilingual')}
              >
                <input 
                  type="checkbox" 
                  checked={features.multilingual} 
                  onChange={() => {}} // Controlled by parent click
                />
                <div className="feature-checkbox-info">
                  <strong>لغات متعددة</strong>
                  <span>عربي / إنجليزي</span>
                </div>
                <span className="feature-checkbox-price">+${featurePrices.multilingual}</span>
              </div>

              <div 
                className={`feature-checkbox-card ${features.cms ? 'selected' : ''}`}
                onClick={() => toggleFeature('cms')}
              >
                <input 
                  type="checkbox" 
                  checked={features.cms} 
                  onChange={() => {}}
                />
                <div className="feature-checkbox-info">
                  <strong>لوحة تحكم للمحتوى (CMS)</strong>
                  <span>إضافة وتعديل النصوص والصور</span>
                </div>
                <span className="feature-checkbox-price">+${featurePrices.cms}</span>
              </div>

              <div 
                className={`feature-checkbox-card ${features.seo ? 'selected' : ''}`}
                onClick={() => toggleFeature('seo')}
              >
                <input 
                  type="checkbox" 
                  checked={features.seo} 
                  onChange={() => {}}
                />
                <div className="feature-checkbox-info">
                  <strong>أرشفة وتهيئة محركات البحث</strong>
                  <span>تحسين ظهور موقعك في Google</span>
                </div>
                <span className="feature-checkbox-price">+${featurePrices.seo}</span>
              </div>

              <div 
                className={`feature-checkbox-card ${features.payment ? 'selected' : ''}`}
                onClick={() => toggleFeature('payment')}
              >
                <input 
                  type="checkbox" 
                  checked={features.payment} 
                  onChange={() => {}}
                />
                <div className="feature-checkbox-info">
                  <strong>بوابات دفع إلكترونية</strong>
                  <span>Mada, Apple Pay, Visa</span>
                </div>
                <span className="feature-checkbox-price">+${featurePrices.payment}</span>
              </div>

              <div 
                className={`feature-checkbox-card ${features.booking ? 'selected' : ''}`}
                onClick={() => toggleFeature('booking')}
              >
                <input 
                  type="checkbox" 
                  checked={features.booking} 
                  onChange={() => {}}
                />
                <div className="feature-checkbox-info">
                  <strong>نظام حجوزات وجدول أوقات</strong>
                  <span>حجز مواعيد وتأكيدها لحظياً</span>
                </div>
                <span className="feature-checkbox-price">+${featurePrices.booking}</span>
              </div>

              <div 
                className={`feature-checkbox-card ${features.security ? 'selected' : ''}`}
                onClick={() => toggleFeature('security')}
              >
                <input 
                  type="checkbox" 
                  checked={features.security} 
                  onChange={() => {}}
                />
                <div className="feature-checkbox-info">
                  <strong>حماية متقدمة وتأمين خادم</strong>
                  <span>جدار حماية ضد الهجمات الخبيثة</span>
                </div>
                <span className="feature-checkbox-price">+${featurePrices.security}</span>
              </div>

            </div>
          </div>

          {/* Question 5: Hosting & Domain */}
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', color: 'var(--text-white)' }}>
              5. هل تحتاج لتجهيز الدومين وحجز الاستضافة السحابية لعام كامل؟
            </h3>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div 
                onClick={() => setHosting('yes')}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  border: hosting === 'yes' ? '2px solid var(--secondary-color)' : '1px solid var(--secondary-color)',
                  background: '#ffffff',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div>
                  <strong style={{ display: 'block', color: 'var(--primary-color)', fontSize: '0.95rem' }}>نعم، أريد استضافة ودومين</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)' }}>حجز وإعداد استضافة سحابية فائقة السرعة لسنة</span>
                </div>
                <span style={{ fontFamily: 'var(--font-english)', fontWeight: 700, color: 'var(--primary-color)' }}>+${hostingPrice}</span>
              </div>

              <div 
                onClick={() => setHosting('no')}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  border: hosting === 'no' ? '2px solid var(--secondary-color)' : '1px solid var(--secondary-color)',
                  background: '#ffffff',
                  borderRadius: 'var(--border-radius-md)',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div>
                  <strong style={{ display: 'block', color: 'var(--primary-color)', fontSize: '0.95rem' }}>لا أحتاج، الدومين متوفر لدي</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)' }}>لدي دومين واستضافة وسأقوم بتسليم بيانات الدخول</span>
                </div>
                <span style={{ fontFamily: 'var(--font-english)', fontWeight: 700, color: 'var(--primary-color)' }}>+$0</span>
              </div>
            </div>
          </div>

          {/* Form details: Description & Contact */}
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-white)' }}>
              6. صف لنا موقعك المطلوب ومعلومات الاتصال
            </h3>

            <div className="form-group">
              <label className="form-label" htmlFor="website-desc">اشرح لنا باختصار عن فكرتك ومتطلبات الموقع (مطلوب)</label>
              <textarea 
                id="website-desc"
                className="form-textarea" 
                rows="5" 
                placeholder="اكتب بالتفصيل مثلاً: موقع لبيع الهواتف، أريد ألواناً غامقة، أريد قائمة متحركة، ونظاماً للمستودع..."
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="client-name">الاسم بالكامل أو اسم الشركة (مطلوب)</label>
                <input 
                  id="client-name"
                  type="text" 
                  className="form-input" 
                  placeholder="أدخل اسمك الكريم" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="client-phone">رقم الهاتف للتواصل - واتساب (مطلوب)</label>
                <input 
                  id="client-phone"
                  type="tel" 
                  className="form-input" 
                  placeholder="مثال: 966500000000+" 
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Floating Sticky Price Box & Submit */}
        <div style={{ flex: 1, position: 'sticky', top: '100px' }}>
          <div className="quote-summary-panel">
            <h3 className="glow-text-magenta" style={{ fontSize: '1.25rem', marginBottom: '16px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px' }}>
              ملخص تسعير طلبك
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>نوع البنية الأساسية:</span>
                <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>
                  {websiteType === 'landing' && 'صفحة هبوط'}
                  {websiteType === 'corporate' && 'موقع شركات'}
                  {websiteType === 'ecommerce' && 'متجر إلكتروني'}
                  {websiteType === 'custom' && 'نظام مخصص'}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>حجم الصفحات:</span>
                <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>
                  {pagesCount === '1' && 'صفحة واحدة'}
                  {pagesCount === '2-5' && '2 - 5 صفحات'}
                  {pagesCount === '6-15' && '6 - 15 صفحة'}
                  {pagesCount === '15+' && '15+ صفحة'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>نمط الواجهات:</span>
                <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>
                  {designType === 'template' && 'قالب معدل'}
                  {designType === 'custom' && 'واجهات حصرية'}
                  {designType === 'premium' && 'تصميم تفاعلي'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>الدومين والاستضافة:</span>
                <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>
                  {hosting === 'yes' ? 'نعم (حجز لسنة)' : 'لا (لديك بالفعل)'}
                </span>
              </div>

              <div style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '12px', marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-white)', fontWeight: 600, fontSize: '0.95rem' }}>التسعيرة التقديرية النهائية:</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--secondary-color)', textShadow: '0 0 10px rgba(6, 182, 212, 0.3)', fontFamily: 'var(--font-english)' }}>
                      ${totalPrice.toLocaleString()}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>متوسط السعر العالمي</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSubmit} 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '14px', fontSize: '1.05rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              🚀 تأكيد تفاصيل الطلب والتسعير
            </button>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px', textAlign: 'center', lineHeight: '1.4' }}>
              * عند إرسال هذا النموذج، سنقوم بدراسة تفاصيل الوصف والتواصل معك مباشرة عبر الهاتف لبدء التطوير الفعلي لموقعك.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
