import React from 'react';
import { useData } from '../../../context/DataContext';
import { Pill, Trash2, Clock, PlusCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../common/Button';

export default function MedicineList() {
    const { medicines, deleteMedicine, refillMedicine } = useData();

    const handleRefill = (med) => {
        const amount = window.prompt(`Refill ${med.name}: Enter quantity`, "30");
        if (amount && !isNaN(amount)) {
            refillMedicine(med.id, parseInt(amount));
        }
    };

    if (medicines.length === 0) {
        return (
            <div className="text-center py-10">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Pill className="w-8 h-8" />
                </div>
                <p className="text-gray-500">No medicines added yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {medicines.map((med) => {
                const isLowStock = (med.currentStock || 0) <= (med.refillThreshold || 5);

                return (
                    <div key={med.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <Pill className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-dark">{med.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>{med.dosage}</span>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {med.time} ({med.frequency})
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => deleteMedicine(med.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Inventory Section */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                            <div className="flex items-center gap-3">
                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isLowStock ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}>
                                    {isLowStock && <AlertCircle className="w-3 h-3" />}
                                    <span>{med.currentStock || 0} left</span>
                                </div>
                                {isLowStock && (
                                    <span className="text-xs text-red-500 font-medium animate-pulse">Low Stock</span>
                                )}
                            </div>

                            <button
                                onClick={() => handleRefill(med)}
                                className="text-xs font-medium text-primary flex items-center gap-1 hover:text-primary/80"
                            >
                                <PlusCircle className="w-3 h-3" />
                                Refill
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
