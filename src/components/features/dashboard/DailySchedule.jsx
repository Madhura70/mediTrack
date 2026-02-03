import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { Pill, Plus, Check } from 'lucide-react';
import { cn } from '../../common/Button';

export default function DailySchedule() {
    const { medicines, markMedicineTaken, matchMedicineLog } = useData();

    // Filter medicines for Today (simplified for prototype: show all daily meds)
    const todayMeds = medicines.filter(med => med.frequency === 'daily' || med.frequency === 'Daily');

    if (todayMeds.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Pill className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-dark mb-1">No medicines for today</h3>
                <p className="text-gray-500 text-sm mb-4">You haven't added any schedule yet.</p>
                <Link to="/medicines" className="text-primary font-semibold text-sm hover:underline">
                    + Add Medicine
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-dark">Today's Schedule</h2>
                <Link to="/medicines" className="text-primary text-sm font-medium hover:underline">
                    Manage
                </Link>
            </div>

            <div className="space-y-3">
                {todayMeds.map((med) => {
                    const isTaken = matchMedicineLog ? !!matchMedicineLog(med.id, new Date()) : false;

                    return (
                        <div key={med.id} className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                    isTaken ? "bg-green-100 text-green-600" : "bg-blue-50 text-blue-500"
                                )}>
                                    {isTaken ? <Check className="w-6 h-6" /> : <Pill className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className={cn("font-semibold text-dark", isTaken && "line-through text-gray-400")}>
                                        {med.name}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {med.dosage} • {med.time || 'Anytime'}
                                    </p>
                                </div>
                            </div>

                            {!isTaken && (
                                <button
                                    onClick={() => markMedicineTaken(med.id)}
                                    className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95"
                                    title="Mark as taken"
                                >
                                    <Check className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
