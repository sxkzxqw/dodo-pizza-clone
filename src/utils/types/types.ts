export type TPizzaType = {
    category: string,
    id: string,
    imageUrl: string,
    price: number,
    rating: number,
    title: string,
    types: number[],
    sizes: number[],
    type?: string,
    count?: number,
    size?: number,
}

export type TPizzaRedux = {
    category: string,
    id: string,
    imageUrl: string,
    price: number,
    rating: number,
    title: string,
    types: number[],
    sizes: number[],
    type?: string,
    count: number,
    size?: number,
}