import logoArHQ from '../assets/logo_user_official.png?v=transp4';
import logoArTransparent from '../assets/logo_ar_transparent.png?v=transp4';
import logoEnTransparent from '../assets/logo_en_transparent.png?v=transp4';

/**
 * LogoABC - Official High-Quality Image Logo
 * Uses transparent background PNG with crisp rendering on all screens.
 *
 * Props:
 *  variant: 'ar' (Arabic subtitle) | 'en' (English subtitle)
 *  size:    'sm' (Navbar: 54px) | 'md' (Footer/Cards: 96px) | 'lg' (Hero Section: 160px) | 'xl' (Hero Wide: 210px)
 *  dark:    true | false
 *  style:   custom inline styles
 */
export default function LogoABC({ variant = 'ar', size = 'md', dark = false, style = {} }) {
  // Height mapping: sm=78px (navbar), md=105px (footer), lg=165px (hero), xl=220px
  const heightMap = {
    sm: 78,
    md: 105,
    lg: 165,
    xl: 220
  };
  const height = heightMap[size] || 96;

  // Use highest quality source for Arabic, transparent for English
  const imgSrc = variant === 'en' ? logoEnTransparent : logoArHQ;
  const imgSrcFallback = variant === 'en' ? logoEnTransparent : logoArTransparent;

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
        ...style
      }}
    >
      <img
        src={imgSrc}
        srcSet={`${imgSrcFallback} 1x, ${imgSrc} 2x`}
        alt={variant === 'en' ? 'ABC Printing & Advertising' : 'ABC للطباعة والإعلان'}
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
          filter: dark ? 'brightness(0) invert(1)' : 'none'
        }}
      />
    </div>
  );
}
