import React from 'react';
import DashboardHeader from '../components/features/dashboard/DashboardHeader';
import StatsOverview from '../components/features/dashboard/StatsOverview';
import DailySchedule from '../components/features/dashboard/DailySchedule';
import { Link } from 'react-router-dom';

import DailyChallengeWidget from '../components/features/dashboard/DailyChallengeWidget';

export default function Home() {
    return (
        <div className="p-6 pb-24">
            <DashboardHeader />
            <DailyChallengeWidget />
            <div className="flex justify-end -mt-4 mb-4">
                <Link to="/calendar" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                    View History &rarr;
                </Link>
            </div>
            <StatsOverview />
            <DailySchedule />
        </div>
    );
}
