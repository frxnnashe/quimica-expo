// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de informes de errores
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de fallback personalizada
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#e74c3c', border: '1px solid #e74c3c', borderRadius: '8px', margin: '20px' }}>
          <h2>¡Ups! Algo salió mal en la visualización 3D.</h2>
          <p>Por favor, intenta recargar la página o revisa la consola para más detalles.</p>
          {/* Para depuración, puedes mostrar el error */}
          {/* <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left', marginTop: '10px' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details> */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;