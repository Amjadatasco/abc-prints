import { useState } from 'react';

export default function Cart({ cartItems, removeFromCart, checkoutCart }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [success, setSuccess] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('السلة فارغة حالياً!');
      return;
    }

    if (!customerName || !customerPhone || !customerCity || !customerAddress) {
      alert('يرجى تعبئة كافة الحقول لإتمام الطلب.');
      return;
    }

    // 1. Generate Order objects for Local Admin Dashboard
    const newOrders = cartItems.map((item) => ({
      id: 'CART-' + Math.floor(Math.random() * 1000000),
      type: 'CustomProduct',
      productName: item.product.name,
      productPrice: item.price,
      design: item.design,
      designName: item.designName,
      customDetails: item.customDetails,
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      status: 'pending',
      date: new Date().toLocaleDateString('ar-EG')
    }));

    // Save to App State (Simulated Database)
    checkoutCart(newOrders);
    setSuccess(true);

    // 2. Generate WhatsApp formatted link for Customer Order Placement
    let productsText = '';
    cartItems.forEach((item, index) => {
      productsText += `${index + 1}. ${item.product.name} - ($${item.price.toFixed(2)})\n`;
      productsText += `   - التصميم: ${item.designName}\n`;
      if (item.customDetails && item.customDetails.customText) {
        productsText += `   - النص المكتوب: "${item.customDetails.customText}"\n`;
      }
    });

    const whatsappText = `مرحباً ABC، أريد تأكيد طلب جديد من الموقع:\n\n` +
      `👤 معلومات المستلم:\n` +
      `- الاسم: ${customerName}\n` +
      `- رقم الهاتف: ${customerPhone}\n` +
      `- المدينة: ${customerCity}\n` +
      `- العنوان بالتفصيل: ${customerAddress}\n\n` +
      `📦 المنتجات المطلوبة:\n${productsText}\n` +
      `💰 المجموع الإجمالي: $${totalAmount.toFixed(2)}\n` +
      `🚚 الشحن: شحن سريع يستغرق من يوم إلى 3 أيام عمل\n\n` +
      `شكراً لكم!`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=966500000000&text=${encodedText}`;

    // Clear Form Fields
    setCustomerName('');
    setCustomerPhone('');
    setCustomerCity('');
    setCustomerAddress('');

    // Open WhatsApp after a brief delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSuccess(false);
    }, 1500);
  };

  return (
    <div className="container fade-in" style={{ paddingBottom: '60px' }}>
      <h2 className="section-title">سلة التسوق وتأكيد الطلبات</h2>

      {/* Free Shipping Promise Banner */}
      <div className="delivery-promo-banner" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.15)', borderRadius: 'var(--border-radius-lg)', color: 'var(--text-white)' }}>
        <div style={{ fontSize: '2.2rem' }}>🚚</div>
        <div>
          <h4 style={{ color: 'var(--text-white)', fontSize: '1.1rem', marginBottom: '4px' }}>الشحن والتسليم السريع</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>نلتزم بشحن وتوصيل طلبات الهدايا والمنتجات المخصصة واللوحات الإعلانية في مدة تتراوح من يوم إلى ثلاثة أيام عمل كحد أقصى.</p>
        </div>
      </div>

      {success && (
        <div className="glass-panel" style={{ borderColor: 'var(--accent-green)', background: 'rgba(5, 150, 105, 0.05)', color: 'var(--accent-green)', padding: '20px', borderRadius: '10px', textAlign: 'center', marginBottom: '24px' }}>
          <h4>🎉 تم تسجيل طلبك بنجاح!</h4>
          <p style={{ color: 'var(--accent-green)', marginTop: '4px', marginBottom: '10px' }}>جاري الانتقال لتأكيد تفاصيل الطلب وتوجيهك لواتساب المبيعات لتسليم تصميمك...</p>
          <div style={{ display: 'inline-block', width: '20px', height: '20px', border: '3px solid var(--accent-green)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="glass-panel cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <h3>السلة فارغة حالياً</h3>
          <p style={{ margin: '12px 0 24px' }}>اذهب إلى مصمم المنتجات وقم بتركيب أول تصميم على منتجاتنا المتميزة!</p>
        </div>
      ) : (
        <div className="cart-layout">
          
          {/* Cart Items List */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px' }}>المنتجات التي صممتها</h3>
            
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-preview">
                      {item.product.id === 'mug' && '☕'}
                      {item.product.id === 'acrylic' && '🖼️'}
                      {item.product.id === 'tshirt' && '👕'}
                      {item.product.id === 'phone' && '📱'}
                      {item.product.id === 'sticker' && '🏷️'}
                      <img src={item.design} className="cart-item-design-preview" alt="Cart item design" />
                    </div>
                    
                    <div className="cart-item-details">
                      <h4>{item.product.name}</h4>
                      <p>
                        التصميم: <span style={{ color: 'var(--primary-color)' }}>{item.designName}</span> 
                        {item.customDetails && ` | حجم الشعار: ${item.customDetails.scale}%`}
                        {item.customDetails && item.customDetails.customText && ` | النص: "${item.customDetails.customText}"`}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                    <button 
                      className="btn btn-outline" 
                      onClick={() => removeFromCart(item.id)}
                      style={{ padding: '4px 8px', fontSize: '0.8rem', borderColor: 'rgba(220, 38, 38, 0.4)', color: 'var(--accent-red)' }}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--panel-border)' }}>
              <h3>المجموع الكلي:</h3>
              <span className="glow-text-cyan" style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-english)' }}>
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="glass-panel" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>بيانات وتأكيد الشحن والتوصيل</h3>
            
            <form onSubmit={handleCheckoutSubmit}>
              
              <div className="form-group">
                <label className="form-label">الاسم الكامل للمستلم</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="أدخل اسمك الكامل" 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">رقم الهاتف للتواصل</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="رقم الهاتف النشط (واتساب)" 
                  value={customerPhone} 
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">المدينة أو المحافظة</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="مثال: الرياض" 
                  value={customerCity} 
                  onChange={(e) => setCustomerCity(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">العنوان بالتفصيل</label>
                <textarea 
                  className="form-textarea" 
                  rows="2" 
                  placeholder="اسم الحي، الشارع، المعالم القريبة" 
                  value={customerAddress} 
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group" style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="radio" defaultChecked id="shipping-opt" />
                  <label htmlFor="shipping-opt" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                    الشحن السريع (من يوم إلى 3 أيام عمل)
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                🟢 إرسال الطلب وتأكيد الشراء عبر الواتساب
              </button>

            </form>
          </div>

        </div>
      )}

      {/* CSS Animation helper for spin */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
