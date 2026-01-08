export interface Ticket {
    id?: string;
    user: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'in progress' | 'closed';
    createdAt?: Date;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface AuthResponse {
    token: string;
    user?: User;
}