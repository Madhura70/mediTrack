import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '../components/common/Button';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReset = () => {
        // Attempt to recover by reloading, maybe clearing bad state if we were advanced
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-6 bg-red-50">
                    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center space-y-4">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldAlert className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
                        <p className="text-gray-500">
                            MediTrack encountered an unexpected error. We've logged this issue.
                        </p>
                        <div className="bg-gray-100 p-4 rounded-xl text-left overflow-auto max-h-32 text-xs font-mono text-gray-600">
                            {this.state.error?.toString()}
                        </div>
                        <div className="pt-4">
                            <Button onClick={this.handleReset} className="w-full">
                                Restart App
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
