export class Product{
    productId:number;
    productTitle:string;
    productPrice:number;
    productOfferPrice:number;
    shippingCost:number;
    totalInventory:number;
    productDescription:string;
    selectedImage:string;
    images:string[];
    options:Options[];
}

export class Options{
    optionName:string;
    optionValues:string[];
}

