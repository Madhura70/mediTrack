import React from 'react';
import { useData } from '../../../context/DataContext';
import { Activity, Flame, Trophy } from 'lucide-react';

export default function StatsOverview() {
    const context = useData();
    // Debug log to check if context is loaded
    console.log("StatsOverview Context:", context);

    const adherenceData = (context && typeof context.calculateAdherence === 'function')
        ? context.calculateAdherence()
        : { score: 0, streak: 0 };

    const { score, streak } = adherenceData;

    return (
        <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Adherence Score Card */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-2xl relative overflow-hidden group border border-primary/10">
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Activity className="w-24 h-24 text-primary" />
                </div>

                <div className="flex flex-col h-full justify-between">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mb-3">
                        <Activity className="w-5 h-5" />
                    </div>

                    <div>
                        <div className="flex items-end gap-1 mb-1">
                            <span className="text-3xl font-bold text-dark">{score}%</span>
                        </div>
                        <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">Daily Adherence</span>

                        {/* Simple Progress Bar */}
                        <div className="w-full h-1.5 bg-white/50 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${score}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Streak Card */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-4 rounded-2xl relative overflow-hidden group border border-orange-100">
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Flame className="w-24 h-24 text-orange-500" />
                </div>

                <div className="flex flex-col h-full justify-between">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm mb-3">
                        <Flame className="w-5 h-5 fill-current" />
                    </div>

                    <div>
                        <div className="flex items-end gap-1 mb-1">
                            <span className="text-3xl font-bold text-dark">{streak}</span>
                            <span className="text-sm font-semibold text-orange-600 mb-1">Days</span>
                        </div>
                        <span className="text-xs text-gray-600 font-medium uppercase tracking-wide">Current Streak</span>

                        {streak > 3 && (
                            <div className="flex items-center gap-1 mt-2 text-[10px] text-orange-600 font-bold bg-white/60 px-2 py-0.5 rounded-full w-fit">
                                <Trophy className="w-3 h-3" />
                                <span>On Fire!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
