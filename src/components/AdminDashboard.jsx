import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function AdminDashboard({ orders, serviceRequests, updateOrderStatus, updateServiceStatus, removeOrder, removeServiceRequest }) {
  const [activeSubTab, setActiveSubTab] = useState('printing');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('abc_admin_authenticated') === 'true' || sessionStorage.getItem('output_admin_authenticated') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin-abc-2026';
    if (username === 'admin' && password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('abc_admin_authenticated', 'true');
      setError('');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleLogout = () => {
    if (confirm('هل ترغب في تسجيل الخروج من لوحة التحكم؟')) {
      setIsAuthenticated(false);
      sessionStorage.removeItem('abc_admin_authenticated');
      sessionStorage.removeItem('output_admin_authenticated');
      setUsername('');
      setPassword('');
    }
  };

  const handleExportExcel = () => {
    const printingRows = orders.map((o) => ({
      'رقم الطلب': o.id,
      'نوع الطلب': o.type === 'CustomProduct' ? 'منتج مخصص' : 'طباعة تجارية',
      'اسم العميل / الشركة': o.customerName || o.companyName || '-',
      'رقم التواصل': o.customerPhone || o.contactPhone || '-',
      'المدينة والعنوان': o.customerCity ? `${o.customerCity} - ${o.customerAddress}` : '-',
      'المنتج / الخامة': o.productName || o.machine || '-',
      'المقاسات / الكمية': o.width ? `${o.width}x${o.height} سم (${o.quantity} قطع)` : '1 قطعة',
      'السعر التقديري ($)': o.price || o.productPrice || 0,
      'الحالة': getStatusLabel(o.status),
      'التاريخ': o.date || '-'
    }));

    const digitalRows = serviceRequests.map((s) => ({
      'رقم الطلب': s.id,
      'اسم العميل': s.clientName || '-',
      'رقم التواصل (واتساب)': s.clientPhone || '-',
      'نوع الخدمة المطلوبة': s.serviceName || s.serviceKey || '-',
      'الميزانية التقديرية': s.budget ? `$${s.budget}` : 'غير محددة',
      'تفاصيل وشرح المشروع': s.projectDesc || '-',
      'الحالة': getStatusLabel(s.status),
      'التاريخ': s.date || '-'
    }));

    const wb = XLSX.utils.book_new();
    const wsPrinting = XLSX.utils.json_to_sheet(printingRows);
    const wsDigital = XLSX.utils.json_to_sheet(digitalRows);

    XLSX.utils.book_append_sheet(wb, wsPrinting, 'طلبات الطباعة');
    XLSX.utils.book_append_sheet(wb, wsDigital, 'الخدمات الرقمية');

    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `ABC_Orders_Export_${dateStr}.xlsx`);
  };

  // Calculations for printing stats
  const printStats = {
    total: orders.length,
    custom: orders.filter(o => o.type === 'CustomProduct').length,
    commercial: orders.filter(o => o.type === 'Commercial').length,
    pending: orders.filter(o => o.status === 'pending').length,
    revenue: orders.reduce((acc, o) => acc + parseFloat(o.price || o.productPrice || 0), 0)
  };

  // Calculations for digital stats
  const digitalStats = {
    total: serviceRequests.length,
    marketing: serviceRequests.filter(s => s.serviceKey === 'marketing').length,
    webdev: serviceRequests.filter(s => s.serviceKey === 'webdev').length,
    branding: serviceRequests.filter(s => s.serviceKey === 'branding').length,
    pending: serviceRequests.filter(s => s.status === 'pending').length,
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'قيد الانتظار';
      case 'processing': return 'قيد التنفيذ / الطباعة';
      case 'shipped': return 'تم التسليم / الشحن';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const handleDownloadDesign = (designData) => {
    if (!designData) return;
    // Safe approach: create a link to download the image
    const link = document.createElement('a');
    link.href = designData;
    link.download = 'design-' + Date.now() + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container fade-in">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-login-icon">🔒</div>
            <h2 className="admin-login-title">دخول لوحة التحكم</h2>
            <p className="admin-login-subtitle">يرجى تسجيل الدخول للوصول إلى لوحة إدارة ABC</p>
          </div>
          
          {error && (
            <div className="admin-login-error">
              <span>⚠️</span>
              <div>{error}</div>
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-username">اسم المستخدم</label>
              <input 
                id="admin-username"
                type="text" 
                className="form-input" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                required
                style={{ direction: 'rtl', textAlign: 'right' }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '30px' }}>
              <label className="form-label" htmlFor="admin-password">كلمة المرور</label>
              <input 
                id="admin-password"
                type="password" 
                className="form-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                required
                style={{ direction: 'rtl', textAlign: 'right' }}
              />
            </div>
            
            <button type="submit" className="btn btn-primary admin-login-btn">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in" style={{ paddingBottom: '60px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '16px', 
        marginBottom: '30px',
        borderBottom: '1px solid var(--panel-border)',
        paddingBottom: '20px'
      }}>
        <h2 className="section-title" style={{ margin: 0 }}>لوحة تحكم الإدارة الشاملة (ABC Admin)</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleExportExcel}
            className="btn btn-outline-cyan" 
            style={{ 
              padding: '8px 16px', 
              fontSize: '0.9rem'
            }}
          >
            📊 تصدير البيانات إلى Excel
          </button>
          <button 
            onClick={handleLogout}
            className="btn btn-outline" 
            style={{ 
              padding: '8px 16px', 
              fontSize: '0.9rem', 
              borderColor: 'rgba(239, 68, 68, 0.4)', 
              color: 'var(--accent-red)',
              background: 'rgba(239, 68, 68, 0.05)'
            }}
          >
            🔒 تسجيل الخروج
          </button>
        </div>
      </div>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px', fontSize: '1.05rem' }}>
        لوحة تحكم موحدة لمتابعة وإدارة طلبات الإنتاج الفني والمادي للطباعة، وطلبات الخدمات الرقمية والتسويق وتصميم المواقع.
      </p>

      {/* Stats Summary Cards */}
      <div className="admin-stats-grid" style={{ marginBottom: '40px' }}>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
          <p>إجمالي إيرادات الطباعة</p>
          <div className="stat-num" style={{ color: 'var(--accent-green)' }}>${printStats.revenue.toFixed(2)}</div>
        </div>
        <div className="stat-card">
          <p>طلبات الطباعة</p>
          <div className="stat-num">{printStats.total}</div>
        </div>
        <div className="stat-card">
          <p>طلبات الخدمات الرقمية</p>
          <div className="stat-num" style={{ color: 'var(--primary-color)' }}>{digitalStats.total}</div>
        </div>
        <div className="stat-card">
          <p>أعمال طباعة قيد الانتظار</p>
          <div className="stat-num" style={{ color: 'var(--accent-amber)' }}>{printStats.pending}</div>
        </div>
        <div className="stat-card">
          <p>خدمات رقمية بانتظار التواصل</p>
          <div className="stat-num" style={{ color: 'var(--primary-color)' }}>{digitalStats.pending}</div>
        </div>
      </div>

      {/* Main Admin Navigation */}
      <div className="glass-panel" style={{ padding: '12px', marginBottom: '24px', display: 'flex', gap: '16px' }}>
        <button 
          className={`btn ${activeSubTab === 'printing' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveSubTab('printing')}
          style={{ padding: '10px 20px' }}
        >
          🖨️ طلبات وعمليات الطباعة ({printStats.total})
        </button>
        <button 
          className={`btn ${activeSubTab === 'digital' ? 'btn-primary' : 'btn-outline-cyan'}`}
          onClick={() => setActiveSubTab('digital')}
          style={{ padding: '10px 20px' }}
        >
          🌐 طلبات الخدمات الرقمية والتسويق ({digitalStats.total})
        </button>
      </div>

      {/* SUBTAB 1: PRINTING ORDERS TABLE */}
      {activeSubTab === 'printing' && (
        <div className="glass-panel" style={{ padding: '0px', overflow: 'hidden' }}>
          <h3 style={{ padding: '20px 20px 10px', fontSize: '1.2rem', color: 'var(--primary-color)' }}>سجل طلبات الطباعة والإنتاج</h3>
          {orders.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              لا توجد أي طلبات طباعة مسجلة في النظام حالياً.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>معرف الطلب</th>
                    <th>التاريخ</th>
                    <th>العميل / المنشأة</th>
                    <th>مواصفات الطباعة والإنتاج</th>
                    <th>القيمة</th>
                    <th>الحالة</th>
                    <th>ملف الشعار / التصميم</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const price = order.price || order.productPrice;
                    return (
                      <tr key={order.id}>
                        <td style={{ fontFamily: 'var(--font-english)', fontWeight: 600 }}>{order.id}</td>
                        <td style={{ fontFamily: 'var(--font-english)' }}>{order.date}</td>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-white)' }}>
                            {order.companyName || order.customerName}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-english)' }}>
                            {order.contactPhone || order.customerPhone}
                          </div>
                        </td>
                        <td>
                          {order.type === 'Commercial' ? (
                            <div>
                              <div style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{order.machine}</div>
                              <div style={{ fontSize: '0.8rem' }}>
                                مقاس: {order.width}×{order.height} سم | كمية: {order.quantity} قطعة
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{order.productName}</div>
                              {order.customDetails && (
                                <div style={{ fontSize: '0.8rem' }}>
                                  حجم الشعار: {order.customDetails.scale}% | تدوير: {order.customDetails.rotation}°
                                  {order.customDetails.customText && ` | النص: "${order.customDetails.customText}"`}
                                </div>
                              )}
                            </div>
                          )}
                          {order.notes && (
                            <div style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', marginTop: '4px' }}>
                              ملاحظة: {order.notes}
                            </div>
                          )}
                          {order.customerCity && (
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              شحن: {order.customerCity} - {order.customerAddress}
                            </div>
                          )}
                        </td>
                        <td style={{ fontFamily: 'var(--font-english)', fontWeight: 700, color: 'var(--text-white)' }}>
                          ${parseFloat(price).toFixed(2)}
                        </td>
                        <td>
                          <span className={`badge-status status-${order.status}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                        <td>
                          {order.design ? (
                            <button 
                              className="order-design-btn"
                              onClick={() => handleDownloadDesign(order.design)}
                            >
                              👁️ عرض وتصدير
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>بلا تصميم</span>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <select 
                              value={order.status} 
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              style={{ 
                                background: '#1a1a24', 
                                color: '#fff', 
                                border: '1px solid var(--panel-border)', 
                                borderRadius: '4px',
                                padding: '4px',
                                fontSize: '0.8rem',
                                fontFamily: 'var(--font-arabic)',
                                outline: 'none'
                              }}
                            >
                              <option value="pending">قيد الانتظار</option>
                              <option value="processing">جاري الطباعة</option>
                              <option value="shipped">تم الشحن</option>
                              <option value="cancelled">إلغاء</option>
                            </select>
                            <button
                              onClick={() => removeOrder(order.id)}
                              style={{ background: 'transparent', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', padding: '4px' }}
                              title="حذف الطلب"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: DIGITAL SERVICES REQUESTS TABLE */}
      {activeSubTab === 'digital' && (
        <div className="glass-panel" style={{ padding: '0px', overflow: 'hidden' }}>
          <h3 style={{ padding: '20px 20px 10px', fontSize: '1.2rem', color: 'var(--primary-color)' }}>سجل استفسارات وطلبات الخدمات الرقمية</h3>
          {serviceRequests.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              لا توجد طلبات خدمات رقمية مسجلة حالياً.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>معرف الطلب</th>
                    <th>التاريخ</th>
                    <th>العميل / المنشأة</th>
                    <th>الخدمة المطلوبة</th>
                    <th>المشروع والمتطلبات</th>
                    <th>الميزانية التقديرية</th>
                    <th>حالة التواصل</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceRequests.map((req) => (
                    <tr key={req.id}>
                      <td style={{ fontFamily: 'var(--font-english)', fontWeight: 600 }}>{req.id}</td>
                      <td style={{ fontFamily: 'var(--font-english)' }}>{req.date}</td>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-white)' }}>{req.clientName}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-english)' }}>
                          {req.clientPhone}
                        </div>
                      </td>
                      <td>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          fontSize: '0.8rem', 
                          fontWeight: 600,
                          background: req.serviceKey === 'marketing' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(13, 148, 136, 0.15)',
                          color: req.serviceKey === 'marketing' ? 'var(--primary-color)' : 'var(--secondary-color)'
                        }}>
                          {req.serviceName}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.85rem', maxWidth: '300px', whiteSpace: 'normal', wordBreak: 'break-word', color: 'var(--text-main)' }}>
                          {req.projectDesc}
                        </div>
                      </td>
                      <td style={{ fontFamily: 'var(--font-english)', color: 'var(--text-white)', fontWeight: 600 }}>
                        {req.budget === '3000+' ? '+$3,000' : `$${req.budget}`}
                      </td>
                      <td>
                        <span className={`badge-status status-${req.status === 'pending' ? 'pending' : req.status === 'processing' ? 'processing' : 'shipped'}`}>
                          {req.status === 'pending' ? 'بانتظار التواصل' : req.status === 'processing' ? 'قيد المتابعة والاتفاق' : 'تم الاتفاق والعمل'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <select 
                            value={req.status} 
                            onChange={(e) => updateServiceStatus(req.id, e.target.value)}
                            style={{ 
                              background: '#1a1a24', 
                              color: '#fff', 
                              border: '1px solid var(--panel-border)', 
                              borderRadius: '4px',
                              padding: '4px',
                              fontSize: '0.8rem',
                              fontFamily: 'var(--font-arabic)',
                              outline: 'none'
                            }}
                          >
                            <option value="pending">بانتظار التواصل</option>
                            <option value="processing">قيد المتابعة</option>
                            <option value="completed">تم الاتفاق والعمل</option>
                            <option value="cancelled">إلغاء</option>
                          </select>
                          <button
                            onClick={() => removeServiceRequest(req.id)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', padding: '4px' }}
                            title="حذف الطلب"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
