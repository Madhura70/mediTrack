import React from 'react';
import { useData } from '../../../context/DataContext';
import { Calendar, Trash2, MapPin, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

export default function AppointmentList() {
    const { appointments, deleteAppointment } = useData();

    if (appointments.length === 0) {
        return (
            <div className="text-center py-10">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Calendar className="w-8 h-8" />
                </div>
                <p className="text-gray-500">No upcoming appointments.</p>
            </div>
        );
    }

    // Sort by date/time
    const sorted = [...appointments].sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

    return (
        <div className="space-y-4">
            {sorted.map((apt) => (
                <div key={apt.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group overflow-hidden">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                                {apt.specialty || 'Appointment'}
                            </p>
                            <h3 className="font-bold text-dark text-lg">{apt.doctor}</h3>
                        </div>
                        <button
                            onClick={() => deleteAppointment(apt.id)}
                            className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{format(new Date(apt.date), 'EEEE, d MMMM yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{apt.time}</span>
                        </div>
                        {apt.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{apt.location}</span>
                            </div>
                        )}
                    </div>

                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-l-2xl"></div>
                </div>
            ))}
        </div>
    );
}
