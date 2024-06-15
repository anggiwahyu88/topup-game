export function calculateFee(amount: number, fee: string) {
    if (fee.endsWith('%')) {
        const percentage = parseFloat(fee) / 100;
        return Math.floor(amount * percentage);
    } else {
        return parseFloat(fee);
    }
}