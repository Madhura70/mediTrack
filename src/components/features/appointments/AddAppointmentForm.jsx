import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { ChevronLeft, User, MapPin, Calendar, Clock, Stethoscope } from 'lucide-react';

export default function AddAppointmentForm() {
    const navigate = useNavigate();
    const { addAppointment } = useData();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        doctor: '',
        specialty: '',
        location: '',
        date: '',
        time: '',
        cost: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            addAppointment({
                ...formData,
                cost: Number(formData.cost) || 0
            });
            setLoading(false);
            navigate('/appointments');
        }, 500);
    };

    return (
        <div className="p-6 pb-24">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">New Appointment</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Doctor Name"
                    placeholder="Dr. Smith"
                    value={formData.doctor}
                    onChange={e => setFormData({ ...formData, doctor: e.target.value })}
                    required
                    icon={<User className="w-5 h-5" />}
                />

                <Input
                    label="Specialty / Type"
                    placeholder="Cardiologist, General Checkup"
                    value={formData.specialty}
                    onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                    icon={<Stethoscope className="w-5 h-5" />}
                />

                <Input
                    label="Consultation Fee ($)"
                    type="number"
                    placeholder="0.00"
                    value={formData.cost}
                    onChange={e => setFormData({ ...formData, cost: e.target.value })}
                />

                <Input
                    label="Location"
                    placeholder="City Hospital, Building A"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    icon={<MapPin className="w-5 h-5" />}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Date"
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        required
                        icon={<Calendar className="w-5 h-5" />}
                    />

                    <Input
                        label="Time"
                        type="time"
                        value={formData.time}
                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                        required
                        icon={<Clock className="w-5 h-5" />}
                    />
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-gray-700">Notes (Optional)</label>
                    <textarea
                        className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[100px]"
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Bring previous MRI reports..."
                    />
                </div>

                <Button type="submit" className="w-full mt-4" isLoading={loading}>
                    Save Appointment
                </Button>
            </form>
        </div>
    );
}
