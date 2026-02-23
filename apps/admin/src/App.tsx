import React, { useState } from 'react'
import { AuthProvider } from './hooks/useAuth'
import { useAuth } from './hooks/useAuthHook'
import { LoginPage } from './components/auth/LoginPage'
import { DashboardLayout, AdminView } from './components/dashboard/DashboardLayout'
import { ContentOverview } from './components/dashboard/ContentOverview'
import { JSONContentEditor } from './components/dashboard/JSONContentEditor'
import { MediaLibrary } from './components/dashboard/MediaLibrary'

// Mock Data
import { timelineData } from './data/timeline'
import { photographyData } from './data/photography'

const AdminApp: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [view, setView] = useState<AdminView>('OVERVIEW');

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
                    <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.4em]">Establishing Secure Connection</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    const renderContent = () => {
        switch (view) {
            case 'OVERVIEW': return <ContentOverview />;
            case 'ENGINEERING': return <JSONContentEditor title="Engineering Timeline / JSON" initialContent={timelineData} onSave={() => alert('Changes Deployed to Edge Node')} />;
            case 'PHOTOGRAPHY': return <JSONContentEditor title="Photography Collections / JSON" initialContent={photographyData} onSave={() => alert('Visual Assets Sync Complete')} />;
            case 'MEDIA': return <MediaLibrary />;
            default: return <ContentOverview />;
        }
    }

    return (
        <DashboardLayout currentView={view} onViewChange={setView}>
            {renderContent()}
        </DashboardLayout>
    );
}

function App() {
    return (
        <AuthProvider>
            <AdminApp />
        </AuthProvider>
    )
}

export default App
