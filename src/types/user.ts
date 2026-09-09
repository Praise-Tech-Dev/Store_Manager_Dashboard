export type UserRole = 'Admin' | 'Customer' | 'Editor' | 'Viewer';
export type UserStatus = 'Active' | 'Suspended' | 'Invited';

export interface Geolocation {
    lat: string;
    long: string;
}

export interface Address {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: Geolocation;
}

export interface FullName {
    firstname: string;
    lastname: string;
}

// api payload schema 
export interface ApiUser {
    id: number;
    email: string;
    username: string;
    password?: string;
    name: FullName;
    address: Address;
    phone: string;
}


export interface DashboardUser extends ApiUser {
    role: UserRole;
    status: UserStatus;
    joinedDate: string;
    lastLogin?: string;
}

export type CreateUserDTO = Omit<ApiUser, 'id'> & {
    role?: UserRole;
    status?: UserStatus;
}

export type UpdateUserDTO = Partial<CreateUserDTO>;