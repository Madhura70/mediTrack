import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { FileText, DollarSign, Shield, Plus, X, Upload, CreditCard, Printer } from 'lucide-react';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, YAxis } from 'recharts';
import { Link } from 'react-router-dom';

export default function Records() {
    const [activeTab, setActiveTab] = useState('documents');
    const { documents, addDocument, activeInsurance, saveInsurance, medicines, appointments } = useData();

    // --- DOCUMENTS STATE ---
    const [showAddDoc, setShowAddDoc] = useState(false);
    const [docForm, setDocForm] = useState({ title: '', type: 'Report', doctor: '', notes: '' });

    // --- INSURANCE STATE ---
    const [isEditingInsurance, setIsEditingInsurance] = useState(false);
    const [insuranceForm, setInsuranceForm] = useState(activeInsurance || {});

    // --- FINANCIALS DATA ---
    const totalMedCost = medicines.reduce((sum, m) => sum + (m.cost || 0), 0);
    const totalApptCost = appointments.reduce((sum, a) => sum + (a.cost || 0), 0);
    const totalSpend = totalMedCost + totalApptCost;

    const costData = [
        { name: 'Medicines', value: totalMedCost, color: '#4ECDC4' },
        { name: 'Appointments', value: totalApptCost, color: '#FF6B6B' },
    ];

    // Handlers
    const handleAddDoc = (e) => {
        e.preventDefault();
        addDocument(docForm);
        setDocForm({ title: '', type: 'Report', doctor: '', notes: '' });
        setShowAddDoc(false);
    };

    const handleSaveInsurance = (e) => {
        e.preventDefault();
        saveInsurance(insuranceForm);
        setIsEditingInsurance(false);
    };

    return (
        <div className="p-6 pb-24 space-y-6">
            <header className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Records</h1>
                <Link to="/report" target="_blank" className="p-2 text-primary bg-primary/5 rounded-full hover:bg-primary/10 transition-colors" title="Print Doctor Report">
                    <Printer className="w-5 h-5" />
                </Link>
            </header>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                {[
                    { id: 'documents', label: 'Docs', icon: FileText },
                    { id: 'financials', label: 'Costs', icon: DollarSign },
                    { id: 'insurance', label: 'Insurance', icon: Shield }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 ${activeTab === tab.id ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* --- DOCUMENTS TAB --- */}
            {activeTab === 'documents' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    {/* Add Doc Modal */}
                    {showAddDoc && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-lg">Add Record</h3>
                                    <button onClick={() => setShowAddDoc(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddDoc} className="space-y-4">
                                    <Input label="Title" placeholder="e.g. Blood Test Result" value={docForm.title} onChange={e => setDocForm({ ...docForm, title: e.target.value })} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-medium text-gray-700">Type</label>
                                            <select className="px-4 py-3 rounded-xl border border-gray-200 bg-white" value={docForm.type} onChange={e => setDocForm({ ...docForm, type: e.target.value })}>
                                                <option>Report</option>
                                                <option>Prescription</option>
                                                <option>Bill</option>
                                            </select>
                                        </div>
                                        <Input label="Doctor" placeholder="Dr. Smith" value={docForm.doctor} onChange={e => setDocForm({ ...docForm, doctor: e.target.value })} />
                                    </div>
                                    <Input label="Notes" placeholder="Optional notes..." value={docForm.notes} onChange={e => setDocForm({ ...docForm, notes: e.target.value })} />
                                    <Button type="submit" className="w-full">Save Record</Button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button onClick={() => setShowAddDoc(true)} className="p-4 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-2xl flex flex-col items-center gap-2 transition-colors border-dashed border-2">
                            <div className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center shadow-sm">
                                <Plus className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold text-primary">Add New</span>
                        </button>
                        {/* Mock Upload Button */}
                        <button className="p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl flex flex-col items-center gap-2 transition-colors">
                            <div className="w-10 h-10 bg-white text-gray-500 rounded-full flex items-center justify-center shadow-sm">
                                <Upload className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold text-gray-600">Scan Doc</span>
                        </button>
                    </div>

                    <div className="space-y-3">
                        {documents.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">No documents filed.</p>
                        ) : (
                            documents.map(doc => (
                                <div key={doc.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center shrink-0">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                                        <p className="text-xs text-gray-500">{doc.type} • {doc.doctor}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-medium text-gray-400 block">{format(new Date(doc.createdAt), 'MMM d')}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* --- FINANCIALS TAB --- */}
            {activeTab === 'financials' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Med Spend</span>
                            <div className="text-4xl font-bold mt-1 mb-4">${totalSpend.toFixed(2)}</div>
                            <div className="flex gap-4">
                                <div>
                                    <span className="text-xs text-gray-400 block">Medicines</span>
                                    <span className="font-semibold text-teal-400">${totalMedCost}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 block">Consultations</span>
                                    <span className="font-semibold text-rose-400">${totalApptCost}</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                            <DollarSign className="w-48 h-48" />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Cost Breakdown</h3>
                        <div className="h-48 w-full flex items-center justify-center">
                            {totalSpend > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={costData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {costData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-gray-400 text-sm">No expense data to display.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* --- INSURANCE TAB --- */}
            {activeTab === 'insurance' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    {!activeInsurance.provider && !isEditingInsurance ? (
                        <div className="text-center py-10 space-y-4">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-500">
                                <Shield className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">No Insurance Added</h3>
                                <p className="text-gray-500 text-sm">Keep your policy details handy.</p>
                            </div>
                            <Button onClick={() => setIsEditingInsurance(true)}>Add Insurance Card</Button>
                        </div>
                    ) : isEditingInsurance ? (
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Edit Insurance</h3>
                            <form onSubmit={handleSaveInsurance} className="space-y-4">
                                <Input label="Provider" placeholder="e.g. Blue Cross" value={insuranceForm.provider || ''} onChange={e => setInsuranceForm({ ...insuranceForm, provider: e.target.value })} />
                                <Input label="Policy Number" placeholder="XYZ123456" value={insuranceForm.policyNumber || ''} onChange={e => setInsuranceForm({ ...insuranceForm, policyNumber: e.target.value })} />
                                <Input label="Group Number" placeholder="GRP999" value={insuranceForm.groupNumber || ''} onChange={e => setInsuranceForm({ ...insuranceForm, groupNumber: e.target.value })} />
                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" className="flex-1" onClick={() => setIsEditingInsurance(false)}>Cancel</Button>
                                    <Button type="submit" className="flex-1">Save Card</Button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Digital Card UI */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden aspect-[1.58/1]">
                                <div className="relative z-10 flex flex-col justify-between h-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-blue-200 text-xs uppercase font-bold tracking-wider mb-1">Provider</p>
                                            <h2 className="text-2xl font-bold font-serif tracking-wide">{activeInsurance.provider}</h2>
                                        </div>
                                        <Shield className="w-8 h-8 text-blue-300" />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-blue-200 text-[10px] uppercase font-bold">Policy Number</p>
                                                <p className="font-mono text-lg tracking-widest">{activeInsurance.policyNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-blue-200 text-[10px] uppercase font-bold">Group</p>
                                                <p className="font-medium">{activeInsurance.groupNumber || 'N/A'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-blue-200 text-[10px] uppercase font-bold">Member</p>
                                                <p className="font-medium">Primary</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative Circles */}
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
                            </div>

                            <Button variant="outline" className="w-full" onClick={() => { setInsuranceForm(activeInsurance); setIsEditingInsurance(true); }}>
                                Edit Details
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
