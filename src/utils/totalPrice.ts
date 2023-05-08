import { TPizzaRedux } from "./types/types"

export const calcTotalPrice = (items: TPizzaRedux[]) => {
    return items.reduce((sum, item) => { return sum + item.price * item.count }, 0)
}