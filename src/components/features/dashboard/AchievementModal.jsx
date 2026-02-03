import React, { useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { X, Trophy, Star } from 'lucide-react';
import { Button } from '../../common/Button';

export default function AchievementModal() {
    const { showCelebration, setShowCelebration } = useData();

    if (!showCelebration) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center relative overflow-hidden">
                {/* Background Burst */}
                <div className="absolute inset-0 bg-yellow-50 z-0"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

                <div className="relative z-10">
                    <div className="w-20 h-20 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-4xl animate-bounce">
                        {showCelebration.icon || '🏆'}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Badge Unlocked!</h2>
                    <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-2">
                        {showCelebration.name}
                    </h3>
                    <p className="text-gray-500 mb-8">{showCelebration.desc}</p>

                    <Button onClick={() => setShowCelebration(null)} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 border-none hover:shadow-lg hover:scale-[1.02] transition-transform">
                        Awesome!
                    </Button>
                </div>
            </div>
        </div>
    );
}
