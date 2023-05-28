import { Agent } from "./Agent.interface";

export interface AuthResponse {
   token : string;
   user : Agent;
}