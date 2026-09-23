import logoArHQ from '../assets/logo_user_official.png?v=clean2';
import logoArTransparent from '../assets/logo_ar_transparent.png?v=clean2';
import logoEnTransparent from '../assets/logo_en_transparent.png?v=clean2';

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
  // Height mapping: sm=72px (navbar), md=120px (footer), lg=140px (hero)
  const heightMap = {
    sm: 72,
    md: 120,
    lg: 140
  };
  const height = heightMap[size] || 120;

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
