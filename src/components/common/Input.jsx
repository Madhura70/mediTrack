import React from 'react';
import { cn } from './Button'; // Reusing cn from Button file or extract to utils

export function Input({
    label,
    error,
    type = 'text',
    className,
    ...props
}) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={cn(
                    'px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900',
                    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                    'placeholder:text-gray-400 transition-all',
                    error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
                    className
                )}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                    {error}
                </span>
            )}
        </div>
    );
}
