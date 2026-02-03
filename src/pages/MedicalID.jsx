import React from 'react';
import { useData } from '../context/DataContext';
import { Phone, AlertCircle, Droplet, User, Pill, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MedicalID() {
    const navigate = useNavigate();
    const { activeProfile, medicines, activeInsurance } = useData();

    // Mock Emergency Contacts (In a real app, these would be in profile state)
    const contacts = [
        { name: "Mom", relation: "Parent", phone: "555-0101" },
        { name: "Dr. Smith", relation: "Physician", phone: "555-0199" }
    ];

    const criticalMeds = medicines.filter(m => m.currentStock > 0);

    return (
        <div className="min-h-screen bg-red-50 p-6 pb-24">
            <header className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm text-red-600">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex-1 text-center pr-10">
                    <h1 className="text-2xl font-black text-red-600 uppercase tracking-widest flex items-center justify-center gap-2">
                        <AlertCircle className="w-8 h-8" />
                        Medical ID
                    </h1>
                    <p className="text-xs text-red-400 font-bold">SHOW TO FIRST RESPONDERS</p>
                </div>
            </header>

            <div className="space-y-6 max-w-lg mx-auto">
                {/* Profile Card */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border-l-8 border-red-500 flex gap-6 items-start">
                    <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center text-4xl">
                        {activeProfile.name[0]}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{activeProfile.name}</h2>
                        <p className="text-gray-500 font-medium">DOB: Jan 1, 1980 (Est)</p>
                        <div className="mt-3 flex gap-2">
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1">
                                <Droplet className="w-3 h-3" /> Type O+
                            </span>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                                No Known Allergies
                            </span>
                        </div>
                    </div>
                </div>

                {/* Emergency Contacts */}
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Emergency Contacts
                    </h3>
                    <div className="space-y-4">
                        {contacts.map((c, i) => (
                            <div key={i} className="flex items-center justify-between border-b last:border-0 border-gray-100 pb-4 last:pb-0">
                                <div>
                                    <p className="font-bold text-gray-900">{c.name}</p>
                                    <p className="text-xs text-gray-500">{c.relation}</p>
                                </div>
                                <a href={`tel:${c.phone}`} className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200">
                                    <Phone className="w-5 h-5" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Medications */}
                <div className="bg-white p-6 rounded-3xl shadow-sm">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Pill className="w-4 h-4" /> Active Medications
                    </h3>
                    {criticalMeds.length > 0 ? (
                        <ul className="space-y-2">
                            {criticalMeds.map(m => (
                                <li key={m.id} className="p-3 bg-gray-50 rounded-xl flex justify-between items-center">
                                    <span className="font-semibold text-gray-800">{m.name}</span>
                                    <span className="text-xs bg-white border border-gray-200 px-2 py-1 rounded text-gray-600">{m.dosage}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 italic text-sm">No active medications listed.</p>
                    )}
                </div>

                {activeInsurance?.provider && (
                    <div className="bg-white p-6 rounded-3xl shadow-sm">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Insurance</h3>
                        <p className="font-bold text-lg">{activeInsurance.provider}</p>
                        <p className="text-sm text-gray-600">Policy: {activeInsurance.policyNumber}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
