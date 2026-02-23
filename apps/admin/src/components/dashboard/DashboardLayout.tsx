import React from 'react';
import {
    LayoutDashboard,
    FileCode,
    ImageIcon,
    Settings,
    LogOut,
    User,
    Terminal,
    Activity
} from 'lucide-react';
import { Container } from '@portfolio/shared-ui';
import { useAuth } from '../../hooks/useAuthHook';

export type AdminView = 'OVERVIEW' | 'ENGINEERING' | 'PHOTOGRAPHY' | 'MEDIA' | 'SETTINGS';

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`
    w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group
    ${active
                ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                : 'text-foreground/40 hover:text-white hover:bg-white/5'}
  `}>
        <Icon size={20} className={active ? 'text-accent-gold' : 'group-hover:scale-110 transition-transform'} />
        <span className="text-sm font-display font-medium tracking-tight">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-gold shadow-[0_0_8px_rgba(212,175,55,1)]" />}
    </button>
);

interface DashboardLayoutProps {
    children: React.ReactNode;
    currentView: AdminView;
    onViewChange: (view: AdminView) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, currentView, onViewChange }) => {
    const { logout } = useAuth();

    const viewTitleMap: Record<AdminView, string> = {
        OVERVIEW: 'Platform Overview',
        ENGINEERING: 'Engineering Data / Source',
        PHOTOGRAPHY: 'Visual Assets / Curation',
        MEDIA: 'Media Library / S3',
        SETTINGS: 'System Configuration',
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 flex flex-col p-6 bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-12 ml-2">
                    <Terminal className="text-accent-gold" size={24} />
                    <span className="font-display font-bold text-lg tracking-tighter text-white">AV / ADMIN</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <div className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.3em] mb-4 ml-4">Main Menu</div>
                    <SidebarItem icon={LayoutDashboard} label="Overview" active={currentView === 'OVERVIEW'} onClick={() => onViewChange('OVERVIEW')} />
                    <SidebarItem icon={FileCode} label="Engineering Data" active={currentView === 'ENGINEERING'} onClick={() => onViewChange('ENGINEERING')} />
                    <SidebarItem icon={ImageIcon} label="Photography Gallery" active={currentView === 'PHOTOGRAPHY'} onClick={() => onViewChange('PHOTOGRAPHY')} />
                    <SidebarItem icon={ImageIcon} label="Media Library" active={currentView === 'MEDIA'} onClick={() => onViewChange('MEDIA')} />

                    <div className="pt-8 text-[10px] font-mono text-foreground/20 uppercase tracking-[0.3em] mb-4 ml-4">System</div>
                    <SidebarItem icon={Activity} label="Monitoring" active={false} onClick={() => onViewChange('OVERVIEW')} />
                    <SidebarItem icon={Settings} label="Global Settings" active={currentView === 'SETTINGS'} onClick={() => onViewChange('SETTINGS')} />
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-gold/50 to-white/10 flex items-center justify-center border border-white/10">
                            <User size={20} className="text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-display font-bold text-white">Abhijeet V.</p>
                            <p className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest">Master Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-foreground/40 hover:text-red-400 hover:bg-red-400/5 transition-all group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-display font-medium tracking-tight">System Termination</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-20 border-b border-white/5 flex items-center px-10 justify-between bg-black/10 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-display font-bold text-white tracking-tight">{viewTitleMap[currentView]}</h2>
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em]">Node-Alpha Active</span>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-foreground/40">
                            <Activity size={12} className="text-accent-gold" />
                            CPU: 12% / RAM: 4.2GB
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <Container>
                        {children}
                    </Container>
                </main>
            </div>
        </div>
    );
};
