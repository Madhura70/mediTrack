import React, { useEffect } from 'react';
import { useData } from '../../../context/DataContext';
import { Trophy, CheckCircle, Circle } from 'lucide-react';
// import confetti from 'canvas-confetti';

export default function DailyChallengeWidget() {
    const { dailyChallenges, completeChallenge, xp } = useData();

    const handleCheck = (taskId) => {
        completeChallenge(taskId);
        // Trigger small confetti burst
        if (typeof window !== 'undefined' && window.confetti) {
            // window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        }
    };

    const completedCount = dailyChallenges.tasks.filter(t => t.completed).length;
    const progress = (completedCount / dailyChallenges.tasks.length) * 100;

    return (
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden mb-6">
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-300" />
                        <h3 className="font-bold">Daily Goals</h3>
                    </div>
                    <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">{xp} XP</span>
                </div>

                <div className="space-y-3">
                    {dailyChallenges.tasks.map(task => (
                        <button
                            key={task.id}
                            onClick={() => !task.completed && handleCheck(task.id)}
                            className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-all ${task.completed ? 'bg-white/20 opacity-80' : 'bg-white/10 hover:bg-white/20'
                                }`}
                        >
                            {task.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-300 shrink-0" />
                            ) : (
                                <Circle className="w-5 h-5 text-white/50 shrink-0" />
                            )}
                            <span className={`text-sm ${task.completed ? 'line-through text-white/70' : 'text-white'}`}>
                                {task.text}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs text-indigo-100 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Direct CSS Confetti/Circles Bkg */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-900/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />
        </div>
    );
}
