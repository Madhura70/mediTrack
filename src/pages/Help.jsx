import React from 'react';
import { ChevronLeft, HelpCircle, FileText, Smartphone, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Help() {
    const navigate = useNavigate();

    const questions = [
        {
            q: "How do I add a family member?",
            a: "Go to your Profile page, scroll to 'Family Profiles', and tap 'Add New'. You can create profiles for children, pets, or other adults."
        },
        {
            q: "Is my data private?",
            a: "Yes. All data is stored locally on your device. We use encryption to ensure it's not readable by other apps. No data is sent to the cloud."
        },
        {
            q: "How do I back up my data?",
            a: "Go to Profile -> Data Management -> Export Data. This will download a JSON file that you can keep safe."
        },
        {
            q: "I forgot to log a medicine. What do I do?",
            a: "You can simply mark it as taken from the Dashboard (even if late), or edit the inventory manually in the Medicine details page."
        }
    ];

    return (
        <div className="p-6 pb-24">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Go back">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Help & Support</h1>
            </div>

            <div className="space-y-6">
                <div className="bg-primary/5 p-6 rounded-2xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900">MediTrack Guide</h2>
                        <p className="text-sm text-gray-600">v1.3.0</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-lg">FAQ</h3>
                    {questions.map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <h4 className="font-semibold text-gray-800 mb-2">{item.q}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-gray-900 text-lg">Contact Us</h3>
                    <p className="text-sm text-gray-500">
                        Since this is a local-first app, we don't have a central support server.
                        However, if you found a bug, please check for updates on our website.
                    </p>
                </div>
            </div>
        </div>
    );
}
