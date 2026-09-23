import { useState, useRef, useEffect } from 'react';

// Import photorealistic mockup images
import blankMug from '../assets/blank_mug.png';
import blankAcrylic from '../assets/blank_acrylic.png';
import blankTshirt from '../assets/blank_tshirt.png';
import blankPhone from '../assets/blank_phone.png';
import blankSticker from '../assets/blank_sticker.png';

// Preset SVG designs optimized with system-ui fonts and crisp rendering properties
const presets = [
  {
    id: 'preset-abc',
    name: 'ABC Neon',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" text-rendering="geometricPrecision" shape-rendering="geometricPrecision"><rect width="200" height="200" fill="none"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="28" fill="%233b82f6" style="text-shadow: 0 0 8px rgba(59, 130, 246, 0.5)">ABC</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12" fill="%230d9488">BRANDING</text><circle cx="100" cy="100" r="80" stroke="%230d9488" stroke-width="3" fill="none" stroke-dasharray="10, 5"/></svg>`
  },
  {
    id: 'preset-retro',
    name: 'Retro Sunset',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" text-rendering="geometricPrecision" shape-rendering="geometricPrecision"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="%233b82f6"/><stop offset="100%" stop-color="%230d9488"/></linearGradient></defs><circle cx="100" cy="90" r="60" fill="url(%23grad)"/><path d="M 30,100 L 170,100 M 30,110 L 170,110 M 40,120 L 160,120 M 50,130 L 150,130" stroke="%230f172a" stroke-width="4"/><text x="50%" y="160" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="14" fill="%233b82f6">VIBES</text></svg>`
  },
  {
    id: 'preset-coffee',
    name: 'Stay Bold',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" text-rendering="geometricPrecision" shape-rendering="geometricPrecision"><circle cx="100" cy="100" r="75" stroke="%23334155" stroke-width="2" fill="none"/><path d="M 75,120 C 75,140 125,140 125,120 L 125,90 L 75,90 Z" fill="none" stroke="%23334155" stroke-width="4"/><path d="M 125,100 C 135,100 135,115 125,115" fill="none" stroke="%23334155" stroke-width="4"/><path d="M 85,80 C 85,70 95,70 95,60 M 100,80 C 100,72 108,72 108,65 M 115,80 C 115,74 120,74 120,68" fill="none" stroke="%23334155" stroke-width="2" stroke-linecap="round"/><text x="50%" y="155" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="13" fill="%23ffffff">خُذ نفساً عميقاً</text></svg>`
  },
  {
    id: 'preset-geometric',
    name: 'Cyber Eye',
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" text-rendering="geometricPrecision" shape-rendering="geometricPrecision"><path d="M 20,100 C 60,50 140,50 180,100 C 140,150 60,150 20,100 Z" stroke="%233b82f6" stroke-width="3" fill="none"/><circle cx="100" cy="100" r="35" fill="none" stroke="%230d9488" stroke-width="3"/><circle cx="100" cy="100" r="15" fill="%230d9488"/><line x1="20" y1="100" x2="180" y2="100" stroke="%233b82f6" stroke-width="1" stroke-dasharray="4, 4"/><line x1="100" y1="30" x2="100" y2="170" stroke="%233b82f6" stroke-width="1" stroke-dasharray="4, 4"/></svg>`
  }
];

