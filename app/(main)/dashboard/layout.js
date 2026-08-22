import React, { Suspense } from 'react';
import { DashboardLoader } from '@/components/dashboard-loader';

const DashboardLayout = ({ children }) => {
    return (
        <div className="px-3 sm:px-5">
            <Suspense fallback={<DashboardLoader text="Loading live analytics..." />}>
                {children}
            </Suspense>
        </div>
    );
};

export default DashboardLayout;