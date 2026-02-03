import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Button({
    children,
    variant = 'primary',
    className,
    isLoading,
    ...props
}) {
    const variants = {
        primary: 'bg-primary text-white hover:bg-opacity-90 active:scale-95',
        secondary: 'bg-secondary text-white hover:bg-opacity-90 active:scale-95',
        outline: 'border-2 border-primary text-primary hover:bg-primary/10 active:scale-95',
        ghost: 'text-gray-500 hover:bg-gray-100 active:scale-95',
        link: 'text-primary underline hover:text-primary/80',
    };

    return (
        <button
            className={cn(
                'px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
                variants[variant],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : children}
        </button>
    );
}
