import { Agent } from "./Agent.interface";
import { Client } from "./Client.interface";
import { DG } from "./Delivery-guy.interface";
import { Order } from "./Order.interface";
import { ProductCategory } from "./Product-category.interface";
import { Product } from "./Product.interface";
import { Prospect } from "./Prospect.interface";

export interface CustomResponse {
    statusCode: number;
    status: string;
    message: string;
    data: {agents?: Agent[], agent?:Agent,  clients?: Client[] , client?: Client
        prospects?: Prospect[], prospect?:Prospect,
        products?: Product[], product?: Product,
        pcategories?: ProductCategory[],  category?: ProductCategory,
        orders?: Order[], order?: Order,
        deliveryMen?: DG[]};  
}