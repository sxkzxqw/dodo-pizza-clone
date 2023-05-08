import { calcTotalPrice } from "./totalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const json = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(json)

    return {
        json,
        totalPrice
    }
}