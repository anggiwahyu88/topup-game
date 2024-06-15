export const getFileName = (type: string) => {
    const timestamp = Date.now().toString(36);
    const randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * randomChars.length);
        randomString += randomChars[randomIndex];
    }

    return `${timestamp + randomString}.${type}`
}
