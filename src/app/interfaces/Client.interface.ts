export interface Client {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    updatedAt?: Date;
    createdAt?: Date;
    phone?: string;
    email?: string;
    passwordChanged?: boolean;
    balance?: number;
    cin?:string;
    accountType?:string;
}
