import React from 'react';
import { useData } from '../../../context/DataContext';
import { format } from 'date-fns';
import { Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
    const { activeProfile } = useData();
    const navigate = useNavigate();

    // Greeting based on time
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <p className="text-gray-500 text-sm font-medium">
                    {format(new Date(), 'EEEE, d MMM')}
                </p>
                <h1 className="text-2xl font-bold text-dark mt-0.5">
                    {greeting}, <br />
                    <span className="text-primary">{activeProfile?.name || 'User'}</span>
                </h1>
            </div>

            <div className="flex items-center gap-3">
                {/* Profile Switcher / Link */}
                <button
                    onClick={() => navigate('/profile')}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors border-2 border-white shadow-sm"
                    title="Switch Profile"
                >
                    {activeProfile?.type === 'pet' ? '🐾' : (activeProfile?.name?.[0] || <User className="w-5 h-5" />)}
                </button>
            </div>
        </div>
    );
}
