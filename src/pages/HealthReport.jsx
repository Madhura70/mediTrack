import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';
import { format } from 'date-fns';
import { Pill, Activity, Smartphone } from 'lucide-react';

export default function HealthReport() {
    const { activeProfile, medicines, vitals, logs, activeInsurance } = useData();

    // Auto-trigger print on load
    useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 1000);
    }, []);

    const today = format(new Date(), 'MMMM d, yyyy');

    return (
        <div className="max-w-3xl mx-auto bg-white p-12 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-black uppercase tracking-wide">Health Report</h1>
                    <p className="text-gray-600 mt-1">Generated on {today}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold">{activeProfile.name}</h2>
                    <p className="text-gray-600 capitalize">{activeProfile.type} Profile</p>
                </div>
            </div>

            {/* Insurance Info (if available) */}
            {activeInsurance?.provider && (
                <div className="mb-8 p-4 border border-gray-300 rounded-lg bg-gray-50 break-inside-avoid">
                    <h3 className="font-bold text-lg mb-2 uppercase text-gray-700">Insurance Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <p><span className="font-semibold">Provider:</span> {activeInsurance.provider}</p>
                        <p><span className="font-semibold">Policy #:</span> {activeInsurance.policyNumber}</p>
                        {activeInsurance.groupNumber && <p><span className="font-semibold">Group:</span> {activeInsurance.groupNumber}</p>}
                    </div>
                </div>
            )}

            {/* Medications */}
            <div className="mb-8 break-inside-avoid">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                    <Pill className="w-5 h-5" />
                    <h3 className="font-bold text-lg uppercase">Active Medications</h3>
                </div>
                {medicines.length === 0 ? (
                    <p className="text-gray-500 italic">No active medications listed.</p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border border-gray-300">Medicine</th>
                                <th className="p-2 border border-gray-300">Dosage</th>
                                <th className="p-2 border border-gray-300">Schedule</th>
                                <th className="p-2 border border-gray-300">Inventory</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map(med => (
                                <tr key={med.id}>
                                    <td className="p-2 border border-gray-300 font-semibold">{med.name}</td>
                                    <td className="p-2 border border-gray-300">{med.dosage}</td>
                                    <td className="p-2 border border-gray-300">{med.time} ({med.frequency || 'Daily'})</td>
                                    <td className="p-2 border border-gray-300">{med.currentStock} remaining</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Recent Vitals */}
            <div className="mb-8 break-inside-avoid">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                    <Activity className="w-5 h-5" />
                    <h3 className="font-bold text-lg uppercase">Recent Vitals</h3>
                </div>
                {vitals.length === 0 ? (
                    <p className="text-gray-500 italic">No vitals recorded.</p>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border border-gray-300">Date/Time</th>
                                <th className="p-2 border border-gray-300">Type</th>
                                <th className="p-2 border border-gray-300">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vitals.slice(-5).reverse().map(vital => (
                                <tr key={vital.id}>
                                    <td className="p-2 border border-gray-300">{format(new Date(vital.createdAt), 'MMM d, h:mm a')}</td>
                                    <td className="p-2 border border-gray-300 capitalize">{vital.type}</td>
                                    <td className="p-2 border border-gray-300 font-bold">{vital.value} <span className="text-gray-500 font-normal text-xs">{vital.unit}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    Generated via MediTrack App
                </p>
            </div>

            {/* Print Hider Style */}
            <style>{`
                @media print {
                    @page { margin: 20mm; }
                    body { -webkit-print-color-adjust: exact; }
                }
            `}</style>
        </div>
    );
}
