export interface Agent {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    updatedAt?: Date;
    createdAt: Date;
    tradeRegister?: any;
    patentNumber?: any;
    phone: string;
    email: string;
    identityCardNumber?: string;
    identityCardRecto?: any;
    identityCardVerso?: any;
    passwordChanged?: boolean;
    role:string;
    cin:string;
}
