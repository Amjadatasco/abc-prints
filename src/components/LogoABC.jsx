import { useState, useEffect } from 'react';
import logoArHQ from '../assets/logo_user_official.png?v=transp4';
import logoArTransparent from '../assets/logo_ar_transparent.png?v=transp4';
import logoEnTransparent from '../assets/logo_en_transparent.png?v=transp4';

/**
 * LogoABC - Official High-Quality Image Logo with optional 3D Auto-Flip
 * Uses transparent background PNG with crisp rendering on all screens.
 *
 * Props:
 *  variant:   'ar' | 'en' (default: 'ar')
 *  size:      'sm' (Navbar: 78px) | 'md' (Footer/Cards: 105px) | 'lg' (Hero: 165px) | 'xl' (Hero Wide: 220px)
 *  dark:      true | false
 *  autoFlip:  boolean (flips smoothly between Arabic and English every few seconds)
 *  interval:  number in ms (default: 3500ms)
 *  style:     custom inline styles
 */
export default function LogoABC({ 
  variant = 'ar', 
  size = 'md', 
  dark = false, 
  autoFlip = false, 
  interval = 3500,
  style = {} 
}) {
  const [currentLang, setCurrentLang] = useState(variant);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (!autoFlip) return;
    const timer = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
        setIsFlipping(false);
      }, 350); // half of the 3D flip animation
    }, interval);

    return () => clearInterval(timer);
  }, [autoFlip, interval]);

  // Height mapping: sm=78px (navbar), md=105px (footer), lg=165px (hero), xl=220px
  const heightMap = {
    sm: 78,
    md: 105,
    lg: 165,
    xl: 220
  };
  const height = heightMap[size] || 96;

  const activeLang = autoFlip ? currentLang : variant;
  const imgSrc = activeLang === 'en' ? logoEnTransparent : logoArHQ;
  const imgSrcFallback = activeLang === 'en' ? logoEnTransparent : logoArTransparent;

  return (
    <div 
      className="logo-abc-wrapper"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        lineHeight: 1,
        flexShrink: 0,
        background: 'transparent',
        perspective: '800px',
        ...style
      }}
    >
      <img
        src={imgSrc}
        srcSet={`${imgSrcFallback} 1x, ${imgSrc} 2x`}
        alt={activeLang === 'en' ? 'ABC Printing & Advertising' : 'ABC للطباعة والإعلان'}
        width={Math.round(height * 2.04)}
        height={height}
        style={{
          height: `${height}px`,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
          imageRendering: 'auto',
          background: 'transparent',
          mixBlendMode: 'normal',
          filter: dark ? 'brightness(0) invert(1)' : 'none',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
          transform: isFlipping ? 'rotateY(90deg) scale(0.92)' : 'rotateY(0deg) scale(1)',
          opacity: isFlipping ? 0.2 : 1
        }}
      />
    </div>
  );
}
