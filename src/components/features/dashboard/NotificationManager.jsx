import React from 'react';
import { useReminders } from '../../../hooks/useReminders';
import { useData } from '../../../context/DataContext';
import { Bell, X, Check, Clock } from 'lucide-react';
import { Button } from '../../common/Button';

export default function NotificationManager() {
    const { alerts, dismissAlert, snoozeAlert } = useReminders();
    const { markMedicineTaken } = useData();

    const handleTake = (alert) => {
        markMedicineTaken(alert.id);
        dismissAlert(alert.id);
    };

    if (alerts.length === 0) return null;

    return (
        <div className="fixed top-4 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
            {alerts.map(alert => (
                <div
                    key={alert.alertId}
                    className="bg-white p-4 rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 w-full max-w-sm pointer-events-auto animate-in slide-in-from-top-4 fade-in duration-300"
                >
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center animate-pulse">
                                <Bell className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Medication Due</h4>
                                <p className="text-gray-600 text-sm">Take <span className="font-semibold text-primary">{alert.name}</span> ({alert.dosage})</p>
                            </div>
                        </div>
                        <button
                            onClick={() => dismissAlert(alert.id)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={() => handleTake(alert)}
                            className="flex-1 py-2 text-sm bg-primary text-white hover:bg-primary/90"
                        >
                            <Check className="w-4 h-4 mr-1.5" />
                            Take Now
                        </Button>
                        <button
                            onClick={() => snoozeAlert(alert)}
                            className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 flex items-center justify-center"
                        >
                            <Clock className="w-4 h-4 mr-1.5" />
                            Snooze
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
