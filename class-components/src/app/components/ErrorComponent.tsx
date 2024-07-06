import React, { ErrorInfo } from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  Record<string, never>,
  State
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
