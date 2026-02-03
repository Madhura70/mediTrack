import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import MedicineList from '../components/features/medicines/MedicineList';

export default function Medicines() {
    return (
        <div className="p-6 pb-24">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-dark">My Medicines</h1>
                <Link
                    to="/medicines/add"
                    className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95"
                >
                    <Plus className="w-6 h-6" />
                </Link>
            </div>

            <MedicineList />
        </div>
    );
}
