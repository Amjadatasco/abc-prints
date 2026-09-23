import { useState } from 'react';

export default function DigitalServices({ addServiceRequest }) {
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [serviceType, setServiceType] = useState('marketing');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('500-1000');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [success, setSuccess] = useState(false);

  const servicesData = [
    {
      id: 'marketing',
      icon: '📈',
      tag: 'تسويق ونمو',
      title: 'التسويق الإلكتروني وإدارة الحملات',
      color: 'var(--primary-color)',
      borderColor: 'var(--panel-border-cyan)',
      summary: 'نصمم ونطلق حملات إعلانية ممولة ومستهدفة بدقة لضمان وصول خدماتك ومنتجاتك للجمهور المناسب وزيادة مبيعاتك حقيقياً.',
      features: [
        'إعلانات فيسبوك، إنستغرام، تيك توك وسناب شات',
        'حملات شبكة البحث وإعلانات يوتيوب (Google Ads)',
        'إدارة حسابات التواصل الاجتماعي وصناعة المحتوى',
        'تحسين محركات البحث (SEO) لظهور موقعك في النتائج الأولى'
      ],
      packages: [
        { name: 'باقة الانطلاق (Starter)', price: '$300 – $500 / شهرياً', budgetVal: '500-1000', desc: 'حملة إعلانية ممولة على منصتين + تصميم 8 بوستات إعلانية + تقرير أسبوعي' },
        { name: 'باقة النمو (Growth)', price: '$600 – $1,200 / شهرياً', budgetVal: '500-1000', desc: 'حملات ممولة على جميع المنصات + إعلانات Google + إدارة حسابات + Reels' },
        { name: 'الباقة الشاملة (Enterprise)', price: '$1,500+ / شهرياً', budgetVal: '1100-2400', desc: 'خطة تسويقية شاملة + استهداف بدقة وتتبع التحويلات + SEO + مدير حساب مخصص' }
      ]
    },
    {
      id: 'webdev',
      icon: '💻',
      tag: 'تطوير وبرمجة',
      title: 'إنشاء وتطوير المواقع والويب',
      color: 'var(--secondary-color)',
      borderColor: 'rgba(217, 70, 239, 0.3)',
      summary: 'نبني لك متجراً إلكترونياً أو موقعاً تعريفياً لشركتك بأحدث التقنيات العالمية، مع تجربة مستخدم فائقة السرعة وتصاميم توافق هويتك.',
      features: [
        'إنشاء متاجر إلكترونية متكاملة (سلة، شوبيفاي، أو برمجة خاصة)',
        'تصميم صفحات هبوط (Landing Pages) فائقة السرعة للمنتجات',
        'مواقع تعريفية للشركات والمؤسسات باللغتين العربية والإنكليزية',
        'تطوير تطبيقات الموبايل ولائحة تحكم برمجية سهلة'
      ],
      packages: [
        { name: 'صفحة هبوط (Landing Page)', price: '$50 – $150', budgetVal: '50-150', desc: 'صفحة واحدة سريعة ومصممة لزيادة المبيعات والتحويلات مع ربط الواتساب والدفع' },
        { name: 'موقع تعريفي للشركات (5-8 صفحات)', price: '$200 – $500', budgetVal: '200-500', desc: 'موقع كامل يعرض خدمات شركتك وفريق العمل وأعمالك السابقة مع نموذج تواصل ذكي' },
        { name: 'متجر إلكتروني احترافي', price: '$600 – $1,200', budgetVal: '600-1100', desc: 'متجر إلكتروني كامل مع بوابة دفع إلكترونية، إدارة المخزون، ونظام تتبع الطلبات' },
        { name: 'تطبيق موبايل (Android / iOS)', price: '$1,900 – $4,900', budgetVal: '1900-4900', desc: 'تطبيق جوال متكامل للشركات والمتاجر مع إشعارات فورية ولوحة تحكم' }
      ]
    },
    {
      id: 'branding',
      icon: '🎨',
      tag: 'هوية وإبداع',
      title: 'تصميم الهوية البصرية والدعاية',
      color: 'var(--accent-amber)',
      borderColor: 'rgba(217, 119, 6, 0.3)',
      summary: 'الهوية البصرية هي روح شركتك. نبتكر لك شعاراً وهوية بصرية كاملة تعبر عن قيم مشروعك وتترك انطباعاً راسخاً لدى عملائك.',
      features: [
        'تصميم الشعارات وتحديد لغة الألوان والخطوط الرسمية',
        'تصميم مطبوعات الشركات (بروشورات، كروت عمل، رول أب)',
        'تصميم عبوات التغليف والعلب والملصقات التجارية',
        'هندسة وتصميم اللافتات الإعلانية للدعاية الخارجية والداخلية'
      ],
      packages: [
        { name: 'شعار احترافي (Logo Design)', price: '$100 – $250', budgetVal: '50-150', desc: '3 نماذج شعار مبتكرة اختيارية + الملفات المصدرية المفتوحة vector' },
        { name: 'هوية بصرية أساسية (Brand Kit)', price: '$300 – $600', budgetVal: '200-500', desc: 'شعار + كروت عمل + ورقيات مكاتب + تصميم الفولدر والظروف الرسمية' },
        { name: 'دليل هوية بصرية شامل (Full Suite)', price: '$700 – $1,500', budgetVal: '700-1400', desc: 'هوية كاملة + دليل الاستخدام البصري + تصميم التغليف والمطبوعات والتطبيقات' }
      ]
    }
  ];

  const handleOpenDetail = (serv) => {
    setSelectedServiceModal(serv);
    setServiceType(serv.id);
  };

  const handleSelectPackage = (servId, pkg) => {
    setServiceType(servId);
    setSelectedPackage(pkg.name);
    if (pkg.budgetVal) {
      setEstimatedBudget(pkg.budgetVal);
    }
    setProjectDesc(`طلب خدمة: ${pkg.name} (${pkg.price})\n\n[اكتب هنا التفاصيل الخاصة بمشروعك ومتطلباتك...]`);
    
    // Smooth scroll down to request form section
    const formElement = document.querySelector('.request-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !projectDesc) {
      alert('يرجى ملء جميع الحقول المطلوبة لتقديم طلب الخدمة.');
      return;
    }

    const serviceLabels = {
      'marketing': 'التسويق الإلكتروني وإدارة الحملات',
      'webdev': 'إنشاء وتطوير مواقع إلكترونية',
      'branding': 'تصميم هوية بصرية ودعاية'
    };

    const newRequest = {
      id: 'SERV-' + Date.now(),
      type: 'Service',
      serviceKey: serviceType,
      serviceName: serviceLabels[serviceType] || serviceType,
      selectedPackage,
      clientName,
      clientPhone,
      projectDesc,
      budget: estimatedBudget,
      status: 'pending',
      date: new Date().toLocaleDateString('ar-EG')
    };

    addServiceRequest(newRequest);
    setSuccess(true);
    setClientName('');
    setClientPhone('');
    setProjectDesc('');
    setSelectedPackage('');

    setTimeout(() => {
      setSuccess(false);
    }, 6000);
  };

  return (
    <div className="container fade-in" style={{ paddingBottom: '60px' }}>
      
      {/* Header Banner */}
      <section className="hero-sec" style={{ padding: '30px 0 20px' }}>
        <div className="hero-badge">
          🌐 حلول رقمية وإبداعية متكاملة لتنمية أعمالك
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.1rem' }}>
          الخدمات الرقمية والحلول الإعلانية
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '0.95rem', maxWidth: '750px' }}>
          نرافقك في الفضاء الرقمي لتأسيس حضور قوي لشركتك من خلال التسويق الاحترافي وبناء المتاجر والمواقع وهندسة الهوية البصرية.
        </p>
      </section>

      {/* ── Equal Height Uniform Services Cards Grid ── */}
      <div className="services-equal-grid" style={{ marginBottom: '60px' }}>
        {servicesData.map((serv) => (
          <div 
            key={serv.id}
            className="glass-panel service-card-equal"
            style={{ borderTop: `4px solid ${serv.color}`, borderColor: serv.borderColor }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '2.4rem' }}>{serv.icon}</div>
              <span className="machine-tag" style={{ background: 'rgba(2, 132, 199, 0.08)', color: serv.color, borderColor: serv.color }}>
                {serv.tag}
              </span>
            </div>

            <h3 style={{ fontSize: '1.35rem', marginBottom: '12px', color: 'var(--text-white)' }}>
              {serv.title}
            </h3>

            <p style={{ fontSize: '0.9rem', marginBottom: '20px', flex: '0 0 auto' }}>
              {serv.summary}
            </p>

            <ul className="machine-features" style={{ marginBottom: '24px', flex: '1 0 auto' }}>
              {serv.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>

            <div className="card-footer-actions" style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--panel-border)', display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => handleOpenDetail(serv)}
                style={{ flex: 1, padding: '10px 14px', fontSize: '0.85rem' }}
              >
                🔍 المزيد والباقات
              </button>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => {
                  setServiceType(serv.id);
                  const formElement = document.querySelector('.request-form-section');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{ padding: '10px 14px', fontSize: '0.85rem', borderColor: serv.color, color: serv.color }}
              >
                📝 طلب استشارة
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Clean & Balanced Request Consultation Form Section ── */}
      <div className="request-form-section cart-layout" style={{ alignItems: 'stretch' }}>
        
        {/* Form Container */}
        <div className="glass-panel" style={{ flex: '1 1 600px', borderRight: '4px solid var(--primary-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.4rem' }} className="glow-text-cyan">📝 طلب استشارة أو خدمة رقمية</h3>
            {selectedPackage && (
              <span className="machine-tag" style={{ background: '#f0f9ff', color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
                الباقة المحددة: {selectedPackage}
              </span>
            )}
          </div>
          
          {success && (
            <div className="glass-panel" style={{ borderColor: '#22c55e', background: 'rgba(34, 197, 94, 0.08)', color: '#15803d', padding: '14px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px' }}>
              <h4>🎉 تم استلام طلبك بنجاح!</h4>
              <p style={{ color: '#166534', marginTop: '4px', fontSize: '0.85rem' }}>سيقوم خبيرنا الرقمي بالتواصل معك عبر واتساب لمناقشة التفاصيل خلال 24 ساعة.</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">الخدمة المطلوبة</label>
              <select 
                className="form-select" 
                value={serviceType} 
                onChange={(e) => {
                  setServiceType(e.target.value);
                  setSelectedPackage('');
                }}
              >
                <option value="marketing">التسويق الإلكتروني وإدارة الحملات</option>
                <option value="webdev">إنشاء وتطوير موقع إلكتروني أو متجر</option>
                <option value="branding">تصميم الهوية البصرية والبراندينغ</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">الاسم الكامل / اسم المنشأة</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="أدخل اسمك أو اسم شركتك" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">رقم الهاتف للتواصل (واتساب)</label>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="مثال: 966500000000+" 
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">الميزانية التقديرية للمشروع (بالدولار $)</label>
              <select className="form-select" value={estimatedBudget} onChange={(e) => setEstimatedBudget(e.target.value)}>
                <option value="50-150">$50 - $150 (صفحة هبوط / شعار)</option>
                <option value="200-500">$200 - $500 (موقع تعريفي / هوية)</option>
                <option value="500-900">$500 - $900 (موقع شركة احترافي)</option>
                <option value="600-1100">$600 - $1,100 (متجر بسيط / حملة)</option>
                <option value="1100-2400">$1,100 - $2,400 (متجر احترافي / تطبيق)</option>
                <option value="700-1400">$700 - $1,400 (دليل هوية شامل / عقاري)</option>
                <option value="1900-4900">$1,900 - $4,900 (تطبيق جوال Android + iOS)</option>
                <option value="4900-14900">$4,900 - $14,900 (نظام إدارة ERP / CRM)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">اشرح لنا باختصار عن فكرتك ومتطلباتك</label>
              <textarea 
                className="form-textarea" 
                rows="4" 
                placeholder="اكتب هنا ما تريده في موقعك أو حملتك الإعلانية بالتفصيل..."
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
              🚀 إرسال طلب الخدمة والاستشارة المجانية
            </button>
          </form>
        </div>

        {/* Info Column */}
        <div className="glass-panel" style={{ flex: '1 1 360px', background: 'rgba(2, 132, 199, 0.02)', borderLeft: '4px solid var(--secondary-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 className="glow-text-magenta" style={{ fontSize: '1.25rem', marginBottom: '16px' }}>لماذا تختار خدمات ABC الرقمية؟</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>
              نحن ندمج بين الإبداع الفني والتحليل البرمجي والتسويقي لتقديم حلول شاملة تنعكس على مبيعاتك مباشرة:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>🎯</span>
                <div>
                  <strong>استهداف مبني على البيانات:</strong> لا ننفق ميزانيتك عشوائياً، بل نحلل جمهورك المستهدف بدقة لنضمن أعلى عائد استثماري (ROI).
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>⚡</span>
                <div>
                  <strong>سرعة وأمان في التطوير:</strong> نبرمج مواقع بمقاييس عالمية فائقة السرعة ومتوافقة تماماً مع محركات البحث للهواتف والكمبيوتر.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>💎</span>
                <div>
                  <strong>هوية بصرية فريدة:</strong> نبتعد عن القوالب الجاهزة ونصنع هوية بصرية مخصصة تحكي قصة نجاح شركتك وتجذب الأنظار.
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '14px', background: '#ffffff', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--panel-border)' }}>
            <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-muted)' }}>
              💬 هل تفضل التواصل الفوري المباشر؟ تواصل مع مهندس المشاريع عبر واتساب مباشرة: 
              <strong style={{ display: 'block', marginTop: '6px', color: 'var(--primary-color)', fontSize: '0.95rem' }}>WhatsApp: +966 50 000 0000</strong>
            </p>
          </div>
        </div>

      </div>

      {/* ── Interactive Full Details Modal (صفحة/نافذة التفاصيل الكاملة والباقات) ── */}
      {selectedServiceModal && (
        <div className="digital-modal-overlay" onClick={() => setSelectedServiceModal(null)}>
          <div className="digital-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', width: '92%' }}>
            
            <div className="digital-modal-header" style={{ borderBottom: `2px solid ${selectedServiceModal.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '2rem' }}>{selectedServiceModal.icon}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-white)' }}>{selectedServiceModal.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>تفاصيل الخدمة والباقات المقترحة</span>
                </div>
              </div>
              <button 
                type="button" 
                className="digital-modal-close" 
                onClick={() => setSelectedServiceModal(null)}
              >
                &times;
              </button>
            </div>
            
            <div className="digital-modal-body" style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>
                {selectedServiceModal.summary}
              </p>

              <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--primary-color)' }}>
                📦 الباقات وخيارات المواصفات والأسعار:
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {selectedServiceModal.packages.map((pkg, idx) => (
                  <div 
                    key={idx}
                    className="glass-panel"
                    style={{ padding: '16px', border: '1px solid var(--panel-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <h5 style={{ fontSize: '1rem', marginBottom: '6px', color: 'var(--text-white)' }}>{pkg.name}</h5>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: selectedServiceModal.color, marginBottom: '10px', fontFamily: 'var(--font-english)' }}>
                        {pkg.price}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.5' }}>
                        {pkg.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-cyan"
                      onClick={() => handleSelectPackage(selectedServiceModal.id, pkg)}
                      style={{ width: '100%', padding: '8px 12px', fontSize: '0.85rem' }}
                    >
                      👈 اختيار هذه الباقة وطلبها
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '16px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--panel-border)' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>💡 هل لديك متطلبات خاصة أو مشروع مخصص؟</span>
                <button 
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setServiceType(selectedServiceModal.id);
                    setSelectedServiceModal(null);
                    const formElement = document.querySelector('.request-form-section');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  📝 طلب استشارة مخصصة
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
