import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Check, X, Circle, Calendar as CalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    const navigate = useNavigate();
    const { logs, medicines } = useData();
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate)
    });

    const getStatusForDay = (day) => {
        // This is a simplified "Adherence" check for the day.
        // In a real app, we'd check if ALL required meds were taken.
        // Here: 
        // - Green: At least 1 med taken
        // - Gray: No meds taken (or future)

        const dayLogs = logs.filter(l => isSameDay(new Date(l.takenAt), day));
        if (dayLogs.length > 0) return 'good';
        return 'none';
    };

    return (
        <div className="p-6 pb-24 min-h-screen bg-gray-50">
            <header className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">History</h1>
            </header>

            <div className="bg-white rounded-3xl shadow-sm p-6">
                {/* Month Header */}
                <div className="flex items-center justify-between mb-8">
                    <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <h2 className="text-xl font-bold text-gray-900">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7 gap-y-6 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                        <div key={d} className="text-xs font-bold text-gray-400 uppercase">{d}</div>
                    ))}

                    {/* Padding for start of month - simplified for this demo, assume starts correctly or use getDay() padding */}
                    {Array.from({ length: startOfMonth(currentDate).getDay() }).map((_, i) => (
                        <div key={`pad-${i}`} />
                    ))}

                    {daysInMonth.map(day => {
                        const status = getStatusForDay(day);
                        const isToday = isSameDay(day, new Date());

                        return (
                            <div key={day.toString()} className="flex flex-col items-center gap-1">
                                <span className={`text-sm font-medium ${isToday ? 'bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center' : 'text-gray-700'}`}>
                                    {format(day, 'd')}
                                </span>
                                {status === 'good' && (
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CalIcon className="w-5 h-5 opacity-50" />
                    Event Stream
                </h3>
                {/* List logs for selected month */}
                <div className="space-y-3">
                    {logs
                        .filter(l => isSameMonth(new Date(l.takenAt), currentDate))
                        .sort((a, b) => new Date(b.takenAt) - new Date(a.takenAt))
                        .map(log => {
                            const med = medicines.find(m => m.id === log.medicineId);
                            return (
                                <div key={log.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <div className="bg-green-100 text-green-600 p-2 rounded-full">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-900">{med?.name || 'Unknown Med'}</p>
                                        <p className="text-xs text-gray-500">{format(new Date(log.takenAt), 'MMM d, h:mm a')}</p>
                                    </div>
                                </div>
                            );
                        })}
                    {logs.filter(l => isSameMonth(new Date(l.takenAt), currentDate)).length === 0 && (
                        <p className="text-center text-gray-400 text-sm py-4">No activity this month.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
