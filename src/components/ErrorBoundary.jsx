import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-8 text-center">
                    <h1 className="font-serif text-4xl font-bold text-ink mb-4">Something went wrong.</h1>
                    <p className="text-ink-light font-serif italic mb-8 max-w-md">
                        {this.state.error?.message || "An unexpected error occurred."}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-ink text-paper rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                    >
                        Try Again
                    </button>
                    {this.state.error && (
                        <pre className="mt-12 p-4 bg-paper-dark rounded-xl text-left text-[10px] text-ink-lighter max-w-2xl overflow-auto border border-ink-lighter/10">
                            {this.state.error.stack}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
