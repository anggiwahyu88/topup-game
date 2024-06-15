const orderid = require('order-id')('rgrgrriuuygyfgruue33e2ww');

function abbreviateString(input: string) {
    const words = input.split(' ');
    const abbreviation = words.map(word => word.charAt(0).toUpperCase()).join('');
    return abbreviation;
}

export function generateTransactionNumber(nameGame: string, userId: string,) {
    const transactionType = abbreviateString(nameGame)

    return `${transactionType}${orderid.generate()}-${userId.slice(-4)}`;
}