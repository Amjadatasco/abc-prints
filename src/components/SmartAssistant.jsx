import { useState, useRef, useEffect } from 'react';

export default function SmartAssistant({ orders = [], serviceRequests = [], setActiveTab, addToCart, addServiceRequest }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState('chat'); // 'chat', 'recommender', 'tracker', 'faq'
  const [selectedGoal, setSelectedGoal] = useState('restaurant');
  const [searchOrderId, setSearchOrderId] = useState('');
  const [trackedOrderResult, setTrackedOrderResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [appliedMsg, setAppliedMsg] = useState('');

  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'مرحباً بك في منصة ABC! 👋\nكيف يمكنني مساعدتك اليوم؟\nيمكنك سؤالي عن تصميم المواقع، خدمات الطباعة، التسويق، الباقات، أو تتبع طلبك.' }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTabMode, isOpen]);

  // Smart Packages Database
  const packages = {
    restaurant: {
      title: '🍽️ باقة المطاعم والكافيهات',
      desc: 'حزمة متكاملة لتأسيس انطباع احترافي للعملاء وزيادة الطلبات والتفاعل.',
      items: [
        'لوح أكريليك مضيء للمنيو أو الشعار (15$)',
        '10 تيشرتات قطنية مطبوعة DTF لطاقم العمل (180$)',
        '100 ملصق شعار مقاوم للماء UV DTF (40$)',
        'صفحة هبوط تعريفية + قائمة طعام إلكترونية (150$)'
      ],
      totalPrice: '385$',
      discountedPrice: '345$',
      actionType: 'webdev',
      serviceName: 'باقة المطاعم والكافيهات الشاملة (طباعة + موقع)'
    },
    ecommerce: {
      title: '🛍️ باقة افتتاح متجر إلكتروني',
      desc: 'بنية رقمية فائقة السرعة مع مطبوعات التغليف لبدء البيع مباشرة.',
      items: [
        'متجر إلكتروني احترافي مع سلة ودفع إلكتروني (1,100$)',
        '500 ملصق تغليف وتعبئة للعلب UV DTF (150$)',
        'حملة تسويقية ترويجية لإطلاق المتجر (500$)'
      ],
      totalPrice: '1,750$',
      discountedPrice: '1,550$',
      actionType: 'webdev',
      serviceName: 'باقة المتجر الإلكتروني وتغليف المنتجات'
    },
    company: {
      title: '🏢 باقة هوية الشركات والمؤسسات',
      desc: 'ترسيخ الهوية البصرية والمطبوعات الرسمية وموقع تعريفي فاخر.',
      items: [
        'موقع تعريفي للشركة (5-8 صفحات) (500$)',
        'تصميم هوية بصرية كاملة وشعار احترافي (300$)',
        '2 لوح أكريليك مضيء للمكتب والاستقبال (30$)',
        '20 كوب سيراميك فاخر بشعار الشركة (130$)'
      ],
      totalPrice: '960$',
      discountedPrice: '850$',
      actionType: 'webdev',
      serviceName: 'باقة هوية وموقع الشركة الفاخر'
    },
    personal: {
      title: '🎁 باقة الهدايا والمناسبات الشخصية',
      desc: 'تصاميم مخصصة وفريدة للطباعة على الأكواب والأكريليك والملصقات.',
      items: [
        'كوب سيراميك فاخر بتصميمك الخاص (6.50$)',
        'لوح أكريليك مضيء بإضاءة LED دافئة (15.00$)',
        'كوفر هاتف سيليكون مطبوع بارز (8.00$)'
      ],
      totalPrice: '29.50$',
      discountedPrice: '25.00$',
      actionType: 'custom_product',
      serviceName: 'باقة الهدايا الشخصية المخصصة'
    }
  };

  const handleApplyPackage = (pkg) => {
    if (pkg.actionType === 'custom_product' && typeof addToCart === 'function') {
      const priceNum = parseFloat(pkg.discountedPrice.replace('$', '')) || 25;
      addToCart({
        id: 'PKG-' + Date.now(),
        product: { name: pkg.title, price: priceNum, printClass: '', blendMode: 'blend-normal', tech: 'باقة هدايا' },
        designName: 'باقة هدايا شخصية مخصصة',
        price: priceNum,
        customDetails: { notes: pkg.desc }
      });
      setActiveTab('cart');
      setAppliedMsg(`تم إضافة ${pkg.title} إلى سلة التسوق بنجاح!`);
    } else if (typeof addServiceRequest === 'function') {
      addServiceRequest({
        id: 'PKG-' + Date.now(),
        type: 'Service',
        serviceKey: 'branding',
        serviceName: pkg.serviceName,
        clientName: 'طلب باقة ذكية',
        clientPhone: '00000000',
        projectDesc: `${pkg.title}\n${pkg.desc}\nالمحتويات:\n- ${pkg.items.join('\n- ')}\nالسعر التقديري: ${pkg.discountedPrice}`,
        budget: pkg.discountedPrice,
        status: 'pending',
        date: new Date().toLocaleDateString('ar-EG')
      });
      setActiveTab('services');
      setAppliedMsg(`تم تجهيز طلب ${pkg.title}! يمكنك إكمال باقي التفاصيل الآن.`);
    } else {
      setActiveTab(pkg.actionType === 'custom_product' ? 'customizer' : 'services');
      setAppliedMsg(`تم اختيار ${pkg.title}! يمكنك إكمال بيانات الطلب الآن.`);
    }
    setTimeout(() => setAppliedMsg(''), 4000);
  };

  const handleSearchOrder = (e) => {
    e.preventDefault();
    setHasSearched(true);
    const cleanId = searchOrderId.trim().toUpperCase();
    
    // Search in orders and inquiries
    const foundOrder = orders.find(o => o.id.toUpperCase() === cleanId);
    const foundInq = serviceRequests.find(s => s.id.toUpperCase() === cleanId);

    if (foundOrder) {
      setTrackedOrderResult({ type: 'order', data: foundOrder });
    } else if (foundInq) {
      setTrackedOrderResult({ type: 'inquiry', data: foundInq });
    } else {
      setTrackedOrderResult(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return { label: '⏳ قيد الانتظار والمعالجة', class: 'status-pending' };
      case 'processing': return { label: '⚡ قيد التنفيذ والإنتاج', class: 'status-processing' };
      case 'shipped': return { label: '🚚 تم الشحن والتسليم', class: 'status-shipped' };
      case 'completed': return { label: '✅ مكتمل بنجاح', class: 'status-shipped' };
      default: return { label: status, class: 'status-pending' };
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userText = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');
    
    setTimeout(() => {
      let botResponse = 'عذراً، لم أفهم سؤالك جيداً. يمكنك سؤالي عن الخدمات الرقمية، الطباعة، باقات الأعمال، أو تصميم المواقع.';
      const text = userText.toLowerCase();

      const matchWords = (words, str) => words.some(w => str.includes(w));

      if (matchWords(['موقع', 'ويب', 'برمج', 'تصميم', 'انشاء', 'متجر'], text)) {
        botResponse = 'لتصميم موقع إلكتروني احترافي معنا، نتبع الخطوات التالية:\n\n1️⃣ فهم متطلباتك ونشاطك التجاري بدقة.\n2️⃣ تصميم واجهة مستخدم (UI/UX) عصرية ومناسبة لهويتك.\n3️⃣ برمجة الموقع بأحدث التقنيات لضمان السرعة والأمان.\n4️⃣ حجز النطاق (الدومين) والاستضافة.\n5️⃣ الإطلاق والدعم الفني المستمر.\n\nيمكنك طلب الخدمة مباشرة من قسم "الخدمات الرقمية" أو "صمم موقعك".';
      } else if (matchWords(['طبع', 'منتج', 'كوب', 'كاس', 'اكريليك', 'تيشرت', 'قميص', 'هدي', 'ورق', 'كرت'], text)) {
        botResponse = 'نقدم خدمات طباعة مخصصة وتجارية بأعلى جودة (أكواب، أكريليك مضيء، ملصقات UV DTF، تيشرتات DTF).\n\nيمكنك رفع تصميمك مباشرة عبر قسم "صمم منتجك" أعلى الصفحة، أو حساب التكلفة للكميات الكبيرة عبر "حاسبة الطباعة".';
      } else if (matchWords(['تسويق', 'دعاي', 'رقمي', 'اعلان', 'سوشال'], text)) {
        botResponse = 'نقدم خدمات تسويق إلكتروني شاملة، تشمل:\n- إدارة الحملات الإعلانية الممولة.\n- تصميم الهوية البصرية الجذابة.\n- إدارة حسابات التواصل الاجتماعي.\n\nتفضل بزيارة قسم "الخدمات الرقمية" لطلب الخدمة.';
      } else if (matchWords(['باق', 'عروض', 'سعر', 'بكم', 'تكلف'], text)) {
        botResponse = 'لدينا باقات مميزة ومخفضة تناسب مختلف الاحتياجات (للمطاعم، المتاجر الإلكترونية، الشركات، والهدايا الشخصية).\n\nيمكنك تصفح جميع الباقات وطلبها مباشرة من قسم "💡 باقات موصى بها" في هذا المساعد.';
      } else if (matchWords(['تتبع', 'طلب', 'حالة', 'رقم'], text)) {
        botResponse = 'يمكنك تتبع حالة طلبك مباشرة وبكل سهولة!\nانتقل إلى قسم "🔍 تتبع طلبك" في أعلى هذا المساعد وأدخل رقم طلبك.';
      } else if (matchWords(['تواصل', 'دعم', 'مساعد', 'رقمكم', 'واتس', 'اتصل'], text)) {
        botResponse = 'نحن دائماً في خدمتك! يمكنك التواصل مع فريق الدعم الفني والمبيعات عبر الواتساب على الرقم: 966501234567+ أو من خلال نموذج الاتصال في الموقع.';
      } else if (matchWords(['سلام', 'مرحبا', 'هلا', 'السلام', 'مسا', 'صباح'], text)) {
        botResponse = 'أهلاً بك في ABC للطباعة والإعلان! كيف يمكنني خدمتك وتلبية احتياجات مشروعك اليوم؟';
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div 
        className="smart-assistant-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="مستشار ABC الذكي"
      >
        <span className="smart-assistant-icon">🤖</span>
        <span className="smart-assistant-badge">مساعد ABC الذكي</span>
      </div>

      {/* Floating Drawer / Modal */}
      {isOpen && (
        <div className="smart-assistant-modal fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="smart-assistant-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>🤖</span>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>مستشار ABC الذكي</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary-color)' }}>متصل ومستعد لمساعدتك</span>
              </div>
            </div>
            <button className="digital-modal-close" onClick={() => setIsOpen(false)}>&times;</button>
          </div>

          {/* Nav Tabs */}
          <div className="smart-assistant-tabs" style={{ flexShrink: 0 }}>
            <button 
              className={`smart-tab-btn ${activeTabMode === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTabMode('chat')}
            >
              💬 تحدث معي
            </button>
            <button 
              className={`smart-tab-btn ${activeTabMode === 'recommender' ? 'active' : ''}`}
              onClick={() => setActiveTabMode('recommender')}
            >
              💡 باقات ذكية
            </button>
            <button 
              className={`smart-tab-btn ${activeTabMode === 'tracker' ? 'active' : ''}`}
              onClick={() => setActiveTabMode('tracker')}
            >
              🔍 تتبع طلبك
            </button>
          </div>

          <div className="smart-assistant-body" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {appliedMsg && (
              <div className="toast-notification success-toast" style={{ marginBottom: '14px', fontSize: '0.85rem', flexShrink: 0 }}>
                ✅ {appliedMsg}
              </div>
            )}

            {/* TAB 0: Chatbot */}
            {activeTabMode === 'chat' && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '300px' }}>
                <div className="chat-messages-container" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '12px' }}>
                  {messages.map((msg, idx) => (
                    <div key={idx} style={{ 
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', 
                      background: msg.role === 'user' ? 'var(--primary-color)' : 'var(--panel-bg)', 
                      color: msg.role === 'user' ? '#fff' : 'var(--text-main)', 
                      border: msg.role === 'user' ? 'none' : '1px solid var(--panel-border)',
                      padding: '10px 14px', 
                      borderRadius: msg.role === 'user' ? '14px 14px 0 14px' : '14px 14px 14px 0',
                      maxWidth: '85%',
                      fontSize: '0.85rem',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}>
                      {msg.role === 'bot' && <span style={{fontSize:'1rem', marginLeft:'6px', display: 'inline-block'}}>🤖</span>}
                      {msg.text}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="اكتب سؤالك هنا... (مثال: كيف اصمم موقع)" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    style={{ flex: 1, fontSize: '0.85rem', padding: '10px' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0 16px' }} disabled={!chatInput.trim()}>
                    إرسال
                  </button>
                </form>
              </div>
            )}

            {/* TAB 1: Smart Recommender */}
            {activeTabMode === 'recommender' && (
              <div className="fade-in">
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  حدد نشاطك التجاري أو هدفك وسيقوم المستشار الذكي باقتراح الحزمة الأمثل لك:
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <button 
                    className={`btn ${selectedGoal === 'restaurant' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '0.78rem', padding: '6px 10px', borderRadius: '16px' }}
                    onClick={() => setSelectedGoal('restaurant')}
                  >
                    🍽️ مطعم / كافيه
                  </button>
                  <button 
                    className={`btn ${selectedGoal === 'ecommerce' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '0.78rem', padding: '6px 10px', borderRadius: '16px' }}
                    onClick={() => setSelectedGoal('ecommerce')}
                  >
                    🛍️ متجر إلكتروني
                  </button>
                  <button 
                    className={`btn ${selectedGoal === 'company' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '0.78rem', padding: '6px 10px', borderRadius: '16px' }}
                    onClick={() => setSelectedGoal('company')}
                  >
                    🏢 شركة / مكتب
                  </button>
                  <button 
                    className={`btn ${selectedGoal === 'personal' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '0.78rem', padding: '6px 10px', borderRadius: '16px' }}
                    onClick={() => setSelectedGoal('personal')}
                  >
                    🎁 هدايا مخصصة
                  </button>
                </div>

                {/* Selected Package Display */}
                {packages[selectedGoal] && (
                  <div className="glass-panel" style={{ padding: '14px', borderRight: '4px solid var(--secondary-color)', background: 'rgba(6, 182, 212, 0.03)' }}>
                    <h5 style={{ fontSize: '0.95rem', color: 'var(--text-white)', marginBottom: '6px' }}>
                      {packages[selectedGoal].title}
                    </h5>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      {packages[selectedGoal].desc}
                    </p>
                    <ul style={{ paddingRight: '16px', fontSize: '0.8rem', color: 'var(--text-main)', marginBottom: '12px' }}>
                      {packages[selectedGoal].items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{item}</li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px dashed var(--panel-border)' }}>
                      <div>
                        <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '6px' }}>
                          {packages[selectedGoal].totalPrice}
                        </span>
                        <strong style={{ color: 'var(--secondary-color)', fontSize: '1.05rem', fontFamily: 'var(--font-english)' }}>
                          {packages[selectedGoal].discountedPrice}
                        </strong>
                      </div>
                      <button 
                        className="btn btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                        onClick={() => handleApplyPackage(packages[selectedGoal])}
                      >
                        ⚡ اطلب هذه الباقة
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Live Order Tracker */}
            {activeTabMode === 'tracker' && (
              <div className="fade-in">
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  أدخل رقم طلبك (مثال: CART-384950 أو COMM-102948 أو SERV-910283) للاطلاع على حالته المباشرة:
                </p>

                <form onSubmit={handleSearchOrder} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="رقم الطلب..."
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                    بحث
                  </button>
                </form>

                {hasSearched && (
                  <div>
                    {trackedOrderResult ? (
                      <div className="glass-panel" style={{ padding: '14px', borderRight: '4px solid var(--primary-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '0.9rem', color: 'var(--text-white)' }}>{trackedOrderResult.data.id}</strong>
                          <span className={`status-badge ${getStatusBadge(trackedOrderResult.data.status).class}`} style={{ fontSize: '0.75rem' }}>
                            {getStatusBadge(trackedOrderResult.data.status).label}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.8rem', margin: '4px 0', color: 'var(--text-main)' }}>
                          <strong>الطلب:</strong> {trackedOrderResult.data.productName || trackedOrderResult.data.serviceName || trackedOrderResult.data.machine}
                        </p>
                        <p style={{ fontSize: '0.8rem', margin: '4px 0', color: 'var(--text-muted)' }}>
                          <strong>العميل:</strong> {trackedOrderResult.data.customerName || trackedOrderResult.data.clientName || trackedOrderResult.data.companyName || '-'}
                        </p>
                        <p style={{ fontSize: '0.8rem', margin: '4px 0', color: 'var(--secondary-color)', fontFamily: 'var(--font-english)' }}>
                          <strong>التكلفة:</strong> ${trackedOrderResult.data.price || trackedOrderResult.data.productPrice || trackedOrderResult.data.budget || 'حسب التقدير'}
                        </p>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '16px', color: 'var(--accent-red)', fontSize: '0.85rem' }}>
                        ❌ لم يتم العثور على طلب بهذا الرقم. يرجى التأكد من الرقم أو التواصل معنا عبر الواتساب.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
