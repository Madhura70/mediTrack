import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import AppointmentList from '../components/features/appointments/AppointmentList';

export default function Appointments() {
    return (
        <div className="p-6 pb-24">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-dark">Appointments</h1>
                <Link
                    to="/appointments/add"
                    className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg shadow-secondary/30 hover:bg-secondary/90 transition-all active:scale-95"
                >
                    <Plus className="w-6 h-6" />
                </Link>
            </div>

            <AppointmentList />
        </div>
    );
}
