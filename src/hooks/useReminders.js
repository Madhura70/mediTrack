import { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';

export function useReminders() {
    const { medicines, matchMedicineLog } = useData();
    const [alerts, setAlerts] = useState([]);

    // Track notified medicines for current session to avoid spam loop
    // Map: { medicineId: lastNotifiedDateString }
    const notifiedRef = useRef({});

    // 1. Request Permission
    useEffect(() => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    // 2. Poll Logic
    useEffect(() => {
        const check = () => {
            const now = new Date();
            const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // "09:00"

            medicines.forEach(med => {
                // Time Match?
                if (med.time === currentTime) {
                    // Already taken today?
                    const isTaken = matchMedicineLog(med.id, now);
                    if (isTaken) return;

                    // Already notified today?
                    const lastNotified = notifiedRef.current[med.id];
                    const todayStr = now.toDateString();
                    if (lastNotified === todayStr) return;

                    // Trigger Alert
                    triggerAlert(med);
                }
            });
        };

        const interval = setInterval(check, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, [medicines, matchMedicineLog]);

    const triggerAlert = (med) => {
        // 1. System Notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`Time to take ${med.name}`, {
                body: `Dosage: ${med.dosage}. Open app to log it.`,
                icon: '/vite.svg' // placeholder
            });
        }

        // 2. In-App Alert
        setAlerts(prev => {
            if (prev.find(a => a.id === med.id)) return prev;
            return [...prev, { ...med, alertId: crypto.randomUUID() }];
        });

        // Mark as notified
        notifiedRef.current[med.id] = new Date().toDateString();
    };

    const dismissAlert = (id) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    };

    const snoozeAlert = (med) => {
        // Simple Snooze: Remove alert now, clear "notified" flag so it fires again? 
        // Or better: Re-schedule. 
        // MVP Strategy: Just clear the alert from UI for now. 
        // Real snooze requires complex state. Let's just "Dismiss" for MVP visual.
        dismissAlert(med.id);

        // Reset notified flag after 10 mins? 
        // For MVP, "Snooze" just closes the modal but doesn't technically re-ring the bell 10m later 
        // unless we add "snoozedUntil" logic. Let's keep it simple.
    };

    return { alerts, dismissAlert, snoozeAlert };
}
