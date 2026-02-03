import React from 'react';
import { ChevronLeft, Shield, Lock, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
    const navigate = useNavigate();

    return (
        <div className="p-6 pb-24">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Go back">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Privacy Policy</h1>
            </div>

            <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
                <div className="flex justify-center py-6">
                    <Shield className="w-24 h-24 text-teal-500 opacity-20" />
                </div>

                <section>
                    <h3 className="text-gray-900 font-bold text-lg flex items-center gap-2">
                        <Lock className="w-5 h-5 text-gray-400" />
                        Local-First Data
                    </h3>
                    <p>
                        MediTrack operates on a "Local-First" architecture. This means 100% of your health data, personal details,
                        and usage logs are stored directly on this device's internal storage (IndexedDB/LocalStorage).
                    </p>
                </section>

                <section>
                    <h3 className="text-gray-900 font-bold text-lg flex items-center gap-2">
                        <EyeOff className="w-5 h-5 text-gray-400" />
                        No Cloud Sync
                    </h3>
                    <p>
                        We do not operate a cloud database. Your data never leaves your device unless you explicitly
                        use the "Export Data" feature to create a backup file, or "Generate Report" to print a document.
                    </p>
                </section>

                <section>
                    <h3 className="text-gray-900 font-bold text-lg">Data Encryption</h3>
                    <p>
                        To protect against casual snooping, MediTrack encrypts your local data files. However,
                        if someone has physical access to your unlocked device, they may be able to access the app.
                        We recommend keeping your device secured with a passcode or biometrics.
                    </p>
                </section>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-8">
                    <p className="text-xs text-center text-gray-400">
                        Last Updated: Feb 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
