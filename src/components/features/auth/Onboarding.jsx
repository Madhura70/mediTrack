import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button';
import { Pill, Calendar, Activity, ChevronRight } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: 'Track your scheduled\nmedications',
        description: 'Never miss a dose again. Use our simple tracker to stay on top of your health.',
        icon: <Pill className="w-24 h-24 text-primary" />,
        color: 'bg-primary/10',
    },
    {
        id: 2,
        title: 'Manage doctor\nappointments',
        description: 'Keep all your medical appointments organized in one place with easy reminders.',
        icon: <Calendar className="w-24 h-24 text-secondary" />,
        color: 'bg-secondary/10',
    },
    {
        id: 3,
        title: 'Monitor your health\nprogress',
        description: 'Visualize your adherence and health stats to see how well you are doing.',
        icon: <Activity className="w-24 h-24 text-blue-500" />,
        color: 'bg-blue-500/10',
    },
];

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            navigate('/signup');
        }
    };

    const handleSkip = () => {
        navigate('/signup');
    };

    const step = steps[currentStep];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6 pb-12 relative overflow-hidden">

            {/* Skip Button */}
            <div className="w-full flex justify-end">
                <button
                    onClick={handleSkip}
                    className="text-gray-400 font-medium px-2 py-1 hover:text-gray-600"
                >
                    Skip
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm w-full animate-in fade-in slide-in-from-right-4 duration-300" key={step.id}>
                <div className={`w-64 h-64 rounded-full flex items-center justify-center mb-10 ${step.color} relative`}>
                    {/* Decorative circles */}
                    <div className="absolute w-[120%] h-[120%] border border-current opacity-20 rounded-full animate-pulse-slow"></div>
                    {step.icon}
                </div>

                <h2 className="text-3xl font-bold text-dark mb-4 whitespace-pre-line leading-tight">
                    {step.title}
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                    {step.description}
                </p>
            </div>

            {/* Footer Navigation */}
            <div className="w-full max-w-sm flex items-center justify-between mt-8">
                {/* Indicators */}
                <div className="flex gap-2">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentStep ? 'w-8 bg-primary' : 'w-2.5 bg-gray-200'
                                }`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <Button
                    onClick={handleNext}
                    className="rounded-full w-14 h-14 !p-0 flex items-center justify-center shadow-lg shadow-primary/30"
                >
                    <ChevronRight className="w-6 h-6" />
                </Button>
            </div>
        </div>
    );
}
