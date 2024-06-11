export interface CartItem {
    id: number,
    title: string,
    price: number,
    img: string,
    quantity: number
}

export interface RegisterUser {
    username:string;
    email:string;
    password:string;
    phone:string;
}

export interface LoginUser {
    username:string;
    password:string;
}