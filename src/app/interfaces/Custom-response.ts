import { Agent } from "./Agent.interface";
import { Client } from "./Client.interface";
import { Prospect } from "./Prospect.interface";

export interface CustomResponse {
    statusCode: number;
    status: string;
    message: string;
    data: {agents?: Agent[], agent?:Agent,  clients?: Client[] , client?: Client
        prospects?: Prospect[], prospect?:Prospect};  
}