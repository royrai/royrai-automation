import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center px-4">
            <div className="text-6xl mb-4">😓</div>
            <h1 className="text-3xl font-heading text-primary mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-text-light mb-8 max-w-md mx-auto">
              We apologize for the inconvenience. Please try refreshing the page or go back to the homepage.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary"
              >
                Refresh Page
              </button>
              <Link to="/" className="btn-primary">
                Go to Homepage
              </Link>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left bg-red-50 p-4 rounded-lg max-w-2xl mx-auto">
                <summary className="cursor-pointer text-red-600 font-medium">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 text-xs text-red-800 overflow-auto">
                  {this.state.error.toString()}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
