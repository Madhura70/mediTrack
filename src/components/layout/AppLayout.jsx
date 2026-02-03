import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
                <Outlet />
            </div>
            <BottomNav />
        </div>
    );
}
