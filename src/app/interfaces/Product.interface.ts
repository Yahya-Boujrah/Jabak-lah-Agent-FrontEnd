import { ProductCategory } from "./Product-category.interface";

export interface Product {
    id?: number;
    sku?: string;
    name?: string;
    description?: string;
    unitPrice?: number;
    imageUrl?: string;
    active?: boolean;
    unitsInStock?: number;
    dateCreated?: Date;
    lastUpdate?: Date;
    category?:ProductCategory;
  }
  