const products = [
  {
    id: 'mug',
    name: 'كوب سيراميك فاخر',
    price: 6.50,
    mockupImg: blankMug,
    publicImg: '/mockups/blank_mug.png',
    printClass: 'print-area-mug-real',
    blendMode: 'blend-multiply',
    tech: 'UV Flatbed',
    desc: 'كوب سيراميك أبيض مصقول مع طلاء خارجي عالي الجودة يدعم غسيل الحرارة.',
    defaultLeft: 128,
    defaultTop: 90
  },
  {
    id: 'acrylic',
    name: 'لوح أكريليك مضيء',
    price: 15.00,
    mockupImg: blankAcrylic,
    publicImg: '/mockups/blank_acrylic.png',
    printClass: 'print-area-acrylic-real',
    blendMode: 'blend-normal',
    tech: 'UV Flatbed',
    desc: 'أكريليك شفاف بسمك 4 مم مع قاعدة خشبية فاخرة وإضاءة LED دافئة.',
    defaultLeft: 100,
    defaultTop: 90
  },
  {
    id: 'tshirt',
    name: 'تيشرت قطن 100%',
    price: 18.00,
    mockupImg: blankTshirt,
    publicImg: '/mockups/blank_tshirt.png',
    printClass: 'print-area-tshirt-real',
    blendMode: 'blend-multiply',
    tech: 'DTF Printing',
    desc: 'تيشرت قطني فاخر ومريح، طباعة ناعمة وقوية مقاومة للغسيل والتشقق.',
    defaultLeft: 105,
    defaultTop: 95
  },
  {
    id: 'phone',
    name: 'كوفر هاتف',
    price: 8.00,
    mockupImg: blankPhone,
    publicImg: '/mockups/blank_phone.png',
    printClass: 'print-area-phone-real',
    blendMode: 'blend-normal',
    tech: 'UV Flatbed',
    desc: 'كفر هاتف سيليكون مرن لحماية ممتازة مع طباعة خلفية بارزة ولامعة.',
    defaultLeft: 115,
    defaultTop: 80
  },
  {
    id: 'sticker',
    name: 'ملصق شعار UV DTF',
    price: 4.00,
    mockupImg: blankSticker,
    publicImg: '/mockups/blank_sticker.png',
    printClass: 'print-area-sticker-real',
    blendMode: 'blend-normal',
    tech: 'UV DTF',
    desc: 'ملصق نقل شفاف ثلاثي الأبعاد مع طبقة لاصقة قوية جداً لجميع الأسطح.',
    defaultLeft: 60,
    defaultTop: 60
  }
];

const presetColors = [
  '#ffffff', '#000000', '#3b82f6', '#0d9488', '#eab308', '#22c55e', '#ef4444', '#f97316'
];

