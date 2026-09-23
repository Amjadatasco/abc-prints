import { useState } from 'react';

// Pricing rates
const rates = {
  'uv-flatbed': { 
    name: 'UV Flatbed 6090 (طباعة مسطحة أكريليك/خشب)', 
    type: 'area', 
    ratePerM2: 35.0, 
    baseSetup: 5.0 
  },
  'dtf-60': { 
    name: 'DTF 60cm (رول طباعة منسوجات)', 
    type: 'linear-meter', 
    ratePerMeter: 15.0 
  },
  'uv-dtf-60': { 
    name: 'UV DTF 60cm (رول ملصقات نقل الشعار)', 
    type: 'linear-meter', 
    ratePerMeter: 22.0 
  }
};

export default function CommercialCalculator({ addCommercialOrder }) {
  const [machine, setMachine] = useState('dtf-60');
  const [width, setWidth] = useState(60); // Locked at 60 for DTF rolls
  const [height, setHeight] = useState(100); // Default to 100cm (1 meter)
  const [quantity, setQuantity] = useState(5);
  const [companyName, setCompanyName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleMachineChange = (newMachine) => {
    setMachine(newMachine);
    if (newMachine === 'dtf-60' || newMachine === 'uv-dtf-60') {
      setWidth(60);
    }
  };

  const effectiveWidth = (machine === 'dtf-60' || machine === 'uv-dtf-60') ? 60 : width;
  const activeRate = rates[machine];
  const area = effectiveWidth * height;

  const unitPrice = activeRate.type === 'linear-meter' 
    ? (height / 100) * activeRate.ratePerMeter 
    : activeRate.baseSetup + (area * 0.0035);

  const subtotal = unitPrice * quantity;

  let discountPercent = 0;
  if (quantity >= 100) {
    discountPercent = 30;
  } else if (quantity >= 50) {
    discountPercent = 20;
  } else if (quantity >= 10) {
    discountPercent = 10;
  }

  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal - discountAmount;

  const priceDetails = {
    area,
    unitPrice: unitPrice.toFixed(2),
    subtotal: subtotal.toFixed(2),
    discountPercent,
    discountAmount: discountAmount.toFixed(2),
    total: total.toFixed(2)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName || !contactPhone) {
      alert('يرجى تعبئة الاسم ورقم الهاتف لإرسال طلب الطباعة.');
      return;
    }

    const newOrder = {
      id: 'COMM-' + Date.now(),
      type: 'Commercial',
      companyName,
      contactPhone,
      machine: rates[machine].name,
      width: machine === 'uv-flatbed' ? width : 60,
      height,
      quantity,
      price: priceDetails.total,
      notes,
      status: 'pending',
      date: new Date().toLocaleDateString('ar-EG')
    };

    addCommercialOrder(newOrder);
    setSuccessMsg(true);
    setCompanyName('');
    setContactPhone('');
    setNotes('');

    setTimeout(() => {
      setSuccessMsg(false);
    }, 5000);
  };

  return (
    <div className="container fade-in" style={{ paddingBottom: '60px' }}>
      {/* Standardized Page Header */}
      <section className="hero-sec" style={{ padding: '20px 0 28px' }}>
        <div className="hero-badge">
          📊 حاسبة الطباعة الرقمية والتجارية
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.6rem' }}>
          حاسبة تكلفة الطباعة المباشرة
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.05rem', maxWidth: '800px' }}>
          احسب تكلفة مطبوعاتك الرقمية واللفافات بدقة مبنية على الأسعار العالمية والمقاييس القياسية مع تطبيق خصومات الكميات التلقائية.
        </p>
      </section>

      {successMsg && (
        <div className="glass-panel" style={{ borderColor: 'var(--accent-green)', background: 'rgba(5, 150, 105, 0.05)', color: 'var(--accent-green)', padding: '16px', borderRadius: '10px', textAlign: 'center', marginBottom: '24px' }}>
          <h4>🎉 تم تسجيل طلب الطباعة بنجاح!</h4>
          <p style={{ color: 'var(--accent-green)', marginTop: '4px' }}>يقوم قسم الإنتاج بمراجعة طلبك للتواصل وتأكيد استلام ملفات التصميم للبدء بالطباعة الفورية.</p>
        </div>
      )}

      <div className="calc-container">
        
        {/* Left Side: Inputs */}
        <div className="glass-panel">
          <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--primary-color)' }}>تفاصيل الطباعة والماكينات</h3>
          
          <form onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label className="form-label">الماكينة ونوع الطباعة</label>
              <select className="form-select" value={machine} onChange={(e) => handleMachineChange(e.target.value)}>
                <option value="dtf-60">DTF 60cm (رول طباعة منسوجات - $15 للمتر الطولي)</option>
                <option value="uv-dtf-60">UV DTF 60cm (رول ستيكرات نقل - $22 للمتر الطولي)</option>
                <option value="uv-flatbed">UV Flatbed 6090 (طباعة مسطحة أكريليك/خشب - $35 للمتر المربع)</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">عرض الطباعة (سم)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={width} 
                  disabled={machine !== 'uv-flatbed'}
                  onChange={(e) => {
                    const val = e.target.value;
                    setWidth(val === '' ? '' : Math.max(2, parseInt(val) || 2));
                  }}
                  style={{ opacity: machine !== 'uv-flatbed' ? 0.6 : 1 }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {machine === 'uv-flatbed' ? 'الحد الأقصى 60 سم' : 'ثابت لعرض الرول'}
                </span>
              </div>
              <div className="form-group">
                <label className="form-label">
                  {machine === 'uv-flatbed' ? 'ارتفاع الطباعة (سم)' : 'طول الرول المطلوب (سم)'}
                </label>
                <input 
                  type="number" 
                  className="form-input" 
                  min="5" 
                  value={height} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setHeight(val === '' ? '' : Math.max(5, parseInt(val) || 5));
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {machine === 'uv-flatbed' ? 'الحد الأقصى 90 سم' : 'أدخل الطول بالسنتيمتر'}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">الكمية المطلوبة (عدد النسخ)</label>
              <input 
                type="number" 
                className="form-input" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>خصم 10+ قطع: 10%</span>
                <span>خصم 50+ قطعة: 20%</span>
                <span>خصم 100+ قطعة: 30%</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--panel-border)', margin: '20px 0' }} />

            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', color: 'var(--primary-color)' }}>معلومات العميل والاتصال</h3>

            <div className="form-group">
              <label className="form-label">الاسم الكامل / اسم الشركة</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="أدخل اسمك أو اسم منشأتك" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">رقم الهاتف للتواصل (واتساب)</label>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="مثال: 966500000000+" 
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">ملاحظات إضافية أو تفاصيل الطباعة</label>
              <textarea 
                className="form-textarea" 
                rows="3" 
                placeholder="اكتب هنا أي تفاصيل تهم الفنيين قبل بدء العمل..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              📤 إرسال طلب الطباعة وجدولة الإنتاج
            </button>

          </form>
        </div>

        {/* Right Side: Visualizer & Price Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Sizing Visualizer */}
          <div className="glass-panel-cyan" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>مخطط الحجم التقريبي للطباعة</h3>
            
            <div className="visualize-box">
              <div className="visualize-grid"></div>
              <div 
                className="visualize-rect"
                style={{
                  width: `${Math.min(100, Math.max(15, (width / 60) * 100))}%`,
                  height: `${Math.min(100, Math.max(10, (height / 200) * 100))}%`
                }}
              >
                <div className="visualize-label">{width} × {height} سم</div>
                <div className="visualize-dim-h">العرض: {width} سم</div>
                <div className="visualize-dim-v">الارتفاع: {height} سم</div>
              </div>
            </div>
            
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px' }}>
              {rates[machine].type === 'linear-meter' 
                ? `المخطط يوضح طول الرول مقارنة بـ 2 متر طولي بعرض رول ثابت 60 سم.`
                : `المخطط يوضح المساحة المطلوبة مقارنة بمنطقة العمل القصوى للماكينة المسطحة (60 × 90 سم).`
              }
            </p>
          </div>

          {/* Pricing Breakdown */}
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>تقدير التكلفة الإجمالية</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>طريقة التسعير:</span>
                <span style={{ color: 'var(--text-white)' }}>
                  {rates[machine].type === 'linear-meter' ? 'بالمتر الطولي (رول)' : 'بالمساحة (متر مربع)'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>مساحة / طول التصميم:</span>
                <span style={{ fontFamily: 'var(--font-english)' }}>
                  {rates[machine].type === 'linear-meter' 
                    ? `${(height / 100).toFixed(2)} متر طولي`
                    : `${width}×${height} سم (${(width*height/10000).toFixed(3)} م²)`
                  }
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>سعر الوحدة التقديري:</span>
                <span style={{ fontFamily: 'var(--font-english)', color: 'var(--text-white)' }}>${priceDetails.unitPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>الكمية المطلوبة:</span>
                <span style={{ fontFamily: 'var(--font-english)' }}>{quantity} قطع / نسخ</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>المجموع الكلي:</span>
                <span style={{ fontFamily: 'var(--font-english)' }}>${priceDetails.subtotal}</span>
              </div>
              
              {priceDetails.discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-green)' }}>
                  <span>خصم الكمية ({priceDetails.discountPercent}%):</span>
                  <span style={{ fontFamily: 'var(--font-english)' }}>-${priceDetails.discountAmount}</span>
                </div>
              )}

              <hr style={{ border: 'none', borderTop: '1px solid var(--panel-border)', margin: '10px 0' }} />

              <div className="price-card">
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>الإجمالي التقديري للطلب</div>
                <div className="price-value">${priceDetails.total}</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>تقدير نهائي مبدئي بناءً على الأسعار القياسية العالمية</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
