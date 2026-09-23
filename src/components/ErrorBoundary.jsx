import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '40px 20px',
          textAlign: 'center',
          fontFamily: 'Cairo, sans-serif',
          direction: 'rtl',
          background: '#f8fafc'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⚠️</div>
          <h1 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '12px' }}>حدث خطأ غير متوقع</h1>
          <p style={{ color: '#64748b', marginBottom: '24px', maxWidth: '400px' }}>
            نعتذر عن هذا الخطأ. يرجى تحديث الصفحة للمتابعة.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #0284c7, #d946ef)',
              color: '#ffffff',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'Cairo, sans-serif'
            }}
          >
            تحديث الصفحة
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
