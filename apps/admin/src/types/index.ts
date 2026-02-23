export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

export interface AdminUser {
    id: string;
    email: string;
    role: UserRole;
    name?: string;
}

export interface AuthState {
    user: AdminUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface ContentSection {
    id: string;
    title: string;
    lastModified: string;
    status: 'DRAFT' | 'PUBLISHED';
    type: 'ENGINEERING' | 'PHOTOGRAPHY' | 'GENERAL';
}
