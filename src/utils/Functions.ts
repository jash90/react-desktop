export function formatPrice(price: number) {
    if (price > 100)
        return price.toFixed(0);
    if (price > 1)
        return price.toFixed(2);
    return price.toFixed(3);
};