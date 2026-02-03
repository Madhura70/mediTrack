import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Pill, Calendar, HeartPulse, FileText } from 'lucide-react';
import { clsx } from 'clsx';

export function BottomNav() {
    const navItems = [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: Pill, label: 'Meds', path: '/medicines' },
        { icon: HeartPulse, label: 'Health', path: '/health' },
        { icon: Calendar, label: 'Plan', path: '/appointments' },
        { icon: FileText, label: 'Records', path: '/records' }, // Replaced Profile with Records
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 pb-safe z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            clsx(
                                'flex flex-col items-center gap-1 transition-colors duration-200 min-w-[3.5rem]',
                                isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                            )
                        }
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
