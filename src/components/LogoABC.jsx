import logoArHQ from '../assets/logo_user_official.png?v=official3';
import logoArTransparent from '../assets/logo_ar_transparent.png?v=official3';
import logoEnTransparent from '../assets/logo_en_transparent.png?v=official3';

/**
 * LogoABC - Official High-Quality Image Logo
 * Uses the highest quality source image for crisp rendering on all screens.
 *
 * Props:
 *  variant: 'ar' (Arabic subtitle) | 'en' (English subtitle)
 *  size:    'sm' (Navbar: 72px) | 'md' (Footer/Cards: 120px) | 'lg' (Hero Section: 140px)
 *  dark:    true | false
 *  style:   custom inline styles
 */
export default function LogoABC({ variant = 'ar', size = 'md', dark = false, style = {} }) {
  // Height mapping: sm=54px (navbar), md=96px (footer), lg=145px (hero), xl=180px
  const heightMap = {
    sm: 54,
    md: 96,
    lg: 145,
    xl: 180
  };
  const height = heightMap[size] || 96;

  // Use highest quality source for Arabic, transparent for English
  const imgSrc = variant === 'en' ? logoEnTransparent : logoArHQ;
  // Provide 1x fallback for smaller renders
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
        width={Math.round(height * 2.05)}
        height={height}
        style={{
          height: `${height}px`,
          width: 'auto',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
          imageRendering: 'auto',
          background: 'transparent',
          mixBlendMode: dark ? 'normal' : 'multiply',
          filter: dark ? 'brightness(0) invert(1)' : 'none'
        }}
      />
    </div>
  );
}
