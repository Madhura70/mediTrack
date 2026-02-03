import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { checkInteractions } from '../../../utils/interactionDb';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { ChevronLeft, Pill, Clock, AlertTriangle } from 'lucide-react';

export default function AddMedicineForm() {
    const navigate = useNavigate();
    const { addMedicine, medicines } = useData();
    const [loading, setLoading] = useState(false);

    // Interaction Check State
    const [interactionWarnings, setInteractionWarnings] = useState([]);
    const [showWarningModal, setShowWarningModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        dosage: '',
        frequency: 'Daily',
        time: '09:00',
        type: 'Pill',
        currentStock: '',
        refillThreshold: '5',
        cost: '',
        pharmacy: ''
    });

    const COMMON_MEDS = [
        "Amoxicillin", "Atorvastatin", "Aspirin", "Adderall", "Amlodipine",
        "Ibuprofen", "Insulin", "Inderal",
        "Lisinopril", "Lipitor", "Levothyroxine", "Loratadine",
        "Metformin", "Melatonin", "Metoprolol", "Multivitamin",
        "Omeprazole", "Oxycodone",
        "Paracetamol", "Pantoprazole", "Prednisone", "Probiotic",
        "Sertraline", "Simvastatin",
        "Tylenol", "Tramadol",
        "Vitamin C", "Vitamin D", "Ventolin",
        "Xanax", "Zyrtec"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.name || !formData.dosage) {
            alert('Please fill in required fields');
            return;
        }

        const newMedicine = {
            ...formData,
            currentStock: Number(formData.currentStock) || 0,
            refillThreshold: Number(formData.refillThreshold) || 5,
            cost: Number(formData.cost) || 0,
            pharmacy: formData.pharmacy
        };

        // Check Interactions (Phase 1 Feature)
        const warnings = checkInteractions(newMedicine.name, medicines); // Pass newMedicine.name for interaction check
        if (warnings.length > 0) {
            setInteractionWarnings(warnings);
            setPendingSubmission(newMedicine);
            return;
        }

        addMedicine(newMedicine);
        navigate('/medicines');
    };

    return (
        <div className="p-6 pb-24 relative">
            {/* Interaction Warning Modal */}
            {interactionWarnings.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
                        <div className="flex items-center gap-3 text-amber-500">
                            <AlertTriangle className="w-8 h-8" />
                            <h3 className="text-lg font-bold text-gray-900">Interaction Detected</h3>
                        </div>

                        <div className="space-y-3">
                            <p className="text-gray-600 text-sm">
                                Use caution! <b>{formData.name}</b> may interact with:
                            </p>
                            {interactionWarnings.map((warn, idx) => (
                                <div key={idx} className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-amber-800 text-sm">{warn.pair[1]}</span>
                                        <span className="text-xs uppercase font-bold text-amber-600 px-2 py-0.5 bg-amber-100 rounded-full">{warn.severity}</span>
                                    </div>
                                    <p className="text-xs text-amber-700">{warn.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-4">
                            <Button variant="outline" className="flex-1" onClick={() => setInteractionWarnings([])}>
                                Cancel
                            </Button>
                            <Button variant="primary" className="flex-1 bg-amber-600 hover:bg-amber-700 border-transparent" onClick={() => { addMedicine(pendingSubmission); navigate('/medicines'); }}>
                                Proceed Anyway
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Add Medicine</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Medicine Name"
                    placeholder="e.g. Amoxicillin"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    icon={<Pill className="w-5 h-5" />}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Dosage"
                        placeholder="e.g. 500mg"
                        value={formData.dosage}
                        onChange={e => setFormData({ ...formData, dosage: e.target.value })}
                        required
                    />

                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-gray-700">Type</label>
                        <select
                            className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option>Pill</option>
                            <option>Liquid</option>
                            <option>Injection</option>
                            <option>Inhaler</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-gray-700">Frequency</label>
                        <select
                            className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            value={formData.frequency}
                            onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                        >
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>As Needed</option>
                        </select>
                    </div>

                    <Input
                        label="Time"
                        type="time"
                        value={formData.time}
                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                        required
                        icon={<Clock className="w-5 h-5" />}
                    />
                </div>

                {/* Inventory Section */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-100">
                    <h3 className="font-semibold text-gray-900">Inventory Tracking</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Current Stock"
                            type="number"
                            placeholder="e.g. 30"
                            value={formData.currentStock}
                            onChange={e => setFormData({ ...formData, currentStock: e.target.value })}
                        />
                        <Input
                            label="Refill Alert At"
                            type="number"
                            placeholder="e.g. 5"
                            value={formData.refillThreshold}
                            onChange={e => setFormData({ ...formData, refillThreshold: e.target.value })}
                        />
                    </div>
                </div>

                {/* Financials Section */}
                <div className="bg-teal-50 p-4 rounded-xl space-y-4 border border-teal-100">
                    <h3 className="font-semibold text-teal-900">Financials</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Cost per Refill ($)"
                            type="number"
                            placeholder="0.00"
                            value={formData.cost}
                            onChange={e => setFormData({ ...formData, cost: e.target.value })}
                        />
                        <Input
                            label="Pharmacy"
                            placeholder="e.g. CVS"
                            value={formData.pharmacy}
                            onChange={e => setFormData({ ...formData, pharmacy: e.target.value })}
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full mt-8" isLoading={loading}>
                    Save Medicine
                </Button>
            </form>
        </div>
    );
}
