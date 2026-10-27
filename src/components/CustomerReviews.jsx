import { useState, useRef } from 'react';

export default function CustomerReviews({ reviews, onAddReview }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productType, setProductType] = useState('كوب سيراميك فاخر');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميغابايت');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert('يرجى كتابة الاسم والتعليق لمشاركة رأيك');
      return;
    }

    const newRev = {
      id: 'REV-' + Date.now(),
      name: name.trim(),
      productType,
      rating: Number(rating),
      comment: comment.trim(),
      photo: photoPreview,
      date: new Date().toLocaleDateString('ar-EG')
    };

    onAddReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false);
      setName('');
      setComment('');
      setPhotoPreview(null);
      setRating(5);
    }, 1800);
  };

  return (
    <section className="testimonials-section" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header with Action Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '16px',
          marginBottom: '32px' 
        }}>
          <div>
            <div className="hero-badge" style={{ marginBottom: '8px' }}>
              🌟 تجارب حقيقية من زبائننا
            </div>
            <h2 className="section-title" style={{ margin: '0', textAlign: 'right' }}>
              تقييمات وآراء زبائننا
            </h2>
            <p className="text-muted" style={{ margin: '6px 0 0', fontSize: '0.9rem' }}>
              شاركنا تجربتك وصور منتجاتك المطبوعة من ABC
            </p>
          </div>

          <button 
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
            style={{ 
              padding: '12px 22px', 
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '30px',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)'
            }}
          >
            <span>✍️ أضف تقييمك وصورة طلبك</span>
          </button>
        </div>

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <div className="glass-panel" style={{ 
            textAlign: 'center', 
            padding: '48px 20px',
            borderRadius: 'var(--border-radius-lg)',
            border: '2px dashed #cbd5e1',
            background: '#ffffff'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📸</div>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '6px' }}>
              كن أول من يشاركنا تقييم المنتج وصورته!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 20px' }}>
              لقد استلمت طلباً من ABC؟ اضغط على الزر أعلاه لتصوير المنتج وكتابة رأيك لمساعدة الزبائن الآخرين.
            </p>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
              style={{ padding: '10px 24px', borderRadius: '24px' }}
            >
              ✍️ إضافة أول تقييم
            </button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '20px' 
          }}>
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px',
                  borderRadius: 'var(--border-radius-lg)',
                  background: '#ffffff',
                  border: '1px solid var(--panel-border)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.25s ease'
                }}
              >
                <div>
                  {/* Customer photo preview if provided */}
                  {rev.photo && (
                    <div style={{ 
                      width: '100%', 
                      height: '190px', 
                      borderRadius: '10px', 
                      overflow: 'hidden', 
                      marginBottom: '14px',
                      background: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #e2e8f0'
                    }}>
                      <img 
                        src={rev.photo} 
                        alt={`تصوير ${rev.name}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  )}

                  {/* Rating Stars & Product Tag */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ color: '#f59e0b', fontSize: '1rem', letterSpacing: '2px' }}>
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </div>
                    {rev.productType && (
                      <span style={{ 
                        fontSize: '0.72rem', 
                        background: 'rgba(2, 132, 199, 0.08)', 
                        color: 'var(--primary-color)',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontWeight: 600
                      }}>
                        {rev.productType}
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: '#334155', 
                    lineHeight: '1.6', 
                    margin: '0 0 16px',
                    wordBreak: 'break-word'
                  }}>
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  borderTop: '1px solid #f1f5f9', 
                  paddingTop: '12px' 
                }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {rev.name ? rev.name.trim().charAt(0) : 'ز'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.9rem', margin: 0, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {rev.name}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {rev.date || 'عميل موثق ✅'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Review Modal */}
      {showModal && (
        <div 
          className="digital-modal-overlay" 
          onClick={() => setShowModal(false)}
          style={{ zIndex: 1050 }}
        >
          <div 
            className="digital-modal-card" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '520px', width: '92%' }}
          >
            <div className="digital-modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-dark)' }}>
                  ✍️ إضافة تقييم وصورة منتج
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  رأيك يهمنا ويساعد الآخرين في معاينة جودة الطباعة
                </span>
              </div>
              <button 
                type="button"
                className="digital-modal-close" 
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="digital-modal-body">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎉</div>
                  <h4 style={{ color: '#16a34a', fontSize: '1.2rem', marginBottom: '6px' }}>
                    شكراً لك على تقييمك الجميل!
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    تمت إضافة رأيك وصورتك بنجاح إلى الصفحة الرئيسية.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  
                  {/* Name */}
                  <div className="form-group">
                    <label className="form-label">الاسم الكريم / اسم النشاط (مطلوب)</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="أدخل اسمك"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Product selection */}
                  <div className="form-group">
                    <label className="form-label">المنتج أو الخدمة التي طلبتها</label>
                    <select 
                      className="form-select"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    >
                      <option value="كوب سيراميك فاخر">كوب سيراميك فاخر</option>
                      <option value="لوح أكريليك مضيء LED">لوح أكريليك مضيء LED</option>
                      <option value="تيشرت قطن 100%">تيشرت قطن 100%</option>
                      <option value="كوفر هاتف">كوفر هاتف</option>
                      <option value="ملصق شعار UV DTF">ملصق شعار UV DTF</option>
                      <option value="طباعة تجارية رول">طباعة تجارية رول (DTF / UV)</option>
                      <option value="تصميم وبرمجة موقع">تصميم وبرمجة موقع</option>
                      <option value="هوية بصرية وبراندينغ">هوية بصرية وبراندينغ</option>
                    </select>
                  </div>

                  {/* Rating Stars */}
                  <div className="form-group">
                    <label className="form-label">تقييمك للخدمة والجودة</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.6rem',
                            color: star <= rating ? '#f59e0b' : '#cbd5e1',
                            padding: '0 2px',
                            transition: 'transform 0.15s ease'
                          }}
                        >
                          ★
                        </button>
                      ))}
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '8px' }}>
                        ({rating} من 5 نجوم)
                      </span>
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div className="form-group">
                    <label className="form-label">📸 تصوير المنتج بعد استلامه (اختياري لكن يُنصح به)</label>
                    
                    <input 
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />

                    {photoPreview ? (
                      <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #cbd5e1', maxHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                        <img 
                          src={photoPreview} 
                          alt="معاينة الصورة" 
                          style={{ width: '100%', maxHeight: '180px', objectFit: 'cover' }} 
                        />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(239, 68, 68, 0.9)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="حذف الصورة"
                        >
                          &times;
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          border: '2px dashed #94a3b8',
                          borderRadius: '10px',
                          padding: '20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: '#f8fafc',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        <div style={{ fontSize: '2rem', marginBottom: '6px' }}>📷</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 700 }}>
                          اضغط هنا لاختيار صورة من هاتفك أو جهازك
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                          يدعم JPG و PNG حتى 5 ميغابايت
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Comment Text */}
                  <div className="form-group">
                    <label className="form-label">رأيك وتعليقك على المنتج والخدمة (مطلوب)</label>
                    <textarea 
                      className="form-textarea"
                      rows="3"
                      placeholder="كيف كانت تجربة الطباعة؟ كيف وجدت جودة الألوان والتعامل والتوصيل؟"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '1rem', marginTop: '10px' }}
                  >
                    🚀 نشر التقييم في الموقع
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