export default function ProductCustomizer({ addToCart }) {
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [selectedDesign, setSelectedDesign] = useState(presets[0].svg);
  const [uploadedImageName, setUploadedImageName] = useState(null);
  
  // Customizer control tabs
  const [activeControlTab, setActiveControlTab] = useState('product'); // 'product', 'design', 'text', 'adjust'

  // Customizer image manipulation state
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  // Print Frame dynamic positioning (frees the pink box!)
  const [printLeft, setPrintLeft] = useState(products[0].defaultLeft);
  const [printTop, setPrintTop] = useState(products[0].defaultTop);
  const [dragMode, setDragMode] = useState('design'); // 'design' or 'frame'

  // Custom text options
  const [customText, setCustomText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(16);
  const [textFont, setTextFont] = useState('Cairo');
  const [textRotation, setTextRotation] = useState(0);
  const [textPosY, setTextPosY] = useState(40);

  // Interaction tracking
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });
  
  const fileInputRef = useRef(null);

  // Reset positioning and handle mobile scroll on product change
  const handleProductSelect = (prod) => {
    setActiveProduct(prod);
    setPosX(0);
    setPosY(0);
    setScale(100);
    setRotation(0);
    setCustomText('');
    setPrintLeft(prod.defaultLeft);
    setPrintTop(prod.defaultTop);

    // Smooth scroll to preview on mobile so the user sees the change instantly
    if (window.innerWidth <= 992) {
      const viewport = document.querySelector('.canvas-viewport-premium');
      if (viewport) {
        viewport.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  // Handle Preset Select
  const handlePresetSelect = (svgString) => {
    setSelectedDesign(svgString);
    setUploadedImageName(null);
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً! الحد الأقصى 5 ميغابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedDesign(event.target.result);
        setUploadedImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    if (dragMode === 'frame') {
      positionStart.current = { x: printLeft, y: printTop };
    } else {
      positionStart.current = { x: posX, y: posY };
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    if (dragMode === 'frame') {
      const newLeft = Math.max(10, Math.min(240, positionStart.current.x + deltaX));
      const newTop = Math.max(10, Math.min(240, positionStart.current.y + deltaY));
      setPrintLeft(newLeft);
      setPrintTop(newTop);
    } else {
      setPosX(positionStart.current.x + deltaX);
      setPosY(positionStart.current.y + deltaY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (dragMode === 'frame') {
      positionStart.current = { x: printLeft, y: printTop };
    } else {
      positionStart.current = { x: posX, y: posY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;
    if (dragMode === 'frame') {
      const newLeft = Math.max(10, Math.min(240, positionStart.current.x + deltaX));
      const newTop = Math.max(10, Math.min(240, positionStart.current.y + deltaY));
      setPrintLeft(newLeft);
      setPrintTop(newTop);
    } else {
      setPosX(positionStart.current.x + deltaX);
      setPosY(positionStart.current.y + deltaY);
    }
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleAddToCart = () => {
    const cartItem = {
      id: 'CART-' + Date.now(),
      product: activeProduct,
      design: selectedDesign,
      designName: uploadedImageName || 'تصميم جاهز',
      customDetails: {
        scale,
        rotation,
        posX,
        posY,
        printLeft,
        printTop,
        customText,
        textColor,
        textSize,
        textFont,
        textRotation,
        textPosY
      },
      price: activeProduct.price
    };

    addToCart(cartItem);
    alert(`🎉 تم إضافة "${activeProduct.name}" المخصّص إلى سلة المشتريات بنجاح!`);
  };

  return (
    <div className="container fade-in" style={{ paddingBottom: '60px' }}>
      {/* Standardized Page Header */}
      <section className="hero-sec" style={{ padding: '20px 0 28px' }}>
        <div className="hero-badge">
          🎨 مصمم المنتجات والهدايا التفاعلي
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.1rem' }}>
          صمم منتجك وهديتك الخاصة
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '0.95rem', maxWidth: '750px' }}>
          قم ببناء هديتك المخصصة بسهولة تامة. حدد نوع المادة، ثم ارفع التصميم أو شعار منشأتك، وأضف نصوصاً مخصصة للحصول على نتيجة فورية مطابقة للواقع.
        </p>
      </section>

      <div className="customizer-layout-premium">
        
        {/* Left Column: Visual Mockup Viewport */}
        <div className="canvas-container-premium">
          <div className="canvas-viewport-premium" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
            <div className="canvas-badge">
              <span>🖨️ تقنية الطباعة: <strong style={{ color: 'var(--primary-color)' }}>{activeProduct.tech}</strong></span>
            </div>

            {/* Pedestal graphic */}
            <div className="pedestal"></div>

            {/* Mockup wrapper */}
            <div className="mockup-img-wrapper">
              <div className="mockup-canvas-inner">
                <img 
                  key={activeProduct.id}
                  src={activeProduct.mockupImg || activeProduct.publicImg} 
                  className="mockup-bg-image fade-in" 
                  alt={activeProduct.name}
                  onError={(e) => {
                    if (e.target.src !== activeProduct.publicImg) {
                      e.target.src = activeProduct.publicImg;
                    }
                  }}
                />
                
                {/* Printable overlay area (Controlled dynamically by react state) */}
                <div 
                  className={`print-area ${activeProduct.printClass}`}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  style={{
                    left: `${printLeft}px`,
                    top: `${printTop}px`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                    borderColor: dragMode === 'frame' ? 'var(--primary-color)' : 'rgba(217, 70, 239, 0.35)',
                    borderWidth: dragMode === 'frame' ? '2px' : '1px',
                    boxShadow: dragMode === 'frame' ? '0 0 10px rgba(217, 70, 239, 0.4)' : 'none'
                  }}
                >
                  {/* Visual guideline border */}
                  <div className="print-area-guide"></div>

                  {selectedDesign && (
                    <img 
                      src={selectedDesign} 
                      className={`overlay-design ${activeProduct.blendMode}`} 
                      alt="Custom design"
                      style={{
                        transform: `translate(${posX}px, ${posY}px) scale(${scale / 100}) rotate(${rotation}deg)`,
                        cursor: isDragging ? 'grabbing' : 'grab'
                      }}
                    />
                  )}

                  {/* Custom Text Overlay */}
                  {customText && (
                    <div
                      className="text-overlay"
                      style={{
                        color: textColor,
                        fontSize: `${textSize}px`,
                        fontFamily: textFont === 'Cairo' ? 'var(--font-arabic)' : textFont === 'Outfit' ? 'var(--font-english)' : textFont,
                        transform: `translate(-50%, -50%) translate(${0}px, ${textPosY}px) rotate(${textRotation}deg)`,
                        position: 'absolute',
                        top: '50%',
                        left: '50%'
                      }}
                    >
                      {customText}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>🎯 نمط السحب بالماوس/اللمس:</span>
            <button 
              className={`btn ${dragMode === 'design' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setDragMode('design')}
              style={{ padding: '6px 12px', fontSize: '0.85rem', borderRadius: '20px', minHeight: 'auto' }}
            >
              🖼️ تحريك التصميم (داخل الإطار)
            </button>
            <button 
              className={`btn ${dragMode === 'frame' ? 'btn-secondary' : 'btn-outline-cyan'}`}
              onClick={() => setDragMode('frame')}
              style={{ padding: '6px 12px', fontSize: '0.85rem', borderRadius: '20px', minHeight: 'auto' }}
            >
              🔲 تحريك إطار الطباعة (المربع الزهري)
            </button>
          </div>
          <span className="canvas-instructions" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px' }}>
            {dragMode === 'design' 
              ? '💡 اسحب التصميم الآن بالماوس أو اللمس لتحريكه وتوسيطه داخل الإطار المنقط.' 
              : '💡 اسحب المربع الزهري (إطار الطباعة) بالكامل بالماوس أو اللمس لوضعه في المكان المناسب على المنتج.'}
          </span>
        </div>

        {/* Right Column: Tabbed Adjustments Control Panel */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Tabs header navigation */}
          <div className="customizer-tabs">
            <button 
              className={`customizer-tab-btn ${activeControlTab === 'product' ? 'active' : ''}`}
              onClick={() => setActiveControlTab('product')}
            >
              1. المنتج
            </button>
            <button 
              className={`customizer-tab-btn ${activeControlTab === 'design' ? 'active' : ''}`}
              onClick={() => setActiveControlTab('design')}
            >
              2. التصميم
            </button>
            <button 
              className={`customizer-tab-btn ${activeControlTab === 'text' ? 'active' : ''}`}
              onClick={() => setActiveControlTab('text')}
            >
              3. الكتابة
            </button>
            <button 
              className={`customizer-tab-btn ${activeControlTab === 'adjust' ? 'active' : ''}`}
              onClick={() => setActiveControlTab('adjust')}
            >
              4. الضبط والأبعاد
            </button>
          </div>

          {/* Tab contents wrapper */}
          <div className="tab-content-panel">
            
            {/* Tab 1: Product Selection */}
            {activeControlTab === 'product' && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-white)' }}>اختر المادة الأساسية للطباعة:</h4>
                <div className="product-grid-select">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className={`product-item-btn ${activeProduct.id === prod.id ? 'active' : ''}`}
                      onClick={() => handleProductSelect(prod)}
                      style={{ padding: '12px' }}
                    >
                      <div className="product-item-icon" style={{ width: '36px', height: '36px', fontSize: '1.2rem' }}>
                        {prod.id === 'mug' && '☕'}
                        {prod.id === 'acrylic' && '🖼️'}
                        {prod.id === 'tshirt' && '👕'}
                        {prod.id === 'phone' && '📱'}
                        {prod.id === 'sticker' && '🏷️'}
                      </div>
                      <div className="product-item-details">
                        <h4 style={{ fontSize: '0.9rem' }}>{prod.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--secondary-color)' }}>${prod.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  جميع منتجاتنا تعتمد على خامات نخب أول وتم فحصها بعناية لضمان ثبات الألوان والطباعة لفترات طويلة.
                </p>
              </div>
            )}

            {/* Tab 2: Logo and Designs */}
            {activeControlTab === 'design' && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-white)' }}>ارفع شعارك الخاص أو اختر من مكتبة التصاميم:</h4>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
                
                <div 
                  className="upload-zone-premium" 
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const file = e.dataTransfer.files[0];
                      if (file.size > 5 * 1024 * 1024) {
                        alert('حجم الصورة كبير جداً! الحد الأقصى 5 ميغابايت.');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setSelectedDesign(event.target.result);
                        setUploadedImageName(file.name);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  {uploadedImageName ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <img src={selectedDesign} alt="Uploaded logo preview" style={{ maxWidth: '80px', maxHeight: '80px', objectFit: 'contain', borderRadius: '8px', border: '1px solid var(--primary-glow)' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 700 }}>✓ تم رفع: {uploadedImageName}</span>
                      <button 
                        type="button" 
                        className="btn btn-outline" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedImageName(null);
                          setSelectedDesign(presets[0].svg);
                        }}
                        style={{ fontSize: '0.75rem', padding: '4px 10px', marginTop: '4px', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}
                      >
                        🗑️ إزالة الشعار المرفوع
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>📤</div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-white)' }}>اضغط هنا أو اسحب صورتك / شعارك لرفعه مباشرة</span>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>يدعم ملفات High Quality PNG, JPG, WEBP & SVG</p>
                    </>
                  )}
                </div>

                <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '8px' }}>أو اختر تصميماً جاهزاً من المكتبة:</div>
                <div className="templates-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  {presets.map((preset) => (
                    <div 
                      key={preset.id}
                      className={`template-item ${selectedDesign === preset.svg && !uploadedImageName ? 'active' : ''}`}
                      onClick={() => handlePresetSelect(preset.svg)}
                      title={preset.name}
                    >
                      <img src={preset.svg} className="template-preview" alt={preset.name} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Text & Typography */}
            {activeControlTab === 'text' && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-white)' }}>أضف كتابة مخصصة على المنتج:</h4>
                
                <div className="form-group" style={{ marginBottom: '10px' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="اكتب العبارة أو النص المطلوب هنا..." 
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                  />
                </div>

                {customText ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    
                    <div className="slider-group">
                      <div className="slider-row"><span>نوع الخط المفضل:</span></div>
                      <select 
                        className="form-select" 
                        value={textFont} 
                        onChange={(e) => setTextFont(e.target.value)}
                        style={{ padding: '10px', fontSize: '0.85rem' }}
                      >
                        <option value="Cairo">Cairo (عربي حديث)</option>
                        <option value="Outfit">Outfit (خط إنجليزي فخم)</option>
                        <option value="Courier New">Courier New (ريترو)</option>
                        <option value="Georgia">Georgia (كلاسيكي)</option>
                      </select>
                    </div>

                    <div className="slider-group">
                      <div className="slider-row"><span>لون الخط:</span></div>
                      <div className="color-dot-picker">
                        {presetColors.map((color) => (
                          <div 
                            key={color}
                            className={`color-dot ${textColor === color ? 'active' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setTextColor(color)}
                          />
                        ))}
                        <input 
                          type="color" 
                          value={textColor} 
                          onChange={(e) => setTextColor(e.target.value)} 
                          style={{ width: '28px', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                        />
                      </div>
                    </div>

                    <div className="slider-group">
                      <div className="slider-row">
                        <span>حجم الخط:</span>
                        <span style={{ fontFamily: 'var(--font-english)' }}>{textSize}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="8" 
                        max="35" 
                        value={textSize} 
                        onChange={(e) => setTextSize(parseInt(e.target.value))}
                        className="slider-input"
                      />
                    </div>

                    <div className="slider-group">
                      <div className="slider-row">
                        <span>الموضع الرأسي للنص:</span>
                        <span style={{ fontFamily: 'var(--font-english)' }}>{textPosY}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="-70" 
                        max="70" 
                        value={textPosY} 
                        onChange={(e) => setTextPosY(parseInt(e.target.value))}
                        className="slider-input"
                      />
                    </div>

                    <div className="slider-group">
                      <div className="slider-row">
                        <span>زاوية تدوير النص:</span>
                        <span style={{ fontFamily: 'var(--font-english)' }}>{textRotation}°</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="360" 
                        value={textRotation} 
                        onChange={(e) => setTextRotation(parseInt(e.target.value))}
                        className="slider-input"
                      />
                    </div>

                  </div>
                ) : (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    كتابة عباراتك الشخصية أو شعارك الكتابي يعطي لمسة جمالية للمنتجات والهدايا المخصصة. اكتب نصًا بالملأ بالأعلى لتفعيل إعدادات التحكم.
                  </p>
                )}
              </div>
            )}

            {/* Tab 4: Image Scale & Print Frame Adjustments */}
            {activeControlTab === 'adjust' && (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-white)' }}>ضبط مقاييس التصميم والتحكم في إطار الطباعة:</h4>
                
                <div className="slider-group">
                  <div className="slider-row">
                    <span>حجم الشعار والصورة:</span>
                    <span style={{ fontFamily: 'var(--font-english)' }}>{scale}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="15" 
                    max="180" 
                    value={scale} 
                    onChange={(e) => setScale(parseInt(e.target.value))}
                    className="slider-input"
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-row">
                    <span>زاوية تدوير الشعار:</span>
                    <span style={{ fontFamily: 'var(--font-english)' }}>{rotation}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={rotation} 
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="slider-input"
                  />
                </div>

                {/* Print Area Position Adjustments (Frees the pink box!) */}
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed var(--panel-border)' }}>
                  <h5 style={{ fontSize: '0.9rem', color: 'var(--text-white)', marginBottom: '12px' }}>تحريك إطار الطباعة (المربع الزهري):</h5>
                  
                  <div className="slider-group">
                    <div className="slider-row">
                      <span>موضع الإطار أفقيًا:</span>
                      <span style={{ fontFamily: 'var(--font-english)' }}>{printLeft}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="220" 
                      value={printLeft} 
                      onChange={(e) => setPrintLeft(parseInt(e.target.value))}
                      className="slider-input"
                    />
                  </div>

                  <div className="slider-group" style={{ marginTop: '10px' }}>
                    <div className="slider-row">
                      <span>موضع الإطار رأسيًا:</span>
                      <span style={{ fontFamily: 'var(--font-english)' }}>{printTop}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="220" 
                      value={printTop} 
                      onChange={(e) => setPrintTop(parseInt(e.target.value))}
                      className="slider-input"
                    />
                  </div>
                </div>

                <button 
                  className="btn btn-outline" 
                  onClick={() => { setPosX(0); setPosY(0); setScale(100); setRotation(0); setCustomText(''); setPrintLeft(activeProduct.defaultLeft); setPrintTop(activeProduct.defaultTop); }}
                  style={{ padding: '8px 16px', fontSize: '0.85rem', marginTop: '15px' }}
                >
                  🔄 إعادة تهيئة جميع المقاييس والنصوص والإطار
                </button>
              </div>
            )}

          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--panel-border)', margin: '20px 0' }} />

          {/* Action Order Card */}
          <div style={{ borderRight: '4px solid var(--primary-color)', paddingRight: '16px', textAlign: 'right' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-white)', marginBottom: '4px' }}>المنتج المحدد: {activeProduct.name}</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '16px', color: 'var(--text-muted)' }}>{activeProduct.desc}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>سعر القطعة المخصصة:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 850, color: 'var(--primary-color)', fontFamily: 'var(--font-english)' }}>
                ${activeProduct.price.toFixed(2)}
              </span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={handleAddToCart}>
              🛒 إضافة المنتج وتأكيد التصميم
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
