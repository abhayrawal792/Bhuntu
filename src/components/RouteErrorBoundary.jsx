import React from 'react';

const CHUNK_ERROR_PATTERNS = [
  /chunk/i,
  /loading chunk/i,
  /chunk[0-9]*.{3}[a-zA-Z0-9_-]{6}/,
  /failed to fetch/i,
  /script error/i,
  /import.*failed/i,
];

const isChunkError = (error) => {
  if (!error) return false;
  const msg = String(error.message || error.name || error);
  return CHUNK_ERROR_PATTERNS.some((pattern) => pattern.test(msg));
};

export default class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('[Bhuntu] Page render failed:', error, errorInfo);
  }

  handleRetry = () => {
    const { error } = this.state;
    if (isChunkError(error)) {
      // Force a full page reload which re-fetches the missing chunk,
      // restoring the exact page the visitor was on — the classic "blank
      // until refresh" recovery, now done automatically with one tap.
      window.location.href = this.props.currentPath || window.location.href;
    } else {
      // Any other render failure: remount the route fresh.
      this.setState({ error: null });
      window.location.reload();
    }
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-dvh flex items-center justify-center bg-[#FAF8F8] px-6 text-center">
        <div className="max-w-sm rounded-[2rem] border-2 border-pink-200 bg-white p-8 shadow-xl">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-rose-100 text-rose-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1 14h2m-1-10v6" /></svg>
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-rose-500">A surprise slipped away</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-[#351624]">Oops! This page hid on Abu.</h2>
          <p className="mt-4 text-sm leading-7 text-[#744e5b]">
            The moment didn&rsquo;t load completely — this happens sometimes on a slow connection. Tap below and Abu will bring it back.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#351624] px-5 py-3 text-sm font-bold text-white"
          >
            Bring it back <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    );
  }
}

/**
 * Wraps the whole lazy-rendered route tree so that:
 * 1. A thrown lazy-chunk load error (the usual "blank page until refresh")
 *    is caught and shown as a friendly retry card instead of a blank screen.
 * 2. Any per-page render crash is also caught the same way.
 */
export function wrapWithErrorBoundary(children, currentPath) {
  return (
    <RouteErrorBoundary key={currentPath}>
      {children}
    </RouteErrorBoundary>
  );
}
