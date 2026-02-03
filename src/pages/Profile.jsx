import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Sun, Moon, Bell, Shield, HelpCircle, ChevronRight, LogOut, Users, Plus, X, Download, Trash, Smartphone, Cloud, RefreshCw, FileText, Database } from 'lucide-react';

export default function Profile() {
    const { logout, user } = useAuth();
    const { profiles, addProfile, switchProfile, activeProfileId, achievements, xp, medicines, logs } = useData();

    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [showAddMember, setShowAddMember] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', type: 'adult' });
    const [installPrompt, setInstallPrompt] = useState(null);

    // Phase 9: Sync & Export State
    const [autoSync, setAutoSync] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSynced, setLastSynced] = useState(null);
    const [showExportModal, setShowExportModal] = useState(false);

    // ... (Existing Effects for Dark Mode & Install Prompt) ...
    // Toggle Dark Mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Listen for PWA Install Prompt
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setInstallPrompt(e);
        });
    }, []);

    // Sync Simulation Logic
    const handleSyncToggle = () => {
        if (!autoSync) {
            // Turning ON
            setIsSyncing(true);
            setTimeout(() => {
                setIsSyncing(false);
                setLastSynced(new Date());
                setAutoSync(true);
            }, 2000); // 2s fake delay
        } else {
            // Turning OFF
            setAutoSync(false);
        }
    };

    // ... (Existing Handlers: handleInstallClick, handleAddMember) ...
    const handleInstallClick = () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        installPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            setInstallPrompt(null);
        });
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        if (!newMember.name) return;
        addProfile(newMember);
        setNewMember({ name: '', type: 'adult' });
        setShowAddMember(false);
    };

    const generateCSV = () => {
        // Simple CSV generation for medicines
        const headers = ["Name", "Dosage", "Stock", "Frequency", "Time"];
        const rows = medicines.map(m => [
            `"${m.name}"`,
            `"${m.dosage}"`,
            m.currentStock,
            `"${m.frequency}"`,
            `"${m.time}"`
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(r => r.join(','))
        ].join('\n');

        downloadFile(csvContent, 'meditrack_medicines.csv', 'text/csv');
    };

    const generateJSON = () => {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('mediTrack_')) {
                const val = localStorage.getItem(key);
                try { data[key] = JSON.parse(val); } catch (e) { data[key] = val; }
            }
        }
        downloadFile(JSON.stringify(data, null, 2), 'meditrack_backup.json', 'application/json');
    };

    const downloadFile = (content, filename, type) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setShowExportModal(false);
    };

    // ... (handleReset) ...
    const handleReset = () => {
        if (window.confirm("DANGER: This will permanently delete ALL your data. Are you sure?")) {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('mediTrack_')) keysToRemove.push(key);
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
            alert("Data cleared. Logging out...");
            logout();
            window.location.reload();
        }
    };

    // Reusable MenuItem Component
    const MenuItem = ({ icon: Icon, label, toggle, value, onClick, variant = 'default', subLabel }) => (
        <div onClick={onClick} className="flex items-center justify-between p-4 bg-white border border-gray-100 first:rounded-t-2xl last:rounded-b-2xl cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${variant === 'danger' ? 'bg-red-50 text-red-500' : variant === 'primary' ? 'bg-teal-50 text-teal-600' : 'bg-gray-50 text-gray-600'}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <div>
                    <span className={`font-medium block ${variant === 'danger' ? 'text-red-500' : variant === 'primary' ? 'text-teal-600' : 'text-dark'}`}>{label}</span>
                    {subLabel && <span className="text-[10px] text-gray-400">{subLabel}</span>}
                </div>
            </div>

            {toggle ? (
                <div
                    className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${value ? 'bg-primary' : 'bg-gray-200'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick && onClick();
                    }}
                >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${value ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
            ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
        </div>
    );

    return (
        <div className="p-6 pb-24 relative">
            {/* ... Modals ... */}
            {showExportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Export Data</h3>
                            <button onClick={() => setShowExportModal(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <Button onClick={generateJSON} variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                            <Database className="w-5 h-5 text-teal-600" />
                            <div className="text-left">
                                <span className="block font-bold text-gray-900">Full Backup (JSON)</span>
                                <span className="text-xs text-gray-500">Best for switching devices</span>
                            </div>
                        </Button>
                        <Button onClick={generateCSV} variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div className="text-left">
                                <span className="block font-bold text-gray-900">Excel Report (CSV)</span>
                                <span className="text-xs text-gray-500">Readable list of medicines</span>
                            </div>
                        </Button>
                    </div>
                </div>
            )}

            {/* Add Member Modal (Existing) */}
            {showAddMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">Add Family Member</h3>
                            <button onClick={() => setShowAddMember(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddMember} className="space-y-4">
                            <Input
                                label="Name"
                                placeholder="e.g. Rex"
                                value={newMember.name}
                                onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                                required
                            />
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-700">Type</label>
                                <select
                                    className="px-4 py-3 rounded-xl border border-gray-200 bg-white"
                                    value={newMember.type}
                                    onChange={e => setNewMember({ ...newMember, type: e.target.value })}
                                >
                                    <option value="adult">Adult</option>
                                    <option value="child">Child</option>
                                    <option value="pet">Pet 🐾</option>
                                    <option value="elderly">Elderly</option>
                                </select>
                            </div>
                            <Button type="submit" className="w-full">Add Member</Button>
                        </form>
                    </div>
                </div>
            )}

            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Profile</h1>
            </header>

            {/* Account Card */}
            <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold z-10">
                    {user?.name?.[0] || 'U'}
                </div>
                <div className="z-10">
                    <h2 className="font-bold text-lg text-dark">{user?.name || 'Guest User'}</h2>
                    <p className="text-teal-600 font-bold text-sm">{xp} XP Earned</p>
                </div>
                {/* Decorative BG */}
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-teal-50 to-transparent"></div>
            </div>

            <button
                onClick={() => window.location.href = '/medical-id'}
                className="w-full mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-red-600 hover:bg-red-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold">Medical ID</span>
                        <span className="text-xs text-red-400">Emergency Information</span>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 opacity-50" />
            </button>

            <div className="space-y-6">
                {/* Badges Section */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">Achievements</h3>
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {achievements.length === 0 ? (
                            <div className="text-gray-400 text-sm italic p-2">No badges yet. Start taking meds!</div>
                        ) : (
                            achievements.map((badge, idx) => (
                                <div key={idx} className="flex flex-col items-center min-w-[70px]">
                                    <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center text-2xl shadow-sm mb-1 border border-yellow-100">
                                        {badge.icon}
                                    </div>
                                    <span className="text-[10px] font-bold text-center leading-tight">{badge.name}</span>
                                </div>
                            ))
                        )}
                        {/* Empty Slots placeholder */}
                        {[...Array(3)].map((_, i) => (
                            <div key={`empty-${i}`} className="flex flex-col items-center min-w-[70px] opacity-30 grayscale">
                                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-2xl mb-1 border border-gray-200">
                                    ?
                                </div>
                                <span className="text-[10px] font-bold text-center">Locked</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Family Members Section */}
                <div>
                    <div className="flex items-center justify-between mb-2 ml-1">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Family Profiles</h3>
                        <button
                            onClick={() => setShowAddMember(true)}
                            className="text-xs font-bold text-primary flex items-center gap-1 hover:bg-primary/5 px-2 py-1 rounded-full transition-colors"
                        >
                            <Plus className="w-3 h-3" /> Add New
                        </button>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm grid grid-cols-2 gap-2">
                        {profiles.map(profile => (
                            <button
                                key={profile.id}
                                onClick={() => switchProfile(profile.id)}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeProfileId === profile.id
                                    ? 'bg-primary/10 ring-2 ring-primary ring-inset'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-sm ${profile.type === 'pet' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {profile.type === 'pet' ? '🐾' : profile.name[0]}
                                </div>
                                <div className="text-left overflow-hidden">
                                    <span className="block font-semibold text-sm truncate">{profile.name}</span>
                                    <span className="text-[10px] text-gray-400 capitalize">{profile.type}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Settings */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">App Settings</h3>
                    <div className="shadow-sm rounded-2xl overflow-hidden">
                        {/* Cloud Sync Sim */}
                        <MenuItem
                            icon={isSyncing ? RefreshCw : Cloud}
                            label="Cloud Backup"
                            subLabel={lastSynced ? `Synced: ${lastSynced.toLocaleTimeString()}` : "Keep your data safe"}
                            toggle
                            value={autoSync}
                            onClick={handleSyncToggle}
                        />
                        {/* Spinning Animation if syncing */}
                        {isSyncing && (
                            <div className="bg-blue-50 p-2 px-4 text-xs text-blue-600 font-medium flex items-center justify-center animate-pulse">
                                Syncing data to secure cloud...
                            </div>
                        )}

                        <div className="h-px bg-gray-100" />

                        {installPrompt && (
                            <>
                                <MenuItem
                                    icon={Smartphone}
                                    label="Install App"
                                    variant="primary"
                                    onClick={handleInstallClick}
                                />
                                <div className="h-px bg-gray-100" />
                            </>
                        )}
                        <MenuItem
                            icon={darkMode ? Moon : Sun}
                            label="Dark Mode"
                            toggle
                            value={darkMode}
                            onClick={() => setDarkMode(!darkMode)}
                        />
                        <div className="h-px bg-gray-100" />
                        <MenuItem
                            icon={Bell}
                            label="Notifications"
                            toggle
                            value={notifications}
                            onClick={() => setNotifications(!notifications)}
                        />
                    </div>
                </div>

                {/* Data Management */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">Data Management</h3>
                    <div className="shadow-sm rounded-2xl overflow-hidden">
                        <MenuItem
                            icon={Download}
                            label="Export Data"
                            onClick={() => setShowExportModal(true)}
                        />
                        <div className="h-px bg-gray-100" />
                        <MenuItem
                            icon={Trash}
                            label="Reset All Data"
                            variant="danger"
                            onClick={handleReset}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">Support</h3>
                    <div className="shadow-sm rounded-2xl overflow-hidden">
                        <MenuItem icon={Shield} label="Privacy Policy" onClick={() => window.location.href = '/privacy'} />
                        <div className="h-px bg-gray-100" />
                        <MenuItem icon={HelpCircle} label="Help & Support" onClick={() => window.location.href = '/help'} />
                    </div>
                </div>

                <Button onClick={logout} variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                </Button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-8">
                MediTrack v1.4.0 (Sync Enabled)
            </p>
        </div>
    );
}
