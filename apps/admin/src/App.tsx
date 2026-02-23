import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { useAuth } from './hooks/useAuthHook'
import { LoginPage } from './components/auth/LoginPage'
import { DashboardLayout } from './components/dashboard/DashboardLayout'
import { ContentOverview } from './components/dashboard/ContentOverview'
import { JSONContentEditor } from './components/dashboard/JSONContentEditor'
import { MediaLibrary } from './components/dashboard/MediaLibrary'
import { SystemMonitoring } from './components/dashboard/SystemMonitoring'
import { GlobalConfig } from './components/dashboard/GlobalConfig'
import { UserProfile } from './components/dashboard/UserProfile'

// Mock Data
import { timelineData } from './data/timeline'
import { photographyData } from './data/photography'

const AdminApp: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();

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

    return (
        <BrowserRouter>
            <DashboardLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/overview" replace />} />
                    <Route path="/overview" element={<ContentOverview />} />
                    <Route path="/monitoring" element={<SystemMonitoring />} />
                    <Route path="/engineering" element={<JSONContentEditor title="Engineering Timeline / JSON" contentKey="timeline.json" fallbackContent={timelineData} />} />
                    <Route path="/photography" element={<JSONContentEditor title="Photography Collections / JSON" contentKey="photography.json" fallbackContent={photographyData} />} />
                    <Route path="/media" element={<MediaLibrary />} />
                    <Route path="/global-config" element={<GlobalConfig />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="*" element={<Navigate to="/overview" replace />} />
                </Routes>
            </DashboardLayout>
        </BrowserRouter>
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
