import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useData } from '../context/DataContext';
import { Button } from '../components/common/Button';
import { Plus, Activity, Thermometer, User, Heart, Frown, Save } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '../components/common/Input';

export default function Health() {
    const [activeTab, setActiveTab] = useState('vitals'); // vitals, analytics, symptoms
    const { vitals, addVital, symptoms = [], addSymptom } = useData();
    const [showAddVital, setShowAddVital] = useState(false);

    // Symptom Form State
    const [symptomForm, setSymptomForm] = useState({ name: '', severity: 5, notes: '' });

    // Filter vitals by type for charts
    const weightData = vitals.filter(v => v.type === 'Weight').sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    // Quick Add Mock
    const handleAddVitalMock = (type) => {
        const val = window.prompt(`Enter ${type} value:`);
        if (val) {
            addVital({
                type,
                value: val,
                unit: type === 'Weight' ? 'kg' : type === 'Temperature' ? '°C' : 'bpm'
            });
        }
    };

    const handleAddSymptom = (e) => {
        e.preventDefault();
        addSymptom(symptomForm);
        setSymptomForm({ name: '', severity: 5, notes: '' });
    };

    return (
        <div className="p-6 pb-24 space-y-6">
            <header className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Health Hub</h1>
            </header>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                {['vitals', 'analytics', 'symptoms'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all duration-200 ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* --- VITALS TAB --- */}
            {activeTab === 'vitals' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    {/* Quick Add Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button onClick={() => handleAddVitalMock('Weight')} className="p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl flex flex-col items-center gap-2 transition-colors">
                            <div className="w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                <User className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold text-blue-700">Weight</span>
                        </button>
                        <button onClick={() => handleAddVitalMock('Blood Pressure')} className="p-4 bg-red-50 hover:bg-red-100 rounded-2xl flex flex-col items-center gap-2 transition-colors">
                            <div className="w-10 h-10 bg-white text-red-500 rounded-full flex items-center justify-center shadow-sm">
                                <Activity className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold text-red-700">Blood Pressure</span>
                        </button>
                        <button onClick={() => handleAddVitalMock('Heart Rate')} className="p-4 bg-rose-50 hover:bg-rose-100 rounded-2xl flex flex-col items-center gap-2 transition-colors">
                            <div className="w-10 h-10 bg-white text-rose-500 rounded-full flex items-center justify-center shadow-sm">
                                <Heart className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold text-rose-700">Heart Rate</span>
                        </button>
                        <button onClick={() => handleAddVitalMock('Temperature')} className="p-4 bg-orange-50 hover:bg-orange-100 rounded-2xl flex flex-col items-center gap-2 transition-colors">
                            <div className="w-10 h-10 bg-white text-orange-500 rounded-full flex items-center justify-center shadow-sm">
                                <Thermometer className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-semibold text-orange-700">Temperature</span>
                        </button>
                    </div>

                    {/* Recent Measurements List */}
                    <h3 className="font-bold text-gray-900 text-lg">Recent History</h3>
                    <div className="space-y-3">
                        {vitals.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">No vitals recorded yet.</p>
                        ) : (
                            vitals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(v => (
                                <div key={v.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{v.type}</p>
                                            <p className="text-xs text-gray-400">{format(new Date(v.createdAt), 'MMM d, h:mm a')}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-primary">{v.value}</span>
                                        <span className="text-xs text-gray-500 ml-1">{v.unit}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* --- ANALYTICS TAB --- */}
            {activeTab === 'analytics' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Weight Trend</h3>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weightData}>
                                    <defs>
                                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="createdAt" tickFormatter={(str) => format(new Date(str), 'd MMM')} stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis hide domain={['auto', 'auto']} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="value" stroke="#4ECDC4" fillOpacity={1} fill="url(#colorWeight)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* --- SYMPTOMS TAB --- */}
            {activeTab === 'symptoms' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    {/* Add Symptom Form */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Frown className="w-5 h-5 text-secondary" />
                            Log Symptom
                        </h3>
                        <form onSubmit={handleAddSymptom} className="space-y-4">
                            <Input
                                placeholder="What are you feeling? (e.g. Headache)"
                                value={symptomForm.name}
                                onChange={e => setSymptomForm({ ...symptomForm, name: e.target.value })}
                            />
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">Severity (1-10): {symptomForm.severity}</label>
                                <input
                                    type="range" min="1" max="10"
                                    className="w-full accent-secondary"
                                    value={symptomForm.severity}
                                    onChange={e => setSymptomForm({ ...symptomForm, severity: e.target.value })}
                                />
                            </div>
                            <Button variant="secondary" className="w-full" type="submit">
                                <Save className="w-4 h-4 mr-2" />
                                Save Entry
                            </Button>
                        </form>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4 pl-4 border-l-2 border-gray-100">
                        {symptoms.length === 0 ? (
                            <p className="text-gray-400 text-sm">No symptoms logged.</p>
                        ) : (
                            symptoms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(s => (
                                <div key={s.id} className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-white"></div>
                                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-semibold text-gray-800">{s.name}</h4>
                                            <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                Level {s.severity}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">{format(new Date(s.createdAt), 'MMM d, h:mm a')}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
