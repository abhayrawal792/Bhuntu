import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL/3D Error caught safely:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-950 dark:to-rose-950 rounded-2xl text-center shadow-inner">
          <Heart className="w-10 h-10 text-rose-500 animate-bounce mb-2" />
          <div className="text-xs font-bold text-rose-600 dark:text-rose-300">
            Infinite Love for Bhuntu ❤️
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
